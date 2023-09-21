import { FetchError } from "./FetchError";

const defaultMethod = "GET";
const defaultHeaders = {
  "content-type": "application/json",
  accept: "application/json",
};

class FetchApi {
  private abortController: AbortController | undefined;

  abort() {
    this.abortController?.abort();
  }

  get aborted() {
    return this.abortController?.signal.aborted;
  }

  private async request(
    url: string,
    opts: RequestInit = {},
    headers: Record<string, string> = {}
  ) {
    this.abortController = new AbortController();

    const resp = await fetch(url, {
      method: defaultMethod,
      headers: defaultHeaders,
      ...opts,
      signal: this.abortController.signal,
    });

    if (!resp.ok) {
      const json = await resp.json();
      throw new FetchError(json.message, resp.status);
    }

    if (resp.status === 204) {
      return {};
    }

    const json = await resp.json();
    const result: Record<string, any> = {
      data: json,
    };

    Object.entries(headers).forEach(([varKey, headerKey]) => {
      const val = resp.headers.get(headerKey);
      if (val !== undefined && val !== "") {
        result[varKey] = val;
      }
    });
    return result;
  }

  async get(
    url: string,
    opts: RequestInit = {},
    headers: Record<string, string> = {}
  ) {
    opts.method = "GET";
    return await this.request(url, opts, headers);
  }

  async post(url: string, opts: RequestInit = {}) {
    opts.method = "POST";
    return await this.request(url, opts);
  }

  async put(url: string, opts: RequestInit = {}) {
    opts.method = "PUT";
    return await this.request(url, opts);
  }

  async delete(url: string, opts: RequestInit = {}) {
    opts.method = "DELETE";
    await this.request(url, opts);
  }
}

export default new FetchApi();
