import { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore'

export class Ticket {
  id?: string
  ticket_id: number
  booking_id: number
  customer_name: string
  customer_type: string
  age_group: string
  roundtrip: boolean

  constructor({
    id,
    ticket_id,
    booking_id,
    customer_name,
    customer_type,
    age_group,
    roundtrip,
  }: {
    id?: string
    ticket_id: number
    booking_id: number
    customer_name: string
    customer_type: string
    age_group: string
    roundtrip: boolean
  }) {
    this.id = id
    this.ticket_id = ticket_id
    this.booking_id = booking_id
    this.customer_name = customer_name
    this.customer_type = customer_type
    this.age_group = age_group
    this.roundtrip = roundtrip
  }
}

export const ticketConverter = {
  toFirestore: (ticket: Ticket) => {
    return {
      booking_id: ticket.booking_id,
      ticket_id: ticket.ticket_id,
      customer_name: ticket.customer_name,
      customer_type: ticket.customer_type,
      age_group: ticket.age_group,
      roundtrip: ticket.roundtrip,
    }
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const ticket = snapshot.data(options)
    return new Ticket({
      booking_id: ticket.booking_id,
      ticket_id: ticket.ticket_id,
      customer_name: ticket.customer_name,
      customer_type: ticket.customer_type,
      age_group: ticket.age_group,
      roundtrip: ticket.roundtrip,
    })
  },
}
