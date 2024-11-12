import './hello.js';

import { LitElement, html } from 'lit';

export class MyApp extends LitElement {
  render() {
    return html`
      <my-hello name="Romain"></my-hello>
    `;
  }
}

window.customElements.define('my-app', MyApp);
