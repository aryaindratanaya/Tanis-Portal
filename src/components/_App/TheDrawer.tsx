import { Dispatch } from 'react'
import Image from 'next/image'
import { Drawer, Row, Col, Typography } from 'antd'
import TheMenu from 'components/_App/TheMenu'

const { Title } = Typography

export default function TheDrawer({
  isDrawerVsbl,
  setIsDrawerVsbl,
}: {
  isDrawerVsbl: boolean
  setIsDrawerVsbl: Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={() => setIsDrawerVsbl(false)}
      visible={isDrawerVsbl}
      width={200}
      bodyStyle={{ backgroundColor: '#001529', padding: 0 }}
    >
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
    </Drawer>
  )
}
