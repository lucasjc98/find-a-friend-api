import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { makeOrganization } from '@/utils/tests/factories/make-organization.factory'

describe('Fetch Nearby Orgs (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch nearby orgs', async () => {
    const org = makeOrganization()

    await request(app.server).post('/orgs').send(org).expect(201)

    const response = await request(app.server)
      .get('/orgs/nearby')
      .query({ latitude: org.latitude, longitude: org.longitude })
      .expect(200)

    expect(response.body.orgs).toHaveLength(1)
    expect(response.body.orgs[0].name).toEqual(org.name)
  })
})
