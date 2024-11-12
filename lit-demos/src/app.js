import './hello.js';
import './select.js';
import './user-form.js';

import { LitElement, html } from 'lit';

export class MyApp extends LitElement {
  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = 'World';
  }

  changeName(event) {
    this.name = event.detail;
  }

  render() {
    return html`
      <div>
        <my-hello name=${this.name}></my-hello>
        <my-select item=${this.name} .items="${['Romain', 'Jean', 'Paul']}" @item-change=${this.changeName}></my-select>
        <my-user-form></my-user-form>
      </div>
    `;
  }
}

window.customElements.define('my-app', MyApp);
