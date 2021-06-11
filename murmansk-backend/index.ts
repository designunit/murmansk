import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/images', async (req, res) => {
    const result = await prisma.image.findMany({
        include: {
            markers: true,
        },
    })
    res.json(result)
})

app.post(`/images`, async (req, res) => {
    const { src, width, height } = req.body as Prisma.ImageCreateInput

    const result = await prisma.image.create({
        data: {
            src,
            width,
            height,
        }
    })
    res.json(result)
app.post(`/vk`, async (req, res) => {
	console.log('post vk', req.body)

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
})

app.post(`/users`, async (req, res) => {
    const { name, email } = req.body as Prisma.UserCreateInput

    try {
        const result = await prisma.user.create({
            data: {
                name,
                email,
            },
        })
        res.json(result)
    } catch (err) {
        res.status(400).json({
            error: err,
        })
    }
})

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

app.put(`/images/:image/like`, async (req, res) => {
    const { image } = req.params
    const imageId = parseInt(image)
    const authorId = 1
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
})

app.post(`/images/:image/marker`, async (req, res) => {
    const { image } = req.params
    const imageId = parseInt(image)
    const authorId = 1
    const { content, x, y } = req.body as Prisma.MarkerCreateInput
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
})

app.get('/likes', async (req, res) => {
    const authorId = 1
    const result = await prisma.like.findMany({
        where: { authorId }
    })
    res.json(result)
})

const server = app.listen(3000, () => {
    console.log(`🚀 Server ready at: http://localhost:3000)`)
})
