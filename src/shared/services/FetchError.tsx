export class FetchError extends Error {
  readonly code: number;
  readonly message: string;
  readonly name: string = "FetchError";

  constructor(message: string, code = 0) {
    super(message);
    this.message = message;
    this.code = code;
  }
}
