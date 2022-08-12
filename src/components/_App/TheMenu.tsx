import Link from 'next/link'
import { Menu } from 'antd'
import {
  HomeOutlined,
  BranchesOutlined,
  FileDoneOutlined,
  BarcodeOutlined,
} from '@ant-design/icons'
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
      key: 'booking',
      icon: <FileDoneOutlined />,
      label: <Link href="/dashboard/booking">Booking</Link>,
    },
    {
      key: 'ticket',
      icon: <BarcodeOutlined />,
      label: <Link href="/dashboard/ticket">Ticket</Link>,
    },
    {
      key: 'partner',
      icon: <BranchesOutlined />,
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
