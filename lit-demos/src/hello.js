import { LitElement, html } from 'lit';

export class MyHello extends LitElement {
  /** @type {import('lit').PropertyDeclarations} */
  static properties = {
    name: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.name = 'World';
  }

  render() {
    return html`<h1>Hello, ${this.name}!</h1>`;
  }
}

customElements.define('my-hello', MyHello);