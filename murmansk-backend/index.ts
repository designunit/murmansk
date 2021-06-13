import { Prisma, PrismaClient } from '@prisma/client'
import express, { Handler, NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import crypto from 'crypto'
import jose from 'jose'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

const DEFAULT_SIGNATURE_ALGORITHM = 'HS512'

declare global {
	namespace Express {
		export interface Request {
			userId?: number
		}
	}
}

function getSigningKey() {
	const txt = process.env.JWT_SECRET
	if (!txt) {
		console.log('JWT_SECRET env not set')
		process.exit(1)
	}

	const secret = Buffer.from(txt)
	const digest = 'sha256'
	const byteLength = 64
	const encryptionInfo = "NextAuth.js Generated Signing Key"
	const buffer = Buffer.from(crypto.hkdfSync(
		digest,
		secret,
		Buffer.alloc(0),
		encryptionInfo,
		byteLength
	))
	const key = jose.JWK.asKey(buffer, {
		alg: DEFAULT_SIGNATURE_ALGORITHM,
		use: "sig",
		kid: "nextauth-auto-generated-signing-key",
	})
	return key
}

const publicKey = getSigningKey()
const prisma = new PrismaClient()
const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())

const msg = new Map([
	[401, 'Unauthorized'],
	[403, 'Forbidden'],
	[404, 'Not found'],
	[500, 'Unknown'],
])

function error(res: Response, status: number, message?: string) {
	const error = message ?? msg.get(status)

	return res.status(status).json({
		error,
	})
}

const $ = (fn: Handler) => (req: Request, res: Response, next: NextFunction) => {
	return Promise
		.resolve(fn(req, res, next))
		.catch(next)
}

function auth() {
	const cookieName = 'next-auth.session-token'

	function getPayload(token: string): Record<string, any> | null {
		try {
			const result = jose.JWT.verify(token, publicKey)
			return result
		} catch {
			return null
		}
	}

	return (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies[cookieName]
		if (!token) {
			return error(res, 401)
		}

		const payload = getPayload(token)
		if (!payload) {
			return error(res, 401)
		}

		const userId = parseInt(payload.sub)

		req.userId = userId

		next()
	}
}

function admin() {
	const headerName = 'x-token'

	return (req: Request, res: Response, next: NextFunction) => {
		const secret = process.env.ADMIN_SECRET
		if (!secret) {
			return error(res, 403)
		}

		const token = req.headers[headerName]
		if (!token) {
			return error(res, 401)
		}

		const ok = token === secret
		if (!ok) {
			return error(res, 401)
		}

		next()
	}
}

app.get('/ping', $(async (req, res) => {
	res.json({
		message: 'pong',
	})
}))

app.get('/images', $(async (req, res) => {
	const result = await prisma.image.findMany({
		include: {
			markers: true,
		},
	})
	res.json(result)
}))

app.get('/images/:image', $(async (req, res) => {
	const { image } = req.params
	const imageId = parseInt(image)

	let result = await prisma.image.findUnique({
		where: { id: imageId }
	})
	if (!result) {
		const src = req.query.src
		if (!src) {
			return error(res, 400, 'src not set')
		}
		if (typeof src !== 'string') {
			return error(res, 400, 'src is not string')
		}

		result = await prisma.image.create({
			data: {
				src,
				width: 0,
				height: 0,
			}
		})
	}

	const markers = await prisma.marker.findMany({
		where: {
			imageId: result.id,
			published: true,
		}
	})

	res.json({
		...result,
		markers,
	})
}))

app.post(`/images`, admin(), $(async (req, res) => {
	const { src, width, height } = req.body as Prisma.ImageCreateInput
	const result = await prisma.image.create({
		data: {
			src,
			width,
			height,
		}
	})
	res.json(result)
}))

app.post(`/users`, admin(), $(async (req, res) => {
	const { name, email, avatar } = req.body as Prisma.UserCreateInput
	try {
		const result = await prisma.user.create({
			data: {
				name,
				email,
				avatar,
			},
		})
		res.json(result)
	} catch (err) {
		res.status(400).json({
			error: err,
		})
	}
}))

app.get('/users', admin(), $(async (req, res) => {
	const users = await prisma.user.findMany()
	res.json(users)
}))

app.post(`/vk`, $(async (req, res) => {
	const { id, firstName, lastName, photo, email } = req.body as Prisma.VkProfileCreateInput
	const name = `${firstName} ${lastName}`
	const result = await prisma.user.upsert({
		where: { vkid: id },
		create: {
			email,
			name,
			avatar: photo,
			vk: {
				create: {
					id,
					firstName,
					lastName,
					photo,
					email,
				}
			}
		},
		update: {
			name,
			email,
			avatar: photo,
			vk: {
				update: {
					firstName,
					lastName,
					photo,
					email,
				}
			}
		}
	})
	res.json(result)
}))

app.put(`/images/:image/like`, auth(), $(async (req, res) => {
	if (!req.userId) {
		return error(res, 401)
	}

	const { image } = req.params
	const imageId = parseInt(image)

	const authorId = req.userId
	const { like } = req.body as Prisma.LikeCreateInput

	try {
		const result = await prisma.like.upsert({
			where: {
				imageId_authorId: {
					imageId,
					authorId
				}
			},
			create: {
				like,
				imageId,
				authorId,
			},
			update: {
				like,
			}
		})

		const imageLikes = await prisma.like.findMany({
			where: { imageId }
		})
		const likeCount = imageLikes.reduce((acc, value) => {
			const x = value.like ? 1 : 0
			return acc + x
		}, 0)
		const x = await prisma.image.update({
			where: { id: imageId },
			data: {
				likeCount,
			}
		})

		res.json(result)
	} catch (err) {
		res.status(500).json({
			error: err,
		})
	}
}))

app.post(`/images/:image/marker`, auth(), $(async (req, res) => {
	if (!req.userId) {
		return error(res, 401)
	}

	const { image } = req.params
	const imageId = parseInt(image)
	const { content, x, y } = req.body as Prisma.MarkerCreateInput
	const authorId = req.userId
	const published = true

	try {
		const result = await prisma.marker.create({
			data: {
				imageId,
				authorId,
				x,
				y,
				content,
				published,
			}
		})

		res.json(result)
	} catch (err) {
		res.status(500).json({
			error: err,
		})
	}
}))

app.get('/likes', auth(), $(async (req, res) => {
	if (!req.userId) {
		return error(res, 401)
	}

	const authorId = req.userId
	let result = await prisma.like.findMany({
		where: { authorId }
	})
	result = result.filter(x => x.like)
	res.json(result)
}))

const port = process.env.PORT ?? 3000
const server = app.listen(port, () => {
	console.log(`🚀 Server ready at: http://localhost:${port})`)
})
