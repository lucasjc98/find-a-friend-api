import { IPetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

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
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    environment,
    organizationId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
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
