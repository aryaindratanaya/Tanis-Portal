import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Card,
  Col,
  Row,
  Typography,
  Layout,
} from 'antd'
import { LockOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons'
import { signInWithEmailAndPassword } from 'firebase/auth'
import toast from 'libs/utils/toast'
import { auth } from 'connectors/firebaseClient'
import s from 'styles/pages/index.module.css'

const { Title, Text } = Typography
const { Footer } = Layout

const Login: NextPage = () => {
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)

  const onFinish = ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push('/dashboard/home')
        toast({ message: 'Hi, good to see you!' })
      })
      .catch((e) => {
        const error = new Error(e)
        toast({ type: 'error', message: error.message })
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Head>
        <title>App Name | Login</title>
      </Head>

      <main className={s.main}>
        <Card
          title={
            <Row gutter={10} align="middle">
              <Col>
                <Image alt="App Logo" src="/logo.svg" width={44} height={44} />
              </Col>
              <Col>
                <Title level={3} style={{ margin: 'unset' }}>
                  App Name
                </Title>
                <Text type="secondary">A slogan can be placed here.</Text>
              </Col>
            </Row>
          }
          headStyle={{ fontWeight: 'unset' }}
          className={s.loginCard}
        >
          <Form initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input
                type="email"
                prefix={<UserOutlined />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className={s.pullRight} href="">
                Forgot password?
              </a>
            </Form.Item>

            <Form.Item style={{ marginBottom: 'unset' }}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<LoginOutlined />}
                loading={isLoading}
                block
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </main>

      <Footer>
        <strong>App Name © {new Date().getFullYear()}</strong>
        <br />
        by PT. Bale Teknologi Bali
      </Footer>
    </>
  )
}

export default Login
