import { ReactNode } from 'react'
import { useState } from 'react'
import { Layout, Grid } from 'antd'
import TheSider from 'components/_App/TheSider'
import TheHeader from 'components/_App/TheHeader'
import TheContent from 'components/_App/TheContent'
import TheFooter from 'components/_App/TheFooter'
import TheDrawer from 'components/_App/TheDrawer'
import s from 'styles/components/_App/TheLayout.module.css'

const { useBreakpoint } = Grid

export default function TheLayout({ children }: { children: ReactNode }) {
  const [isSiderCllps, setIsSiderCllps] = useState(false)
  const [isDrawerVsbl, setIsDrawerVsbl] = useState(false)

  const screens = useBreakpoint()
  const isScreenBig = screens.lg || screens.xl || screens.xxl

  return (
    <Layout>
      {isScreenBig ? (
        <TheSider isSiderCllps={isSiderCllps} />
      ) : (
        <TheDrawer
          isDrawerVsbl={isDrawerVsbl}
          setIsDrawerVsbl={setIsDrawerVsbl}
        />
      )}

      <Layout
        className={isScreenBig && !isSiderCllps ? s.layout : s.layoutCollapsed}
      >
        <TheHeader
          isScreenBig={isScreenBig}
          isSiderCllps={isSiderCllps}
          setIsSiderCllps={setIsSiderCllps}
          setIsDrawerVsbl={setIsDrawerVsbl}
        />
        <TheContent>{children}</TheContent>
        <TheFooter />
      </Layout>
    </Layout>
  )
}
