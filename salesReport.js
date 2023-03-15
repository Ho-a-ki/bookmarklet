
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
        let EcStirng = `${date}\t\t${custCode}\t\t임기홍\t본사창고\t\t\t\tX0004\t\t\t1\t${resSales}\t\t${resSales}\t\t\t\tY`;
        resString += EcStirng + '\n';
    }
    navigator.clipboard.writeText(resString);
    null;
    alert("해당 내역이 클립보드에 복사되었습니다. 이카운트 판매입력 웹자료로 붙여넣기 해주세요.");
}