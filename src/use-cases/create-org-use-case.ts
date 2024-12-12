import { IOrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  email: string
  whatsapp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Organization
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: IOrganizationsRepository) {}

  async execute({
    name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgByEmail = await this.orgsRepository.findByEmail(email)

    if (orgByEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      whatsapp,
      password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })

    return {
      org,
    }
  }
}
