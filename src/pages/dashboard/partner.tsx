import { useState, useEffect, useRef } from 'react'
import { NextPage } from 'next'
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Table,
  Radio,
  Popconfirm,
} from 'antd'
import { DeleteOutlined, SyncOutlined } from '@ant-design/icons'
import {
  createPartner,
  getPartners,
  deletePartner,
} from 'backend/services/partner'
import { Partner } from 'backend/models/partner'
import toast from 'libs/utils/toast'
import { partnerType } from 'constants/partner'
import s from 'styles/pages/dashboard/partner.module.css'

const PartnerPage: NextPage = () => {
  const [isFormLoading, setFormLoading] = useState(false)
  const [isTableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState<Partner[]>([])
  const [form] = Form.useForm()
  const effectRan = useRef(false)

  const onFinish = async (partner: Partner) => {
    setFormLoading(true)
    const { error } = await createPartner(partner)
    setFormLoading(false)
    error
      ? toast({ type: 'error', message: 'Oops, error when adding partner!' })
      : toast({ message: 'Partner added!' })
    if (error) return
    form.resetFields()
    refreshTable()
  }

  const handleDelete = (id: string) => {
    setTableLoading(true)
    deletePartner(id).then(({ error }) => {
      error
        ? toast({ message: 'Oops, error when deleting partner!' })
        : toast({ message: 'Partner deleted!' })
      refreshTable()
    })
  }

  const refreshTable = async () => {
    setTableLoading(true)
    const { partners, error } = await getPartners()
    setTableData(partners)
    error &&
      toast({ type: 'error', message: 'Oops, error when loading partners!' })
    setTableLoading(false)
  }

  useEffect(() => {
    if (effectRan.current === false) {
      refreshTable()
      return () => {
        effectRan.current = true
      }
    }
  }, [])

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={9} xl={8}>
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            disabled={isFormLoading}
          >
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
                  value={partnerType.salesPartner}
                  className={s.partnerRadioButton}
                >
                  {partnerType.salesPartner}
                </Radio.Button>
                <Radio.Button
                  value={partnerType.boatProvider}
                  className={s.partnerRadioButton}
                >
                  {partnerType.boatProvider}
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isFormLoading}
                block
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={15} xl={16}>
        <Card
          title="Partners"
          extra={
            <Button
              icon={<SyncOutlined />}
              onClick={refreshTable}
              loading={isTableLoading}
            />
          }
        >
          <Table
            loading={isTableLoading}
            columns={[
              { title: 'Name', dataIndex: 'name', key: 'name' },
              { title: 'Role', dataIndex: 'role', key: 'role' },
              {
                key: 'delete',
                render: (partner: { id: string }) => (
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={() => handleDelete(partner?.id)}
                    okText="Yes"
                    cancelText="No"
                    placement="left"
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                ),
                width: 1,
              },
            ]}
            dataSource={tableData.map((item) => ({
              key: item?.id,
              ...item,
            }))}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default PartnerPage
