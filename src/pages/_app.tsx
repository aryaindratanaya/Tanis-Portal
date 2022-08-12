import 'styles/antd.less'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import ProtectedRoute from 'components/handlers/ProtectedRoute'
import TheLayout from 'components/_App/TheLayout'

function MyApp({ Component, pageProps, router }: AppProps) {
  const isInDashboard = router.pathname.split('/')[1] === 'dashboard'

  return (
    <>
      <Head>
        <title>App Name - Put slogan here</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content="App Name - Put slogan here" />
        <meta
          name="og:title"
          property="og:title"
          content="App Name - Put slogan here"
        ></meta>
        <meta name="twitter:card" content="App Name - Put slogan here"></meta>
        <link rel="canonical" href="/"></link>
      </Head>

      {isInDashboard ? (
        <ProtectedRoute>
          <TheLayout>
            <Component {...pageProps} />
          </TheLayout>
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}

export default MyApp
