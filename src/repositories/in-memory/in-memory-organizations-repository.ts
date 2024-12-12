import { Organization, Prisma } from '@prisma/client'
import {
  FindManyNearbyParams,
  IOrganizationsRepository,
} from '../organizations-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryOrganizationsRepository
  implements IOrganizationsRepository
{
  public items: Organization[] = []

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      created_at: new Date(),
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(org)

    return org
  }
}
