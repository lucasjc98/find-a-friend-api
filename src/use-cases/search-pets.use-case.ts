import { IPetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
  energyLevel?: string
  environment?: string
  page: number
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: IPetsRepository) {}

  async execute({
    city,
    age,
    size,
    energyLevel,
    environment,
    page,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll(
      {
        city,
        age,
        size,
        energy_level: energyLevel,
        environment,
      },
      page,
    )

    return {
      pets,
    }
  }
}
