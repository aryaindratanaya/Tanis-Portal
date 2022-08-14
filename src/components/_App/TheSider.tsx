import Image from 'next/image'
import { Layout, Row, Col, Typography } from 'antd'
import TheMenu from 'components/_App/TheMenu'
import s from 'styles/components/_App/TheSider.module.css'

const { Sider } = Layout
const { Title } = Typography

export default function TheSider({ isSiderCllps }: { isSiderCllps: boolean }) {
  return (
    <Sider className={s.sider} collapsed={isSiderCllps} collapsedWidth={0}>
      <div style={{ margin: '33px 15px 15px' }}>
        <Row gutter={10} align="middle">
          <Col>
            <Image src="/logo.svg" alt="App Logo" width={44} height={44} />
          </Col>
          <Col>
            <Title level={4} style={{ color: 'white' }}>
              App Name
            </Title>
          </Col>
        </Row>
      </div>

      <TheMenu />
    </Sider>
  )
}
