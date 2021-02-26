import '../styles/style.css'

import Head from 'next/head'
import { AppType } from 'next/dist/next-server/lib/utils'

const App: AppType = props => {
    const { Component, pageProps } = props

    return (
        <>
            {false && <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, maximum-scale=1.0" />
                <script type='text/javascript'
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                            m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                            (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
                        
                            ym(XXXXXXX, 'init', {
                                clickmap:true,
                                trackLinks:true,
                                accurateTrackBounce:true,
                                webvisor:true
                            });
                        `
                    }}
                />
                {/* <noscript><div><img src='https://mc.yandex.ru/watch/XXXXXXX' style={{ position: 'absolute', left: -9999 }} alt='' /></div></noscript> */}
            </Head>
            }

            <Component {...pageProps} />
        </>
    )
}

export default App
