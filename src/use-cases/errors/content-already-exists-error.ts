export class ContentAlreadyExistsError extends Error {
  constructor() {
    super('Content Already Exists');
  }
}
