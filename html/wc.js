const template = document.createElement('template');
template.innerHTML = `
  <style>
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");
  img {
    width: 100%;
 }
  a, li {
    color: #fff;
    list-style: none;
 }
  .info ul {
    padding-top: 5px;
 }
  .info ul li {
    margin-top: 10px;
 }
  .info ul li img {
    width: 16px;
    margin-right: 5px;
 }
  #logo {
    width: 75px;
    margin-left: 40px;
    padding-top: 30px;
 }
  footer {
    font-size: 14px;
    font-family: Pretendard;
    background-color: #2553a0;
    color: #fff;
    font-weight: 300;
 }
  footer .items {
    padding: 20px 40px;
 }
  footer .items ul li {
    padding: 3px 0px;
 }
  .icons {
    display: flex;
    height: 70px;
    margin-top: 20px;
 }
  .icons li {
    margin-right: 20px;
 }
  .line {
    height: 1px;
    border-top: #fff 3px solid;
 }
  @media screen and (min-width: 700px) {
    footer {
      background: #2553a0;
   }
    .wrapper {
      font-size: 16px;
      font-weight: 300;
      display: flex;
      align-items: center;
      height: 400px;
      max-width: 1440px;
      margin: 0 auto;
   }
    .wrapper div {
      flex: 1;
   }
    .wrapper .line {
      display: none;
   }
    .wrapper #logo {
      display: flex;
      margin: 0 auto;
      justify-content: center;
   }
    .wrapper #logo div {
      max-width: 150px;
   }
    .wrapper #logo div img {
      width: 100%;
   }
 }
  
  </style>

  <footer>
  <div class="wrapper">
    <div id="logo">
      <div>
        <img src="https://justkor.hgodo.com/corp/img/logo.svg" alt="" />
      </div>
    </div>
    <div class="items">
      <ul>
        <li>법인명 : (주)유스트코리아</li>
        <li>대표자명 : 임순채</li>
        <li>사업자번호 : 261-81-02131</li>
      </ul>
      <div class="info">
        <ul>
          <li>
            <img src="https://justkor.hgodo.com/corp/img/home_icon.svg" alt="" />
            서울특별시 강남구 압구정로80길 11 3층
          </li>
          <li>
            <img src="https://justkor.hgodo.com/corp/img/phone-call.svg" alt="" />
            0507-1300-4056
          </li>
          <li>
            <img src="https://justkor.hgodo.com/corp/img/fax.svg" alt="" />
            02-3482-4055
          </li>
          <li>
            <img src="https://justkor.hgodo.com/corp/img/time.svg" alt="" />
            평일 오전 10 : 00 ~ 오후 18 : 00
          </li>
          <li>
            <img src="https://justkor.hgodo.com/corp/img/email.svg" alt="" />
            <a href="mailto:hq@justkorea.co.kr">hq@justkorea.co.kr</a>
          </li>
        </ul>
      </div>
      <div class="icons">
        <li>
          <img src="https://justkor.hgodo.com/corp/img/instagram_figma.svg" alt="" />
        </li>
        <li>
          <img src="https://justkor.hgodo.com/corp/img/youtube_figma.svg" alt="" />
        </li>
      </div>
    </div>
  </div>
</footer>
`;

export class justFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // const name = this.getAttribute('name') || 'World';
    // this.shadowRoot.querySelector('#name').textContent = name;
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