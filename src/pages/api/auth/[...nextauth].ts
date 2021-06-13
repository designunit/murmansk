import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const backend = process.env.BACKEND_URL!

export default NextAuth({
	callbacks: {
		async signIn(user, account, profile) {
			if (account.provider !== 'vk') {
				return false
			}

			const vk = profile.response[0]
			let email = vk.email as string
			const firstName = vk.first_name as string
			const lastName = vk.last_name as string
			const photo = vk.photo_100 as string
			if (!email) {
				email = account.email as string
			}

			const params = {
				id: vk.id,
				email,
				firstName,
				lastName,
				photo,
			}

			const res = await fetch(`${backend}/vk'`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(params),
			})
			if (!res.ok) {
				return false
			}

			const u = await res.json()
			user.id = u.id
			user.image = u.avatar

			return true
		},

		// async redirect(url, baseUrl) {
		// 	return baseUrl
		// },

		// async session(session, user) {
		// 	// session.user.val = 'kek'
		// 	// session.uid = parseInt(user.sub as string)
		// 	// session.role = user.role
		// 	return session
		// },

		// async jwt(token, user, account, profile, isNewUser) {
		// 	// token.role = 'visitor'
		// 	return token
		// }
	},
	jwt: {
		// A secret to use for key generation - you should set this explicitly
		// Defaults to NextAuth.js secret if not explicitly specified.
		// This is used to generate the actual signingKey and produces a warning
		// message if not defined explicitly.
		secret: process.env.JWT_SECRET,
	},
	session: {
		jwt: true,
	},
	providers: [
		Providers.VK({
			clientId: process.env.VK_CLIENT_ID,
			clientSecret: process.env.VK_CLIENT_SECRET,
		})
	],
	// Optional SQL or MongoDB database to persist users
	// database: process.env.DATABASE_URL
})

