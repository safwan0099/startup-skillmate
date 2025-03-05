
export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
  bio?: string
  role: 'student' | 'startup' | 'admin'
  skills?: string[]
  languages?: string[]
  experience?: Experience[]
  education?: Education[]
  availability?: Availability
  createdAt: Date
  updatedAt: Date
}

export interface Experience {
  id: string
  userId: string
  title: string
  company: string
  description?: string
  startDate: Date
  endDate?: Date
  current: boolean
}

export interface Education {
  id: string
  userId: string
  institution: string
  degree: string
  field: string
  startDate: Date
  endDate?: Date
  current: boolean
}

export interface Availability {
  status: 'available' | 'limited' | 'unavailable'
  hours?: number
  startDate?: Date
}

export interface Problem {
  id: string
  title: string
  description: string
  startupId: string
  startup?: User
  requiredSkills: string[]
  experienceLevel: 'beginner' | 'intermediate' | 'advanced'
  compensation?: string
  deadline?: Date
  status: 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export interface Application {
  id: string
  userId: string
  user?: User
  problemId: string
  problem?: Problem
  coverLetter?: string
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
  createdAt: Date
  updatedAt: Date
}
