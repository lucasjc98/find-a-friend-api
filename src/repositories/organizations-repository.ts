import { Organization, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface IOrganizationsRepository {
  findById(id: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Organization[]>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
}
