//TODO: Move role under User
export enum Role {
  SUPER_ADMIN,
  ADMIN,
  SUPER_USER,
  USER,
  GUEST
}

export const all = [
  Role.SUPER_ADMIN,
  Role.ADMIN,
  Role.SUPER_USER,
  Role.USER,
]

export interface Actor {
  id: string,
  role: (string | Role)[]
}    