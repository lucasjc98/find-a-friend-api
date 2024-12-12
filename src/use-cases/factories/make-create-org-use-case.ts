import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { CreateOrgUseCase } from '../create-org-use-case'

export function makeCreateOrgUseCase() {
  const prismaOrgsRepository = new PrismaOrganizationsRepository()
  const useCase = new CreateOrgUseCase(prismaOrgsRepository)

  return useCase
}
