import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  organization_id?: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

export function makePet(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    organizationId: overwrite?.organization_id ?? crypto.randomUUID(),
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    age: overwrite?.age ?? faker.number.int().toString(),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['small', 'medium', 'large']),
    energyLevel:
      overwrite?.energy_level ??
      faker.helpers.arrayElement(['low', 'medium', 'high']),
    environment:
      overwrite?.environment ??
      faker.helpers.arrayElement(['indoor', 'outdoor']),
  }
}
