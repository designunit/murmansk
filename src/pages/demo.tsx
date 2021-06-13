import { CommentedImage } from '@/components/CommentedImage'
import { signIn, signOut, useSession } from 'next-auth/client'

const Page = () => {
	const [session, isLoading] = useSession()
	if (isLoading) {
		return (
			<span>loading</span>
		)
	}

	if (!session) {
		return (
			<button onClick={() => signIn('vk')}>Sign in</button>
		)
	}

	return (
		<>
			<button onClick={() => signOut()}>Sign out</button>

			<CommentedImage
				id={1}
				src={'https://мойзалив.рф/static/map.png'}
			/>
			<CommentedImage
				id={1}
				src={'https://мойзалив.рф/static/map.png'}
			/>
		</>
	)
}

export default Page
