import { Dispatch } from 'react'
import { useRouter } from 'next/router'
import { Layout, Menu, Dropdown, Avatar, Typography } from 'antd'
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import toast from 'libs/utils/toast'
import { auth } from 'connectors/firebaseClient'
import { signOut } from 'firebase/auth'
import s from 'styles/components/_App/TheHeader.module.css'

const { Header } = Layout

export default function TheHeader({
  isScreenBig,
  isSiderCllps,
  setIsSiderCllps,
  setIsDrawerVsbl,
}: {
  isScreenBig: boolean | undefined
  isSiderCllps: boolean
  setIsSiderCllps: Dispatch<React.SetStateAction<boolean>>
  setIsDrawerVsbl: Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()

  return (
    <Header className={`${s.header} ${isScreenBig && s.headerSticky}`}>
      <div className={s.leftItems}>
        {isScreenBig ? (
          isSiderCllps ? (
            <MenuUnfoldOutlined onClick={() => setIsSiderCllps((v) => !v)} />
          ) : (
            <MenuFoldOutlined onClick={() => setIsSiderCllps((v) => !v)} />
          )
        ) : (
          <MenuOutlined onClick={() => setIsDrawerVsbl(true)} />
        )}
      </div>

      <div className={s.rightItems}>
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu
              items={[
                { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
                {
                  key: 'settings',
                  icon: <SettingOutlined />,
                  label: 'Settings',
                },
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: 'Logout',
                  danger: true,
                  onClick: () => {
                    signOut(auth)
                      .then(() => {
                        router.push('/')
                        toast({ message: 'See you soon!' })
                      })
                      .catch((e) => {
                        const error = new Error(e)
                        toast({ type: 'error', message: error.message })
                      })
                  },
                },
              ]}
            />
          }
        >
          <Typography.Link>
            John Doe
            <Avatar
              alt="User Avatar"
              src="https://joeschmoe.io/api/v1/random"
              className={s.avatar}
            />
          </Typography.Link>
        </Dropdown>
      </div>
    </Header>
  )
}
