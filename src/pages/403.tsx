import { NextPage } from 'next'
import Link from 'next/link'
import { Result, Button } from 'antd'

const Custom403: NextPage = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Maaf, anda tidak diizinkan untuk mengakses halaman ini."
      extra={
        <Button type="primary">
          <Link href="/">Login</Link>
        </Button>
      }
    />
  )
}

export default Custom403
