import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Card, Row, Col, Table, Form, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import toast from 'libs/utils/toast'
import { deleteTicket, getTickets } from 'backend/services/ticket'
import { Ticket } from 'backend/models/ticket'

const BookingPage: NextPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [tickets, setTickets] = useState<Ticket[] | []>([])

  useEffect(() => {
    getTickets().then((res) => setTickets(res.tickets))
  }, [])

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
          <Form layout="vertical">
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
                  <DeleteOutlined onClick={() => onClickDelete(ticket.id)} />
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
