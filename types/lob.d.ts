declare module 'lob' {
  export default class Lob {
    constructor(apiKey: string);
    postcards: {
      create(params: any): Promise<any>;
    };
  }
}
