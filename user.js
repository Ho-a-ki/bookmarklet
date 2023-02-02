javascript: function add_script(){ 
    var head = document.getElementsByTagName('head')[0];
    var jScript;
    jScript = document.createElement('script');
    jScript.language = 'javascript';
    jScript.src = 'https://cdn.jsdelivr.net/gh/ho-a-ki/bookmarklet@main/gwp.js';
    jScript.type = 'text/javascript';
    head.appendChild(jScript);
 } 
 
 add_script();
