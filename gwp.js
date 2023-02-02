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
