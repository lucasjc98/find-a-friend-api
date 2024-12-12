import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '../get-pet-use-case'

export function makeFetchNearbyOrgsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new GetPetUseCase(prismaPetsRepository)

  return useCase
}
