import { Organization, Prisma } from '@prisma/client'
import {
  FindManyNearbyParams,
  IOrganizationsRepository,
} from '../organizations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationsRepository implements IOrganizationsRepository {
  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const organizations = prisma.$queryRaw<Organization[]>`
      SELECT * from gyms
      WHERE (6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) + sin( radians(${latitude})) * sin(radians(latitude)))) <= 10
    `

    return organizations
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }
}
