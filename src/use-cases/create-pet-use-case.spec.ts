import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet-use-case'
import { makeOrganization } from '@/utils/tests/factories/make-organization.factory'
import { makePet } from '@/utils/tests/factories/make-pet.factory'
import { OrgNotFoundError } from './errors/org-not-found-error'

let orgsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(orgsRepository, petsRepository)
  })

  it('should be able to create a new pet', async () => {
    const newOrg = makeOrganization()

    const org = await orgsRepository.create({
      ...newOrg,
      password_hash: newOrg.password,
    })

    const { pet } = await sut.execute(makePet({ organization_id: org.id }))

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new pet with a non-existing org', async () => {
    const pet = makePet()

    await petsRepository.create({
      ...pet,
      organization_id: pet.organizationId,
      energy_level: pet.energyLevel,
    })

    await expect(sut.execute(pet)).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
