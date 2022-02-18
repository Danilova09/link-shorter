export class Link {
  constructor(
    public _id: string,
    public shortUrl: string,
    public originalUrl: string,
  ) {}
}

export interface LinkData {
  shortUrl: string,
  originalUrl: string,
}
