import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  where,
} from 'firebase/firestore'
import { db } from 'connectors/firebaseClient'
import {
  Booking,
  CreateBookingPayload,
  bookingConverter,
} from 'backend/models/booking'
import { Ticket } from 'backend/models/ticket'
import { TICKET_REF } from 'backend/services/ticket'

export const BOOKING_REF = 'bookings'

// TODO: use transaction
export const createBooking = async (
  request: CreateBookingPayload
): Promise<Error | null> => {
  try {
    // check if booking_id is used
    const checkBookingDoesExist = await getBookingByBookingId(
      request.booking_id
    )
    if (checkBookingDoesExist.bookings) {
      throw new Error('Booking with Booking ID already exists!')
    }

    // make booking from request
    const booking = new Booking({
      booking_id: request.booking_id,
      pic_name: request.pic_name,
      phone_number: request.phone_number,
      from: request.from,
      to: request.to,
      funnel_from: request.funnel_from,
    })
    const bookingRef = collection(db, BOOKING_REF).withConverter(
      bookingConverter
    )
    addDoc(bookingRef, booking)

    // make tickets from request
    const ticketRef = collection(db, TICKET_REF)
    for (
      let i = request.ticket_range.start;
      i <= request.ticket_range.end;
      i++
    ) {
      const ticket = new Ticket({
        booking_id: request.booking_id,
        customer_name: request.pic_name,
        customer_type: request.customer_type,
        age_group: request.age_group,
        roundtrip: request.roundtrip,
      })
      addDoc(ticketRef, ticket)
    }

    return null
  } catch (error: any) {
    return new Error(error.message)
  }
}

export const getBookingByBookingId = async (
  bookingID: string
): Promise<{
  bookings: Booking[]
  error: Error | null
}> => {
  try {
    const ref = collection(db, BOOKING_REF)
    const q = query(ref, where('booking_id', '==', bookingID))

    const querySnapshot = await getDocs(q)
    let res: Booking[] = []

    querySnapshot.forEach((doc) => {
      const booking: Booking = new Booking(<Booking>{
        id: doc.id,
        ...doc.data(),
      })
      res.push(booking)
    })
    return { bookings: res, error: null }
  } catch (error: any) {
    return { bookings: [], error: new Error(error.message) }
  }
}

export const getBooking = async (): Promise<{
  bookings: Booking[]
  error: Error | null
}> => {
  try {
    const ref = collection(db, BOOKING_REF)
    const q = query(ref)

    const querySnapshot = await getDocs(q)
    let res: Booking[] = []

    querySnapshot.forEach((doc) => {
      const ticket: Booking = new Booking(<Booking>{
        id: doc.id,
        ...doc.data(),
      })
      res.push(ticket)
    })
    return { bookings: res, error: null }
  } catch (error: any) {
    return { bookings: [], error: new Error(error.message) }
  }
}

export const deleteBooking = async (docID: string): Promise<Error | null> => {
  try {
    deleteDoc(doc(db, BOOKING_REF, docID))
    return null
  } catch (error: any) {
    return new Error(error.message)
  }
}
