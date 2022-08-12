import { collection, query, getDocs, addDoc } from 'firebase/firestore'
import { db } from 'connectors/firebaseClient'
import { Partner, partnerConverter } from 'backend/models/partner'

export const createPartner = async (partner: Partner) => {
  try {
    const partnerObj = new Partner({ name: partner.name, role: partner.role })
    const partnerRef = collection(db, 'partners').withConverter(
      partnerConverter
    )
    addDoc(partnerRef, partnerObj)
  } catch (error: any) {
    return new Error(error.message)
  }
}

export const getPartners = async () => {
  try {
    const partnerRef = collection(db, 'partners')
    const q = query(partnerRef)

    const querySnapshot = await getDocs(q)
    let res: Partner[] = []

    querySnapshot.forEach((doc) => {
      const partner: Partner = new Partner(<Partner>{ ...doc.data() })
      res.push(partner)
    })
    return { res }
  } catch (error: any) {
    return new Error(error.message)
  }
}
