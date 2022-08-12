import { collection, query, getDocs, addDoc } from 'firebase/firestore'
import { db } from 'connectors/firebaseClient'
import { Partner, partnerConverter } from 'backend/models/partner'

export const createPartner = async (
  partner: Partner
): Promise<Error | null> => {
  try {
    const partnerObj = new Partner({ name: partner.name, role: partner.role })
    const partnerRef = collection(db, 'partners').withConverter(
      partnerConverter
    )
    addDoc(partnerRef, partnerObj)
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
