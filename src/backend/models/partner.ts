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
