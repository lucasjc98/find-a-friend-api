import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetUseCase } from './get-pet-use-case'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { makePet } from '@/utils/tests/factories/make-pet.factory'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrganizationsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a new pet', async () => {
    const newPet = makePet()

    const pet = await petsRepository.create({
      ...newPet,
      organization_id: newPet.organizationId,
      energy_level: newPet.energyLevel,
    })

    const result = await sut.execute({ id: pet.id })

    expect(result.pet).toEqual(pet)
  })

  it('should not be able to get a non-existing pet', async () => {
    await expect(sut.execute({ id: 'invalid' })).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
