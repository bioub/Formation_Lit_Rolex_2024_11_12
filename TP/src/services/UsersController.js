export class UsersController {

  items = [];
  abortController = new AbortController();

  constructor(host) {
    this.host = host;
    this.host.addController(this);
  }

  async hostConnected() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        signal: this.abortController.signal,
      });
      this.items = await res.json();
      this.host.requestUpdate();
    } catch (error) {
      if (error.name !== 'AbortError') {
        throw error;
      }
    }
  }

  hostDisconnected() {
    this.abortController.abort();
  }

}