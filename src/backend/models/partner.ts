import { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore'

export class Partner {
  id?: string
  name: string
  role: string

  constructor({ id, name, role }: { id?: string; name: string; role: string }) {
    this.id = id
    this.name = name
    this.role = role
  }
}

export const partnerConverter = {
  toFirestore: (partner: Partner) => {
    return {
      id: partner.id,
      name: partner.name,
      role: partner.role,
    }
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options)
    return new Partner({ id: data.id, name: data.name, role: data.role })
  },
}
