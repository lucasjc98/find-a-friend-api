import { Pet, Prisma } from '@prisma/client'
import { FindAllParams, IPetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { InMemoryOrganizationsRepository } from './in-memory-organizations-repository'

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrganizationsRepository) {}

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findAll(params: FindAllParams, page: number) {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items
      .filter((item) =>
        orgsByCity.some((org) => org.id === item.organization_id),
      )
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      )
      .slice((page - 1) * 20, page * 20)

    return pets
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: randomUUID(),
      ...data,
      created_at: new Date(),
      organization_id: 'org-01',
    }

    this.items.push(pet)

    return pet
  }
}
