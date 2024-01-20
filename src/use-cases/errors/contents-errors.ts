export class UnableCreateContentError extends Error {
  constructor() {
    super();
    this.message = 'Unable to create content.';
  }
}

export class UnableUpdateContentError extends Error {
  constructor() {
    super();
    this.message = 'Unable to update content.';
  }
}

export class UnableRemoveContentError extends Error {
  constructor() {
    super();
    this.message = 'Unable to remove content.';
  }
}
