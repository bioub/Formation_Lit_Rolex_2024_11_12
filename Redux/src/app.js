import "./components/top-bar";

import { ContextProvider } from "@lit/context";
import { LitElement, css, html } from "lit";

import { Router } from "./lib/router/index.js";
import { routerContext, routes } from "./routes";
import { store, storeContext } from "./store";

export class AppComponent extends LitElement {
  _storeProvider = new ContextProvider(this, {
    context: storeContext,
    initialValue: store,
  });
  _routerProvider = new ContextProvider(this, {
    context: routerContext,
    initialValue: new Router({
      routes: routes,
      useHistory: true,
    }),
  });

  static styles = css`
    main {
      padding: 1rem;
    }
  `;

  render() {
    return html`
      <my-top-bar></my-top-bar>
      <main>
        <rlx-flx-router-view
          .router=${this._routerProvider.value}
        ></rlx-flx-router-view>
      </main>
    `;
  }
}

customElements.define("my-app", AppComponent);
