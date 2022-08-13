import { notification } from 'antd'

export default function toast({
  type = 'success',
  message,
  description,
}: {
  type?: 'success' | 'info' | 'warning' | 'error'
  message: string | undefined
  description?: string
}) {
  notification[type]({
    message: message,
    description: description,
    placement: 'topRight',
  })
}
