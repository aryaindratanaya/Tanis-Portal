import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { db } from 'connectors/firebaseClient'
import { Partner } from 'backend/models/partner'

export const createPartner = async (
  partner: Partner
): Promise<Error | null> => {
  try {
    const partnerRef = collection(db, 'partners')
    addDoc(partnerRef, partner)
    return null
  } catch (error: any) {
    return new Error(error.message)
  }
}

export const getPartners = async (): Promise<{
  partners: Partner[]
  error: Error | null
}> => {
  try {
    const partnerRef = collection(db, 'partners')
    const q = query(partnerRef)

    const querySnapshot = await getDocs(q)
    let res: Partner[] = []

    querySnapshot.forEach((doc) => {
      const partner: Partner = new Partner(<Partner>{
        id: doc.id,
        ...doc.data(),
      })
      res.push(partner)
    })
    return { partners: res, error: null }
  } catch (error: any) {
    return { partners: [], error: new Error(error.message) }
  }
}

export const deletePartner = async (docID: string): Promise<Error | null> => {
  try {
    deleteDoc(doc(db, 'partners', docID))
    return null
  } catch (error: any) {
    return new Error(error.message)
  }
}
