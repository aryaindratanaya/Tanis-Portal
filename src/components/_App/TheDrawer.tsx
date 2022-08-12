import { Dispatch } from 'react'
import Image from 'next/image'
import { Drawer } from 'antd'
import TheMenu from 'components/_App/TheMenu'
// This component uses the same stylesheet as `TheDrawer` component
import s from 'styles/components/_App/TheSider.module.css'

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
      <div className={s.logo}>
        <Image src="/logo.svg" alt="App Logo" width={44} height={44} />
      </div>

      <TheMenu />
    </Drawer>
  )
}
