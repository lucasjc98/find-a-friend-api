import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { makeOrganization } from '@/utils/tests/factories/make-organization.factory'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new org', async () => {
    const response = await request(app.server)
      .post('/orgs')
      .send(makeOrganization())

    expect(response.status).toBe(201)
  })
})
