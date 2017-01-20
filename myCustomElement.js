
(function() {
  "use strict";

  class MyCustomElement extends HTMLElement {

    constructor() {
      super();
    }

    set selected(value) {
      if (this._selected === value) return;
      this._selected = value;
      this.setAttribute('selected', this._selected);
    }

    get selected() {
      return this._selected;
    }

    static get observedAttributes() {
      return ['selected'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
      this[attrName] = newVal;
    }

    connectedCallback() {
      this.addEventListener('click', this.onClick);
    }

    onClick(e) {
      this.selected = !this.selected;
      this.dispatchEvent(new CustomEvent('selected-changed', {
        detail: {selected: this.selected}, bubbles: false
      }));
    }

  }

  window.customElements.define('my-custom-element', MyCustomElement);
})();
