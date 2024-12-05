export class MockResponse {
  body: any;
  init: { status: number };

  constructor(body: any, init: { status: number }) {
    this.body = body;
    this.init = init;
  }

  async json() {
    return JSON.parse(this.body);
  }

  text() {
    return Promise.resolve(this.body.toString());
  }

  get status() {
    return this.init.status;
  }

  // Métodos estáticos requeridos por TypeScript
  static error() {
    return new this(JSON.stringify({ error: "Mock Error" }), { status: 500 });
  }

  static json(data: any, init: { status?: number } = {}) {
    return new this(JSON.stringify(data), { status: init.status ?? 200 });
  }

  static redirect(url: string | URL, status: number = 302) {
    return new this(`Redirected to ${url.toString()}`, { status });
  }
}
