import Link from 'next/link'
import { Menu } from 'antd'
import { HomeOutlined, ForkOutlined } from '@ant-design/icons'
import useOpenedMenus from 'libs/hooks/useOpenedMenus'

export default function TheMenu() {
  const { openedFeature, selectedPage } = useOpenedMenus()
  const items = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link href="/dashboard/home">Home</Link>,
    },
    {
      key: 'partner',
      icon: <ForkOutlined />,
      label: <Link href="/dashboard/partner">Partner</Link>,
    },
  ]

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={[openedFeature]}
      defaultSelectedKeys={[selectedPage]}
      items={items}
    />
  )
}
