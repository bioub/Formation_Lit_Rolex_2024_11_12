import { LitElement, css, html, nothing } from 'lit';

export class SelectElement extends LitElement {
  static properties = {
    item: { type: String },
    items: { type: Array },
    _menuOpen: { type: Boolean, state: true },
  };

  constructor() {
    super();
    this.item = '';
    this.items = [];
    this._menuOpen = false;
  }

  closeMenu = (event) => { 
    if (!this.contains(event.target)) {
      this._menuOpen = false;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this.closeMenu, { passive: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this.closeMenu, { passive: true });
  }

  toggleOpenMenu() {
    this._menuOpen = !this._menuOpen;
  }

  selectItem(item) {
    this.item = item;
    this._menuOpen = false;
    this.shadowRoot.dispatchEvent(
      new CustomEvent('item-change', {
        detail: item,
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <div class="selected" @click=${this.toggleOpenMenu}>${this.item}</div>
      ${this._menuOpen
        ? html`<div class="menu">
            ${this.items.map(
              (item) =>
                html`<div class="item" @click=${() => this.selectItem(item)}>
                  ${item}
                </div> `,
            )}
          </div>`
        : nothing}
    `;
  }

  static styles = css`
    .selected {
      border: 1px solid black;
      padding: 5px;
      cursor: pointer;
    }

    .menu {
      border: 1px solid black;
    }

    .item {
      padding: 5px;
      cursor: pointer;
    }
  `;
}

customElements.define('my-select', SelectElement);
