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
import { Ticket } from 'backend/models/ticket'

export const TICKET_REF = 'tickets'

export const createTicket = async (ticket: Ticket): Promise<Error | null> => {
  try {
    const ref = collection(db, TICKET_REF)
    addDoc(ref, ticket)
    return null
  } catch (error: any) {
    return new Error(error.message)
  }
}

export const getTickets = async (): Promise<{
  tickets: Ticket[]
  error: Error | null
}> => {
  try {
    const ref = collection(db, TICKET_REF)
    const q = query(ref)

    const querySnapshot = await getDocs(q)
    let res: Ticket[] = []

    querySnapshot.forEach((doc) => {
      const ticket: Ticket = new Ticket(<Ticket>{
        id: doc.id,
        ...doc.data(),
      })
      res.push(ticket)
    })
    return { tickets: res, error: null }
  } catch (error: any) {
    return { tickets: [], error: new Error(error.message) }
  }
}

export const getTicketByBookingId = async (
  bookingID: string
): Promise<{
  tickets: Ticket[]
  error: Error | null
}> => {
  try {
    const ref = collection(db, TICKET_REF)
    const q = query(ref, where('booking_id', '==', bookingID))

    const querySnapshot = await getDocs(q)
    let res: Ticket[] = []

    querySnapshot.forEach((doc) => {
      const ticket: Ticket = new Ticket(<Ticket>{
        id: doc.id,
        ...doc.data(),
      })
      res.push(ticket)
    })
    return { tickets: res, error: null }
  } catch (error: any) {
    return { tickets: [], error: new Error(error.message) }
  }
}

export const deleteTicket = async (docID: string): Promise<Error | null> => {
  try {
    deleteDoc(doc(db, TICKET_REF, docID))
    return null
  } catch (error: any) {
    return new Error(error.message)
  }
}
