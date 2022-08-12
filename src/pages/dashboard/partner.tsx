import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Card, Form, Input, Button, Row, Col, Table, Radio } from 'antd'
import { createPartner, getPartners } from 'backend/services/partner'
import { Partner } from 'backend/models/partner'
import toast from 'libs/utils/toast'
import { partnerType } from 'constants/partner'
import s from 'styles/pages/dashboard/partner.module.css'

const PartnerPage: NextPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [partners, setPartners] = useState<Partner[] | undefined>(undefined)

  useEffect(() => {
    getPartners().then((res) => {
      setPartners(res)
    })
  }, [])

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
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={9} xl={8}>
        <Card>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name">
              <Input placeholder="Please input partner's name" />
            </Form.Item>
            <Form.Item
              label="Role"
              name="role"
              initialValue={partnerType.salesPartner}
            >
              <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                <Radio.Button
                  value={partnerType.boatProvider}
                  className={s.partnerRadioButton}
                >
                  {partnerType.boatProvider}
                </Radio.Button>
                <Radio.Button
                  value={partnerType.salesPartner}
                  className={s.partnerRadioButton}
                >
                  {partnerType.salesPartner}
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={15} xl={16}>
        <Card>
          <Table
            columns={[
              { title: 'Name', dataIndex: 'name', key: 'name' },
              { title: 'Role', dataIndex: 'role', key: 'role' },
            ]}
            dataSource={
              partners === null || typeof partners === Error
                ? undefined
                : partners
            }
          />
        </Card>
      </Col>
    </Row>
  )
}

export default PartnerPage
