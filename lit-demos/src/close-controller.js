import { SelectElement } from "./select";

export class CloseController {

  /**
   * @param {SelectElement} host 
   */
  constructor(host) {
    this.host = host;
    this.host.addController(this);
  }

  // closeMenu() {
  //   si le listener était ici on peut appeler requestUpdate pour raffraichir le template
  //   this.host.requestUpdate();
  // }

  hostConnected() {
    window.addEventListener('click', this.host.closeMenu);
  }

  hostDisconnected() {
    window.removeEventListener('click', this.host.closeMenu);
  }
}