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
): Promise<{ error: unknown }> => {
  try {
    const partnerRef = collection(db, 'partners')
    await addDoc(partnerRef, partner)
    return { error: null }
  } catch (error: any) {
    return { error }
  }
}

export const getPartners = async (): Promise<{
  partners: Partner[]
  error: unknown
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
  } catch (error) {
    return { partners: [], error }
  }
}

export const deletePartner = async (
  docID: string
): Promise<{ error: unknown }> => {
  try {
    await deleteDoc(doc(db, 'partners', docID))
    return { error: null }
  } catch (error) {
    return { error }
  }
}
