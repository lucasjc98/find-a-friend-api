import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateOrgUseCase } from '../authenticate-org-use-case'

export function makeAuthenticateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrganizationsRepository()
  const useCase = new AuthenticateOrgUseCase(prismaOrgsRepository)

  return useCase
}
