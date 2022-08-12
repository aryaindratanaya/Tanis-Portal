import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export default function FullScreenLoading() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin tip="Loading..." size="large" indicator={<LoadingOutlined />} />
    </div>
  )
}
