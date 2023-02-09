javascript: function addScript() {
  var head = document.getElementsByTagName('head')[0];
  var jScript;
  jScript = document.createElement('script');
  jScript.language = 'javascript';
  jScript.src = 'https://cdn.jsdelivr.net/gh/ho-a-ki/bookmarklet@main/main.js';
  jScript.type = 'text/javascript';
  head.appendChild(jScript);
}

function addScriptAndCallFunction(cb) {
  addScript();
  setTimeout(() => {cb()}, 200);
}

sign = prompt("어떤 기능을 실행하겠습니까? \n 1. 증정품 체크 \n 2. 이카운트 입력");
if (sign == "1") {
  addScriptAndCallFunction(() => { returnSumByName()});
} else if (sign == "2") {
  addScriptAndCallFunction(() => {naverClipboardEC()});  
};