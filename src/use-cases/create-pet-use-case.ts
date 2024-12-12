import { IOrganizationsRepository } from '@/repositories/organizations-repository'
import { IPetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { OrgNotFoundError } from './errors/org-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energyLevel: string
  environment: string
  organizationId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: IOrganizationsRepository,
    private petsRepository: IPetsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    environment,
    organizationId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(organizationId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level: energyLevel,
      environment,
      organization_id: organizationId,
    })

    return {
      pet,
    }
  }
}
