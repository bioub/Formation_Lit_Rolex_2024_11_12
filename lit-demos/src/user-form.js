import { LitElement, html } from 'lit';

export class UserFormElement extends LitElement {
  /** @type {import('lit').PropertyDeclarations} */
  static properties = {
    user: { type: Object },
  };

  constructor() {
    super();
    this.user = { name: '', email: '', newsletter: false };
  }

  /**
   * @param {SubmitEvent} event 
   */
  submit(event) {
    event.preventDefault();
    console.log(this.user);
  }

  setValue(name, value) {
    this.user = { ...this.user, [name]: value };
  }

  render() {
    return html`
      <form @submit=${this.submit}>
        <input type="text" placeholder="Name" .value=${this.user.name} @input=${() => this.setValue('name', e.target.value)} />
        <input type="email" placeholder="Email" .value=${this.user.email} @input=${() => this.setValue('email', e.target.value)} />
        <input type="checkbox" .checked=${this.user.newsletter} @change=${() => this.setValue('newsletter', e.target.checked)} />
        <button type="submit">Submit</button>
      </form>
    `;
  }
}

customElements.define('my-user-form', UserFormElement);