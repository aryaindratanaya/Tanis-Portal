import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import {
  Card,
  Row,
  Col,
  Table,
  Form,
  Button,
  InputNumber,
  Input,
  Radio,
  Popconfirm,
} from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import s from 'styles/pages/dashboard/partner.module.css'
import toast from 'libs/utils/toast'
import { createTicket, deleteTicket, getTickets } from 'backend/services/ticket'
import { Ticket } from 'backend/models/ticket'
import { ageGroup, customerType, tripType } from 'constants/ticket'

const BookingPage: NextPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [tickets, setTickets] = useState<Ticket[] | []>([])

  useEffect(() => {
    getTickets().then((res) => setTickets(res.tickets))
  }, [])

  const onFinish = (ticket: Ticket) => {
    setLoading(true)
    createTicket(ticket)
      .then(() => toast({ message: 'A ticket has been created!' }))
      .catch((e) => {
        const error = new Error(e)
        toast({ type: 'error', message: error.message })
      })
      .finally(() => {
        getTickets().then((res) => setTickets(res.tickets))
        setLoading(false)
      })
  }

  const onClickDelete = (id: string) => {
    setLoading(true)
    deleteTicket(id)
      .then(() => toast({ message: 'Ticket has been deleted!' }))
      .catch((e) => {
        const error = new Error(e)
        toast({ type: 'error', message: error.message })
      })
      .finally(() => {
        getTickets().then((res) => setTickets(res.tickets))
        setLoading(false)
      })
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={9} xl={8}>
        <Card>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Booking ID" name="booking_id">
              <InputNumber
                min={0}
                placeholder="Please input your Booking ID"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Ticket ID" name="ticket_id">
              <InputNumber
                min={0}
                placeholder="Please input your Ticket ID"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Customer Name" name="customer_name">
              <Input placeholder="Please input your customer name" />
            </Form.Item>
            <Form.Item
              label="Customer Type"
              name="customer_type"
              initialValue={customerType.wni}
            >
              <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                <Radio.Button
                  className={s.partnerRadioButton}
                  value={customerType.wni}
                >
                  Local
                </Radio.Button>
                <Radio.Button
                  className={s.partnerRadioButton}
                  value={customerType.wna}
                >
                  WNA
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Age Group"
              name="age_group"
              initialValue={ageGroup.adult}
            >
              <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                <Radio.Button
                  className={s.partnerRadioButton}
                  value={ageGroup.adult}
                >
                  Adult
                </Radio.Button>
                <Radio.Button
                  className={s.partnerRadioButton}
                  value={ageGroup.child}
                >
                  Child
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Roundtrip"
              name="roundtrip"
              initialValue={tripType.oneway}
            >
              <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                <Radio.Button
                  className={s.partnerRadioButton}
                  value={tripType.oneway}
                >
                  One-Way
                </Radio.Button>
                <Radio.Button
                  className={s.partnerRadioButton}
                  value={tripType.roundtrip}
                >
                  Roundtrip
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
              {
                title: 'Ticket ID',
                dataIndex: 'ticket_id',
                key: 'ticket_id',
              },
              {
                title: 'Booking ID',
                dataIndex: 'booking_id',
                key: 'booking_id',
              },
              {
                title: 'Customer Name',
                dataIndex: 'customer_name',
                key: 'customer_name',
              },
              {
                title: 'Customer Type',
                dataIndex: 'customer_type',
                key: 'customer_type',
              },
              { title: 'Age Group', dataIndex: 'age_group', key: 'age_group' },
              { title: 'Roundtrip', dataIndex: 'roundtrip', key: 'roundtrip' },
              {
                key: 'delete',
                render: (ticket) => (
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={() => onClickDelete(ticket.id)}
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
            dataSource={tickets.map((ticket) => ({
              key: ticket?.id,
              ...ticket,
            }))}
            scroll={{ x: 'max-content' }}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default BookingPage
