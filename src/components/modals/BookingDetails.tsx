import { Modal, Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

export default function BookingDetails({
  isModalVisible,
  setModalVisible,
}: {
  isModalVisible: boolean
  setModalVisible: Function
}) {
  return (
    <Modal
      title="Booking Details"
      visible={isModalVisible}
      footer={null}
      onCancel={() => setModalVisible(false)}
    >
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
            render: () => <DeleteOutlined />,
            width: 1,
          },
        ]}
        scroll={{ x: 'max-content' }}
      />
    </Modal>
  )
}
