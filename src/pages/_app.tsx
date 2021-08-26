import "../styles/style.css";
import 'rc-collapse/assets/index.css'

import Head from "next/head"
import { YMetrika } from "@/components/YMetrika"
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppType } from 'next/dist/shared/lib/utils'

const queryClient = new QueryClient()

const App: AppType = (props) => {
	const { Component, pageProps } = props;

	return (
		<QueryClientProvider client={queryClient}>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, maximum-scale=1.0" />
				<YMetrika number="61650523" mode="script" />
			</Head>

			<Component {...pageProps} />
		</QueryClientProvider>
	)
}

export default App
