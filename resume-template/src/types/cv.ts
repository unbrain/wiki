export interface CVExperience {
  title: string
  company?: string
  subtitle?: string
  summary?: string
  bullets?: string[]
}

export interface CVEducationItem {
  degree: string
  school: string
  year: string
}

export interface CVReferenceCard {
  title?: string
  name?: string
  header?: string
  role?: string
  phone?: string
  email?: string
  endorsement?: string
  items?: string[]
}

export interface CVInfrastructureItem {
  degree: string
  school: string
  year: string
}

export interface CVRecipient {
  label?: string
  name?: string
  role?: string
  address?: string
}

export interface CVPerson {
  nameFirst?: string
  nameLast?: string
  nameCn?: string
  role?: string
  roleCn?: string
  photo?: string
  photoFit?: 'cover' | 'contain'
  photoPosition?: string
  photoScale?: number
  greeting?: string
  aboutStamp?: string
  introBio?: string
}

export interface CVMeta {
  year?: string
  website?: string
  addressTitle?: string
  addressLines?: string
  coverLetterContacts?: string
}

export interface CVPage2 {
  badge?: string
  profileTitle?: string
  profileOverview?: string
  expTitle?: string
  experiences?: CVExperience[]
  skills?: CVExperience[]
  referenceCard?: CVReferenceCard
  education?: {
    title?: string
    items?: CVEducationItem[]
  }
  extraArtifacts?: {
    title?: string
    items?: CVEducationItem[]
  }
}

export interface CVPage3 {
  badge?: string
  profileTitle?: string
  profileOverview?: string
  expTitle?: string
  experiences?: CVExperience[]
  referenceCard?: CVReferenceCard
  infrastructureBlock?: {
    title?: string
    items?: CVInfrastructureItem[]
  }
  materialBlock?: {
    title?: string
    items?: CVInfrastructureItem[]
  }
  manifesto?: {
    title?: string
    quote?: string
  }
  // If used as cover letter in 3-page mode:
  yearBadge?: string
  dateTitle?: string
  date?: string
  recipient?: CVRecipient
  letterTitle?: string
  letterBody?: string[]
  sincerely?: string
  signatureText?: string
  signerName?: string
}

export interface CVPage4 {
  badge?: string
  yearBadge?: string
  dateTitle?: string
  date?: string
  recipient?: CVRecipient
  letterTitle?: string
  letterBody?: string[]
  sincerely?: string
  signatureText?: string
  signerName?: string
}

export interface CVData {
  id: string
  label: string
  pageCount: number
  meta: CVMeta
  person: CVPerson
  page2: CVPage2
  page3: CVPage3
  page4?: CVPage4
}

export type CVDatabase = Record<string, CVData>
