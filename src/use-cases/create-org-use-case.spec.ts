import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeOrganization } from '@/utils/tests/factories/make-organization.factory'
import { CreateOrgUseCase } from './create-org-use-case'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrganizationsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create an org', async () => {
    const { org } = await sut.execute(makeOrganization())

    expect(orgsRepository.items).toHaveLength(1)
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create an org with an existing e-email', async () => {
    const org = makeOrganization()

    await orgsRepository.create({ ...org, password_hash: org.password })

    await expect(sut.execute(org)).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
