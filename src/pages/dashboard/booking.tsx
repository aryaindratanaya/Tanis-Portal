import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import {
  Card,
  Row,
  Col,
  Table,
  Form,
  Input,
  Radio,
  Button,
  InputNumber,
  Select,
} from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import s from 'styles/pages/dashboard/partner.module.css'
import toast from 'libs/utils/toast'
import { ageGroup, customerType } from 'constants/ticket'
import { Booking, CreateBookingPayload } from 'backend/models/booking'
import {
  createBooking,
  deleteBooking,
  getBookings,
} from 'backend/services/booking'
import { harborType } from 'constants/booking'
import { tripType } from 'constants/ticket'
import BookingDetails from 'components/modals/BookingDetails'

const BookingPage: NextPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [bookings, setBookings] = useState<Booking[] | []>([])
  const [isModalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    getBookings().then((res) => setBookings(res.bookings))
  }, [])

  const onFinish = (request: any) => {
    setLoading(true)
    const payload: CreateBookingPayload = {
      booking_id: +request.booking_id,
      ticket_range: {
        start: request.ticket_range.start,
        end: request.ticket_range.end,
      },
      pic_name: request.pic_name,
      phone_number: request.phone_number,
      from: request.from,
      to: request.to,
      roundtrip: request.roundtrip,
      age_group: request.age_group,
      customer_type: request.customer_type,
      funnel_from: request.funnel_from,
    }

    createBooking(payload)
      .then(() =>
        toast({ message: 'A booking and its tickets has been created!' })
      )
      .catch((e) => {
        const error = new Error(e)
        toast({ type: 'error', message: error.message })
      })
      .finally(() => {
        getBookings().then((res) => setBookings(res.bookings))
        setLoading(false)
      })
  }

  const onClickDelete = (id: string) => {
    setLoading(true)
    deleteBooking(id)
      .then(() => toast({ message: 'Booking has been deleted!' }))
      .catch((e) => {
        const error = new Error(e)
        toast({ type: 'error', message: error.message })
      })
      .finally(() => {
        getBookings().then((res) => setBookings(res.bookings))
        setLoading(false)
      })
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={9} xl={8}>
          <Card>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Booking ID"
                name="booking_id"
                rules={[
                  {
                    required: true,
                    message: 'This field cannot be empty!',
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  placeholder="Please input your Booking ID"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                label="Ticket Range"
                rules={[
                  {
                    required: true,
                    message: 'This field cannot be empty!',
                  },
                ]}
              >
                <Input.Group compact>
                  <Form.Item
                    name={['ticket_range', 'start']}
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'This field cannot be empty!',
                      },
                    ]}
                  >
                    <InputNumber style={{ width: '50%' }} placeholder="Start" />
                  </Form.Item>
                  <Form.Item
                    name={['ticket_range', 'end']}
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: 'This field cannot be empty!',
                      },
                    ]}
                  >
                    <InputNumber style={{ width: '50%' }} placeholder="End" />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
              <Form.Item
                label="PIC Name"
                name="pic_name"
                rules={[
                  {
                    required: true,
                    message: 'This field cannot be empty!',
                  },
                ]}
              >
                <Input placeholder="Please input your PIC name" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: 'This field cannot be empty!',
                  },
                ]}
              >
                <Input placeholder="Please input your phone number" />
              </Form.Item>
              <Form.Item
                label="From"
                name="from"
                initialValue={harborType.sanur}
                rules={[
                  {
                    required: true,
                    message: 'This field cannot be empty!',
                  },
                ]}
              >
                <Select>
                  <Select.Option value={harborType.sanur}>Sanur</Select.Option>
                  <Select.Option value={harborType.lembongan}>
                    Lembongan
                  </Select.Option>
                  <Select.Option value={harborType.nusaPenida}>
                    Nusa Penida
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="To"
                name="to"
                initialValue={harborType.lembongan}
                rules={[
                  {
                    required: true,
                    message: 'This field cannot be empty!',
                  },
                ]}
              >
                <Select>
                  <Select.Option value={harborType.sanur}>Sanur</Select.Option>
                  <Select.Option value={harborType.lembongan}>
                    Lembongan
                  </Select.Option>
                  <Select.Option value={harborType.nusaPenida}>
                    Nusa Penida
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Roundtrip"
                name="roundtrip"
                initialValue={tripType.oneway}
                rules={[
                  {
                    required: true,
                    message: 'This field cannot be empty!',
                  },
                ]}
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
              <Form.Item
                label="Age Group"
                name="age_group"
                initialValue={ageGroup.adult}
                rules={[
                  {
                    required: true,
                    message: 'This field cannot be empty!',
                  },
                ]}
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
                label="Customer Type"
                name="customer_type"
                initialValue={customerType.wni}
                rules={[
                  {
                    required: true,
                    message: 'This field cannot be empty!',
                  },
                ]}
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
              <Form.Item label="Funnel From" name="funnel_from">
                <Input placeholder="Please input your referrer" />
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
                  title: 'Booking ID',
                  dataIndex: 'booking_id',
                  key: 'booking_id',
                  render: (bookingId) => (
                    <Button type="link" onClick={() => setModalVisible(true)}>
                      {bookingId}
                    </Button>
                  ),
                },
                { title: 'PIC Name', dataIndex: 'pic_name', key: 'pic_name' },
                {
                  title: 'Phone Number',
                  dataIndex: 'phone_number',
                  key: 'phone_number',
                },
                { title: 'From', dataIndex: 'from', key: 'from' },
                { title: 'To', dataIndex: 'to', key: 'to' },
                {
                  title: 'Funnel From',
                  dataIndex: 'funnel_from',
                  key: 'funnel_from',
                },
                {
                  title: 'Created At',
                  dataIndex: 'created_at',
                  key: 'created_at',
                },
                {
                  key: 'delete',
                  render: (booking) => (
                    <DeleteOutlined
                      onClick={() => onClickDelete(booking?.id)}
                    />
                  ),
                  width: 1,
                },
              ]}
              dataSource={bookings.map((booking) => ({
                key: booking?.id,
                ...booking,
              }))}
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Col>
      </Row>

      <BookingDetails
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  )
}

export default BookingPage
