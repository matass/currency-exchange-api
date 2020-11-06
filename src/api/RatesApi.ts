import https from 'https';

export class RatesApi {
  private uri: string;

  constructor() {
    this.uri = process.env.API_URL;
  }

  async get(path: string): Promise<string> {
    return new Promise(resolve => {
      let buffer = '';

      https.get({host: this.uri, path}, (resp: any) => {
        resp.on('data', batch => { buffer += batch });
        resp.on('end', () => { resolve(buffer) });
      });
    });
  }
}
