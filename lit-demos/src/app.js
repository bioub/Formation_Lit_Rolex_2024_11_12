import './hello.js';
import './select.js';
import './user-form.js';

import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';

export class MyApp extends LitElement {
  static properties = {
    name: { type: String },
    names: { type: Array },
  };

  mySelectRef = createRef();

  constructor() {
    super();
    this.name = 'World';
    this.names = ['Romain', 'Jean', 'Paul'];
  }
  
  firstUpdated() {
    super.firstUpdated();
    // const mySelectEl = this.shadowRoot.querySelector('my-select');
    // mySelectEl.openMenu();
    this.mySelectRef.value.openMenu();
  }

  changeName(event) {
    this.name = event.detail;
  }

  render() {
    return html`
      <div>
        <my-hello name=${this.name}></my-hello>
        <my-select ${ref(this.mySelectRef)} item=${this.name} .items="${this.names}" @item-change=${this.changeName}></my-select>
        <my-user-form></my-user-form
      </div>
    `;
  }
}

window.customElements.define('my-app', MyApp);
