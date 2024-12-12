import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrgUseCase } from './authenticate-org-use-case'
import { hash } from 'bcryptjs'
import { makeOrganization } from '@/utils/tests/factories/make-organization.factory'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrganizationsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate an org', async () => {
    const newOrg = makeOrganization({ password: await hash('123456', 6) })

    const org = await orgsRepository.create({
      ...newOrg,
      password_hash: newOrg.password,
    })

    const { org: authenticatedOrg } = await sut.execute({
      email: org.email,
      password: '123456',
    })

    expect(authenticatedOrg.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const newOrg = makeOrganization({ password: await hash('123456', 6) })

    const org = await orgsRepository.create({
      ...newOrg,
      password_hash: newOrg.password,
    })

    await expect(
      sut.execute({
        email: org.email,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
