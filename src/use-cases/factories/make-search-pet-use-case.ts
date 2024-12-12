import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetsUseCase } from '../search-pets-use-case'

export function makeSearchPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetsUseCase(prismaPetsRepository)

  return useCase
}
