import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { FetchNearbyOrgsUseCase } from '../fetch-nearby-orgs-use-case'

export function makeFetchNearbyOrgsUseCase() {
  const prismaOrgsRepository = new PrismaOrganizationsRepository()
  const useCase = new FetchNearbyOrgsUseCase(prismaOrgsRepository)

  return useCase
}
