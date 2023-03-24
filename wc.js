const template = document.createElement('template');
template.innerHTML = `
  <style>
    .greeting {
      font-size: 2em;
      font-weight: bold;
      margin-bottom: 1em;
      color: red;
    }
  </style>

  <div class="greeting">
    Hello, <span id="name"></span>!
  </div>
`;

export class MyGreeting extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const name = this.getAttribute('name') || 'World';
    this.shadowRoot.querySelector('#name').textContent = name;
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name' && oldValue !== newValue) {
      this.shadowRoot.querySelector('#name').textContent = newValue;
    }
  }
}

customElements.define('my-greeting', MyGreeting);