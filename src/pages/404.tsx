import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Result, Button } from 'antd'

const Custom404: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>App Name | 404 - Not Found</title>
      </Head>

      <Result
        status="404"
        title="404"
        subTitle="Oops! The page you are looking for is not found."
        extra={
          <Button type="primary" onClick={() => router.back()}>
            Back
          </Button>
        }
      />
    </>
  )
}

export default Custom404
