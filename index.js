function start() {
  localStorage.clear();
}

function moveTo(name) {
  loc = name + ".html";
  if (localStorage.length == 0) {
    alert("파일을 업로드하세요");
    return;
  }
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
      for (let step = 0; step < rows.length - 1; step++) {
        localStorage.setItem(step, JSON.stringify(rows[step]))
      }
      localStorage.setItem("ending", localStorage.length)
      document.getElementById("upload").innerText = "업로드 완료";
    })
  };
  reader.readAsBinaryString(input.files[0]);
}

window.addEventListener("load", start, false);