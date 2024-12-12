import { IOrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'

interface FetchNearbyOrgsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyOrgsUseCaseResponse {
  orgs: Organization[]
}

export class FetchNearbyOrgsUseCase {
  constructor(private orgsRepository: IOrganizationsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyOrgsUseCaseRequest): Promise<FetchNearbyOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      orgs,
    }
  }
}
