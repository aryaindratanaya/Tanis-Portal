import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Modal, Table } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { getTicketsByBookingId, deleteTicket } from 'backend/services/ticket'
import { Ticket } from 'backend/models/ticket'
import toast from 'libs/utils/toast'

export default function BookingDetails({
  sltBookingId,
  isModalVisible,
  setModalVisible,
}: {
  sltBookingId: number | null
  isModalVisible: boolean
  setModalVisible: Dispatch<SetStateAction<boolean>>
}) {
  const [isLoading, setLoading] = useState(false)
  const [tickets, setTickets] = useState<Ticket[] | []>([])

  useEffect(() => {
    getTicketsByBookingId(sltBookingId).then((res) => setTickets(res.tickets))
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
        getTicketsByBookingId(sltBookingId).then((res) =>
          setTickets(res.tickets)
        )
        setLoading(false)
      })
  }

  return (
    <Modal
      title="Booking Details"
      visible={isModalVisible}
      footer={null}
      onCancel={() => setModalVisible(false)}
    >
      <Table
        loading={isLoading}
        dataSource={tickets.map((ticket) => ({
          key: ticket?.id,
          ...ticket,
        }))}
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
              <DeleteOutlined onClick={() => onClickDelete(ticket.id)} />
            ),
            width: 1,
          },
        ]}
        scroll={{ x: 'max-content' }}
      />
    </Modal>
  )
}
