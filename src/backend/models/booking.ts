import { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore'

export class Booking {
  id?: string
  booking_id: number
  pic_name: string
  phone_number: string
  from: string
  to: string
  funnel_from?: string
  created_at?: string

  constructor({
    id,
    booking_id,
    pic_name,
    phone_number,
    from,
    to,
    funnel_from,
    created_at,
  }: {
    id?: string
    booking_id: number
    pic_name: string
    phone_number: string
    from: string
    to: string
    funnel_from?: string
    created_at?: string
  }) {
    this.id = id
    this.booking_id = booking_id
    this.pic_name = pic_name
    this.phone_number = phone_number
    this.from = from
    this.to = to
    this.funnel_from = funnel_from
    this.created_at = created_at
  }
}

export class CreateBookingPayload {
  booking_id: number
  ticket_range: { start: number; end: number }
  pic_name: string
  phone_number: string
  from: string
  to: string
  roundtrip: string
  age_group: string
  customer_type: string
  funnel_from?: string

  constructor({
    booking_id,
    ticket_range,
    pic_name,
    phone_number,
    from,
    to,
    roundtrip,
    age_group,
    customer_type,
    funnel_from,
  }: {
    booking_id: number
    ticket_range: { start: number; end: number }
    pic_name: string
    phone_number: string
    from: string
    to: string
    roundtrip: string
    age_group: string
    customer_type: string
    funnel_from?: string
  }) {
    this.booking_id = booking_id
    this.ticket_range = ticket_range
    this.pic_name = pic_name
    this.phone_number = phone_number
    this.from = from
    this.to = to
    this.roundtrip = roundtrip
    this.age_group = age_group
    this.customer_type = customer_type
    this.funnel_from = funnel_from
  }
}

export const bookingConverter = {
  toFirestore: (booking: Booking) => {
    return {
      booking_id: booking.booking_id,
      pic_name: booking.pic_name,
      phone_number: booking.phone_number,
      from: booking.from,
      to: booking.to,
      funnel_from: booking.funnel_from ? booking.funnel_from : '',
      created_at: booking.created_at,
    }
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const booking = snapshot.data(options)
    return new Booking({
      booking_id: booking.booking_id,
      pic_name: booking.pic_name,
      phone_number: booking.phone_number,
      from: booking.from,
      to: booking.to,
      funnel_from: booking?.funnel_from,
      created_at: booking.created_at,
    })
  },
}
