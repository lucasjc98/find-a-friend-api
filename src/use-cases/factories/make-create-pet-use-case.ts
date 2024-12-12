import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet-use-case'

export function makeCreatePetUseCase() {
  const prismaOrgsRepository = new PrismaOrganizationsRepository()
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(
    prismaOrgsRepository,
    prismaPetsRepository,
  )

  return useCase
}
