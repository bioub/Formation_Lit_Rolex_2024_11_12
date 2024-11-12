import './hello.js';
import './select.js';
import './user-form.js';

import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';

export class MyApp extends LitElement {
  static properties = {
    name: { type: String },
  };

  mySelectRef = createRef();

  constructor() {
    super();
    this.name = 'World';
  }
  
  firstUpdated() {
    super.firstUpdated();
    this.mySelectRef.value.openMenu();
  }

  changeName(event) {
    this.name = event.detail;
  }

  render() {
    return html`
      <div>
        <my-hello name=${this.name}></my-hello>
        <my-select ${ref(this.mySelectRef)} item=${this.name} .items="${['Romain', 'Jean', 'Paul']}" @item-change=${this.changeName}></my-select>
        <my-user-form></my-user-form>
      </div>
    `;
  }
}

window.customElements.define('my-app', MyApp);
