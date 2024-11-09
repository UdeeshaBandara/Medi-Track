export class FileUploadEvent {
    constructor(public readonly fileName: string,public readonly file: Buffer) {}
  }