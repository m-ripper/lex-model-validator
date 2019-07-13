export class BaseError {
  private readonly $message: string;

  constructor(message: string) {
    this.$message = message;
  }

  get message() {
    return this.$message;
  }
}
