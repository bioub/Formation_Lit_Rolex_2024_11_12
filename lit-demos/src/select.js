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
    if (!this.shadowRoot.contains(event.composedPath()[0])) {
      this._menuOpen = false;
    }
  };

  openMenu() {
    this._menuOpen = true;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this.closeMenu);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this.closeMenu);
  }

  toggleOpenMenu() {
    this._menuOpen = !this._menuOpen;
  }

  selectItem(event) {
    if (!event.target.classList.contains('item')) {
      return;
    }

    const item = event.target.dataset.item;

    this.item = item;
    this._menuOpen = false;
    this.dispatchEvent(
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
        ? html`<div class="menu" @click=${this.selectItem}>
            ${this.items.map(
              (item) =>
                html`<div class="item" data-item=${item}>
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
