function start() {
  localStorage.clear();
}

function moveTo(name) {
  loc = name + ".html";
  // if (localStorage.length == 0) {
  //   alert("파일을 업로드하세요");
  //   return;
  // }
  location.replace(loc);
}

function readExcel() {
  localStorage.clear();
  let input = event.target;
  let reader = new FileReader();
  reader.onload = function () {
    let data = reader.result;
    let workBook = XLSX.read(data, { type: 'binary' });
    workBook.SheetNames.forEach(function (sheetName) {
      console.log('SheetName: ' + sheetName);
      let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
      for (let step = 1; step < rows.length; step++) {
        var map = new Map();
        map.set(rows[0].__EMPTY, rows[step].__EMPTY);
        map.set(rows[0].__EMPTY_1, rows[step].__EMPTY_1);
        map.set(rows[0].__EMPTY_2, rows[step].__EMPTY_2);
        map.set(rows[0].__EMPTY_3, rows[step].__EMPTY_3);
        map.set(rows[0].__EMPTY_4, rows[step].__EMPTY_4);
        map.set(rows[0].__EMPTY_5, rows[step].__EMPTY_5);
        const obj = Object.fromEntries(map);
      
        localStorage.setItem(step, JSON.stringify(obj))
      }
      document.getElementById("upload").innerText = "업로드 완료";
    })
  };
  reader.readAsBinaryString(input.files[0]);
}

window.addEventListener("load", start, false);