import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyOrgsUseCase } from './fetch-nearby-orgs-use-case'
import { makeOrganization } from '@/utils/tests/factories/make-organization.factory'

let orgsRepository: InMemoryOrganizationsRepository
let sut: FetchNearbyOrgsUseCase

describe('Fetch Nearby Orgs Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrganizationsRepository()
    sut = new FetchNearbyOrgsUseCase(orgsRepository)
  })

  it('should be able to fetch nearby orgs', async () => {
    const newOrg = makeOrganization()

    const org = await orgsRepository.create({
      ...newOrg,
      password_hash: newOrg.password,
    })

    const nearbyOrgs = await sut.execute({
      userLatitude: org.latitude.toNumber(),
      userLongitude: org.longitude.toNumber(),
    })

    expect(nearbyOrgs.orgs).toEqual([org])
  })
})
