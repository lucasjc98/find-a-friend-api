import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.string().optional(),
  energyLevel: z.string().optional(),
  environment: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
})

export async function searchPetsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { city, age, size, energyLevel, environment, page } = querySchema.parse(
    request.query,
  )

  const searchPetsUseCase = makeSearchPetsUseCase()

  try {
    const { pets } = await searchPetsUseCase.execute({
      city,
      age,
      size,
      energyLevel,
      environment,
      page,
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
