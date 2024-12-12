import { Prisma } from '@prisma/client'
import { FindAllParams, IPetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements IPetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findAll(params: FindAllParams, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        organization: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
