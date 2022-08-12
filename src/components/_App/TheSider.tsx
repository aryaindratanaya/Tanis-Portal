import Image from 'next/image'
import { Layout } from 'antd'
import TheMenu from 'components/_App/TheMenu'
import s from 'styles/components/_App/TheSider.module.css'

const { Sider } = Layout

export default function TheSider({ isSiderCllps }: { isSiderCllps: boolean }) {
  return (
    <Sider className={s.sider} collapsed={isSiderCllps} collapsedWidth={0}>
      <div style={{ margin: '33px 33px 15px' }}>
        <Image src="/logo.svg" alt="App Logo" width={44} height={44} />
      </div>

      <TheMenu />
    </Sider>
  )
}
