javascript: 
function clickName(gwpList) {
    var iframe = document.getElementById('__delegate').contentWindow.document;
    var tuiRsideArea = iframe.querySelector(".tui-grid-rside-area");
    var trList = tuiRsideArea.querySelectorAll('tr');
    var indexList = [];
    var index = 0;
    for (let i of trList) {
        let innerText = i.innerText;
        var SplitedText = innerText.split("\t").map(x => x.trim());
        var name = SplitedText[9];
        if (gwpList.includes(name)) {
            indexList.push(index)
        }
        index += 1
    }

    var tuiGridArea = iframe.querySelector(".tui-grid-body-area");
    var inputs = tuiGridArea.querySelectorAll('input');
    var index = 1
    for (let i of inputs) {
        if (indexList.includes(index)) {
            i.click()
        }
        index += 1
    }
}

function returnSumByName() {
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
    };
    var result = [];
    dataList.reduce(function (res, value) {
        if (!res[value.name]) {
            res[value.name] = { name: value.name, totalPrice: 0 };
            result.push(res[value.name]);
        } res[value.name].totalPrice += value.totalPrice;
        return res;
    }, {});
    result = result.filter(x => x.totalPrice > 200000);
    const objectListAsString = result.map(object => `${object.name}: ${object.totalPrice}`).join('\n');
    alert(objectListAsString);
    let gwpList = result.map(obj => obj.name)
    clickName(gwpList)
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
    var custCodeDict = { '??????????????????': 'HQ_NAVER', '???????????????': 'A0002', '???????????????': 'A0002', };
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
        if (howTo == '???????????? ????????????' && sendDay == _getToday()) {
            var name = SplitedText[9];
            var orderEa = SplitedText[20];
            var Code = SplitedText[19];
            var price = Number(SplitedText[22]);
            var date = _getToday();
            var totalPrice = Number(SplitedText[25]) * 0.9;
            totalPrice = Math.floor(totalPrice / 1000) * 1000;
            if (custCode != 'HQ_NAVER') {
                var EcStirng = `${date}\t\t${custCode}\t\tAPI\t????????????\t\t\t\t${Code}\t\t\t${orderEa}\t${price}\t\t${totalPrice}\t\t${name}\t\tY`;
            } else {
                var EcStirng = `${date}\t\t${custCode}\t\tBOT2\t?????? ????????? (2???)\t\t\t\t\t\t\t\t${Code}\t\t\t${orderEa}\t${price}\t\t${totalPrice}\t${name}\t\tY`;
            } resultString += EcStirng + '\n';
        }
    } navigator.clipboard.writeText(resultString);
    null;
    alert("?????? ????????? ??????????????? ?????????????????????. ???????????? ???????????? ???????????? ???????????? ????????????.");
} 