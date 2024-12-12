import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsUseCase } from './search-pets-use-case'
import { makeOrganization } from '@/utils/tests/factories/make-organization.factory'
import { makePet } from '@/utils/tests/factories/make-pet.factory'

let orgsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    let newOrg = makeOrganization()

    const org = await orgsRepository.create({
      ...newOrg,
      password_hash: newOrg.password,
    })

    let pet = makePet()

    await petsRepository.create({
      ...pet,
      organization_id: org.id,
      energy_level: pet.energyLevel,
    })

    pet = makePet()

    await petsRepository.create({
      ...pet,
      organization_id: org.id,
      energy_level: pet.energyLevel,
    })

    newOrg = makeOrganization()

    const org2 = await orgsRepository.create({
      ...newOrg,
      password_hash: newOrg.password,
    })

    pet = makePet()

    await petsRepository.create({
      ...pet,
      organization_id: org2.id,
      energy_level: pet.energyLevel,
    })

    const { pets } = await sut.execute({ city: org.city, page: 1 })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city, page: 1 })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and age', async () => {
    const newOrg = makeOrganization()

    const org = await orgsRepository.create({
      ...newOrg,
      password_hash: newOrg.password,
    })

    let pet = makePet()

    await petsRepository.create({
      ...pet,
      organization_id: org.id,
      energy_level: pet.energyLevel,
    })

    pet = makePet({ age: '1' })

    await petsRepository.create({
      ...pet,
      organization_id: org.id,
      energy_level: pet.energyLevel,
    })

    const { pets } = await sut.execute({ city: org.city, age: '1', page: 1 })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
    const newOrg = makeOrganization()

    const org = await orgsRepository.create({
      ...newOrg,
      password_hash: newOrg.password,
    })

    let pet = makePet({ size: 'small' })

    await petsRepository.create({
      ...pet,
      organization_id: org.id,
      energy_level: pet.energyLevel,
    })

    pet = makePet({ size: 'medium' })

    await petsRepository.create({
      ...pet,
      organization_id: org.id,
      energy_level: pet.energyLevel,
    })

    pet = makePet({ size: 'large' })

    await petsRepository.create({
      ...pet,
      organization_id: org.id,
      energy_level: pet.energyLevel,
    })

    const { pets } = await sut.execute({
      city: org.city,
      size: 'small',
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and energy_level', async () => {
    const newOrg = makeOrganization()

    const org = await orgsRepository.create({
      ...newOrg,
      password_hash: newOrg.password,
    })

    let pet = makePet({ energy_level: 'low' })

    await petsRepository.create({
      ...pet,
      organization_id: org.id,
      energy_level: pet.energyLevel,
    })

    pet = makePet({ energy_level: 'medium' })

    await petsRepository.create({
      ...pet,
      organization_id: org.id,
      energy_level: pet.energyLevel,
    })

    pet = makePet({ energy_level: 'high' })

    await petsRepository.create({
      ...pet,
      organization_id: org.id,
      energy_level: pet.energyLevel,
    })

    const { pets } = await sut.execute({
      city: org.city,
      energyLevel: 'low',
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
    const newOrg = makeOrganization()

    const org = await orgsRepository.create({
      ...newOrg,
      password_hash: newOrg.password,
    })

    let pet = makePet({ environment: 'indoor' })

    await petsRepository.create({
      ...pet,
      organization_id: org.id,
      energy_level: pet.energyLevel,
    })

    pet = makePet({ environment: 'outdoor' })

    await petsRepository.create({
      ...pet,
      organization_id: org.id,
      energy_level: pet.energyLevel,
    })

    const { pets } = await sut.execute({
      city: org.city,
      environment: 'outdoor',
      page: 1,
    })

    expect(pets).toHaveLength(1)
  })
})
