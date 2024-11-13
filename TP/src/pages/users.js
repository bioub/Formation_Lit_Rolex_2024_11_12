import '../components/users-filter.js';

import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';

import { di } from '../di';
import { UsersController } from '../services/UsersController.js';

export class UsersComponent extends LitElement {
  router = di.inject('router');

  // /** @type {ShadowRootInit} */
  // static shadowRootOptions = { mode: 'closed' };

  usersController = new UsersController(this);

  /** @type {import('lit').PropertyDeclarations} */
  static properties = {
    searchTerm: { type: String },
  };

  constructor() {
    super();
    this.searchTerm = '';
  }

  handleClick(event) {
    event.preventDefault();
    this.router.push(event.target.pathname);
    this.requestUpdate();
  }

  handleFilterChanged(event) {
    this.searchTerm = event.detail;
  }

  render() {
    return html`
      <div class="left">
        <my-users-filter
          filter=${this.searchTerm}
          @filter-changed=${this.handleFilterChanged}
        ></my-users-filter>
        <nav>
          ${repeat(
            this.usersController.items.filter((u) =>
              u.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
            ),
            (user) => user.id,
            (user) => html`
              <a class="${classMap({ active: user.id % 2 === 0 })}" href="#">
                ${user.name}
              </a>
            `,
          )}
        </nav>
      </div>
      <div class="right"></div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      gap: 1rem;
    }

    .left a {
      cursor: pointer;
      display: block;
      padding: 0.5rem;
      text-decoration: none;
      color: black;
    }

    .left a.active {
      background-color: var(--my-bg-color, lightblue);
    }
  `;
}

customElements.define('my-users', UsersComponent);
