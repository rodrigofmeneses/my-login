export interface Profile {
  id?: number
  bio?: string
  avatar?: string
}

export interface User {
  id?: number
  username: string
  password: string
  profile?: Profile
}
