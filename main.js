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
    var custCodeDict = { '스위스유스트': 'HQ_NAVER', '에코빌리티': 'A0002', '혼자팩토리': 'A0001', };
    var custCode = custCodeDict[shopName];
    if (custCode == 'HQ_NAVER') {
        naverClipboardEC1()
    } else {
        naverClipboardEC2()
    }
}

function naverClipboardEC1() {
    var shopName = document.querySelector('span.shop').textContent;
    var custCodeDict = { '스위스유스트': 'HQ_NAVER'};
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
            var EcStirng = `${date}\t\t${custCode}\t\tBOT2\t양평 사무실 (2층)\t\t\t\t\t\t\t\t${Code}\t\t\t${orderEa}\t${price}\t\t${totalPrice}\t${name}\t\tY`;
            resultString += EcStirng + '\n';
        }
    } navigator.clipboard.writeText(resultString);
    null;
    alert("해당 내역이 클립보드에 복사되었습니다. 이카운트 판매입력 웹자료로 붙여넣기 해주세요.");
}

function naverClipboardEC2() {
    var shopName = document.querySelector('span.shop').textContent;
    var custCodeDict = { '에코빌리티': 'A0002', '혼자팩토리': 'A0001', };
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
        var name = SplitedText[10];
        var orderEa = SplitedText[21];
        var Code = SplitedText[20];
        var price = Number(SplitedText[23]);
        var date = _getToday();
        var totalPrice = Number(SplitedText[26]);
        var EcStirng = `${date}\t\t${custCode}\t\tAPI\t본사창고\t\t\t\t${Code}\t\t\t${orderEa}\t${price}\t\t${totalPrice}\t\t${name}\t\tY`;
        resultString += EcStirng + '\n';
    } navigator.clipboard.writeText(resultString);
    null;
    alert("해당 내역이 클립보드에 복사되었습니다. 이카운트 판매입력 웹자료로 붙여넣기 해주세요.");
};

function naverSalesEC() {
    let shopName = document.querySelector('span.shop').textContent;
    let custCodeDict = { '에코빌리티': 'A0002', '혼자팩토리': 'A0001'};
    let custCode = custCodeDict[shopName];

    let resString = '';
    let iframe = document.getElementById('__delegate').contentWindow.document;
    let salesTable = iframe.querySelector("table.tbl_list");
    let trList = salesTable.querySelectorAll("tr");
    for (let i = 3; i < trList.length; i++) {
        let innerText = trList[i].innerText;
        let SplitedText = innerText.split("\t").map(x => x.trim());
        let date = SplitedText[0].replaceAll('-','');
        let sales = SplitedText[3].replaceAll(',','');
        let refund = SplitedText[8].replaceAll(',','');
        let resSales = Number(sales) - Number(refund);
        let EcStirng = `${date}\t\t${custCode}\t\tAPI\t본사창고\t\t\t\tX0004\t\t\t1\t${resSales}\t\t${resSales}\t\t\t\tY`;
        resString += EcStirng + '\n';
    }
    navigator.clipboard.writeText(resString);
    null;
    alert("해당 내역이 클립보드에 복사되었습니다. 이카운트 판매입력 웹자료로 붙여넣기 해주세요.");
}