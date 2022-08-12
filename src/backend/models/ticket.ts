export class Ticket {
  id?: string
  booking_id: string
  customer_name: string
  customer_type: string
  age_group: string
  roundtrip: boolean

  constructor({
    id,
    booking_id,
    customer_name,
    customer_type,
    age_group,
    roundtrip,
  }: {
    id?: string
    booking_id: string
    customer_name: string
    customer_type: string
    age_group: string
    roundtrip: boolean
  }) {
    this.id = id
    this.booking_id = booking_id
    this.customer_name = customer_name
    this.customer_type = customer_type
    this.age_group = age_group
    this.roundtrip = roundtrip
  }
}
