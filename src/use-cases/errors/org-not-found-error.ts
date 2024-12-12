export class PetNotFoundError extends Error {
  constructor() {
    super('Organization not found.')
  }
}
