import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { PageHeader } from 'antd'

export default function ThePageHeader({
  title,
  subTitle,
  onBack,
  extra,
}: {
  title: ReactNode
  subTitle: ReactNode
  onBack: Function
  extra: ReactNode
}) {
  const router = useRouter()

  return (
    <PageHeader
      title={title}
      subTitle={subTitle}
      onBack={onBack && (() => router.back())}
      extra={extra}
      ghost={false}
      style={{ marginBottom: 10, borderRadius: 10 }}
    />
  )
}
