import { NextPage } from 'next'
import { Card, Row, Col, Table, Form, Input, Radio, Button } from 'antd'
import s from 'styles/pages/dashboard/partner.module.css'

const BookingPage: NextPage = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={9} xl={8}>
        <Card>
          <Form layout="vertical">
            <Form.Item label="Booking ID" name="booking_id">
              <Input placeholder="Please input your Booking ID" />
            </Form.Item>
            <Form.Item
              label="Ticket Range"
              name="ticket_range"
              style={{ width: '100%' }}
            >
              <Input.Group>
                <Input
                  style={{ width: '45%', textAlign: 'center' }}
                  placeholder="Maximum"
                />
                <Input
                  style={{
                    width: '10%',
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: 'none',
                    textAlign: 'center',
                  }}
                  placeholder="~"
                  disabled
                />
                <Input
                  style={{
                    width: '45%',
                    textAlign: 'center',
                  }}
                  placeholder="Maximum"
                />
              </Input.Group>
            </Form.Item>
            <Form.Item label="PIC Name" name="pic_name">
              <Input placeholder="Please input your PIC name" />
            </Form.Item>
            <Form.Item label="Phone Number" name="phone_number">
              <Input placeholder="Please input your phone number" />
            </Form.Item>
            <Form.Item label="From" name="from">
              <Input placeholder="Please input your origin harbor" />
            </Form.Item>
            <Form.Item label="To" name="to">
              <Input placeholder="Please input your destination harbor" />
            </Form.Item>
            <Form.Item label="Roundtrip" name="roundtrip" initialValue={false}>
              <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                <Radio.Button className={s.partnerRadioButton} value={false}>
                  One-Way
                </Radio.Button>
                <Radio.Button className={s.partnerRadioButton} value={true}>
                  Roundtrip
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Funnel From" name="funnel_from">
              <Input placeholder="Please input your referrer" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
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
            ]}
            scroll={{ x: 'max-content' }}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default BookingPage
