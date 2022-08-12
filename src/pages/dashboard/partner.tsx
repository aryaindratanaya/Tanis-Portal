import { useState } from 'react'
import { NextPage } from 'next'
import { Card, Form, Input, Button } from 'antd'
import { createPartner } from 'backend/services/partner'
import { Partner } from 'backend/models/partner'
import toast from 'libs/utils/toast'

const PartnerPage: NextPage = () => {
  const [isLoading, setLoading] = useState(false)

  const onFinish = (partner: Partner) => {
    setLoading(true)
    createPartner(partner)
      .then(() => toast({ message: 'A partner has been created!' }))
      .catch((e) => {
        const error = new Error(e)
        toast({ type: 'error', message: error.message })
      })
      .finally(() => setLoading(false))
  }

  return (
    <Card>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name">
          <Input placeholder="Please input partner's name" />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Input placeholder="Please input partner's role" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default PartnerPage
