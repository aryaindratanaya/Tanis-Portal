import { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore'

export class Partner {
  name: string
  role: string

  constructor(name: string, role: string) {
    this.name = name
    this.role = role
  }
}

export const partnerConverter = {
  toFirestore: (partner: Partner) => {
    return {
      name: partner.name,
      role: partner.role,
    }
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options)
    return new Partner(data.name, data.role)
  },
}
