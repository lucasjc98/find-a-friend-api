import { Pet, Prisma } from '@prisma/client'

export interface FindAllParams {
  city: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

export interface IPetsRepository {
  findById(id: string): Promise<Pet | null>
  findAll(params: FindAllParams, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
