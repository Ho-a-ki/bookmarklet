javascript: function returnSumByName() {
    var iframe = document.getElementById('__delegate').contentWindow.document;
    var tuiRsideArea = iframe.querySelector(".tui-grid-rside-area");
    var trList = tuiRsideArea.querySelectorAll('tr');
    var dataList = [];
    for (let i of trList) {
        let innerText = i.innerText;
        var SplitedText = innerText.split("\t").map(x => x.trim());
        var name = SplitedText[9];
        var price = Number(SplitedText[22]);
        var totalPrice = Number(SplitedText[25]);
        dataList.push({ name, price, totalPrice });
    } var result = [];
    dataList.reduce(function (res, value) {
        if (!res[value.name]) {
            res[value.name] = { name: value.name, totalPrice: 0 };
            result.push(res[value.name]);
        } res[value.name].totalPrice += value.totalPrice;
        return res;
    }, {});
    result = result.filter(x => x.totalPrice > 150000);
    const objectListAsString = result.map(object => `${object.name}: ${object.totalPrice}`).join('\n');
    alert(objectListAsString);
    console.log(objectListAsString);
}

function _getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
} 

function naverClipboardEC() {
    var shopName = document.querySelector('span.shop').textContent;
    var custCodeDict = { '스위스유스트': 'HQ_NAVER', '에코빌리티': 'A0002', '혼자팩토리': 'A0002', };
    var custCode = custCodeDict[shopName];
    var resultString = '';
    var iframe = document.getElementById('__delegate').contentWindow.document;
    var tuiRsideArea = iframe.querySelector(".tui-grid-rside-area");
    var trList = tuiRsideArea.querySelectorAll('tr');
    for (var i = 1;
        i < trList.length;
        i++) {
            var innerText = trList[i].innerText;
        var SplitedText = innerText.split("\t").map(x => x.trim());
        var dNumber = SplitedText[2].slice(8,);
        var howTo = SplitedText[0];
        var sendDay = SplitedText[4].replaceAll(".", "");
        if (howTo == '굿스플로 송장출력' && sendDay == _getToday()) {
            var name = SplitedText[9];
            var orderEa = SplitedText[20];
            var Code = SplitedText[19];
            var price = Number(SplitedText[22]);
            var date = _getToday();
            var totalPrice = Number(SplitedText[25]) * 0.9;
            totalPrice = Math.floor(totalPrice / 1000) * 1000;
            if (custCode != 'HQ_NAVER') {
                var EcStirng = `${date}\t\t${custCode}\t\tAPI\t본사창고\t\t\t\t${Code}\t\t\t${orderEa}\t${price}\t\t${totalPrice}\t\t${name}\t\tY`;
            } else {
                var EcStirng = `${date}\t\t${custCode}\t\tBOT2\t양평 사무실 (2층)\t\t\t\t\t\t\t\t${Code}\t\t\t${orderEa}\t${price}\t\t${totalPrice}\t${name}\t\tY`;
            } resultString += EcStirng + '\n';
        }
    } navigator.clipboard.writeText(resultString);
    null;
    alert("해당 내역이 클립보드에 복사되었습니다. 이카운트 판매입력 웹자료로 붙여넣기 해주세요.");
} 