var set = new Set();

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
        localStorage.setItem(step, JSON.stringify(rows[step+1]))
      }

      document.getElementById("read").style.display = "none";

      var body = document.getElementById("body");
      var startButton = document.createElement("button");
      startButton.name = "Next";
      startButton.addEventListener("click", start, false);
      body.append(startButton);
    })
  };
  reader.readAsBinaryString(input.files[0]);
}

function start() {
  if (set.size == localStorage.length) {
    set.clear();
    alert("one lap!!!");
  }

  var ranNum = Math.floor(Math.random() * localStorage.length)
  while (set.has(ranNum)) {
    ranNum = Math.floor(Math.random() * localStorage.length)
  }
  set.add(ranNum);
  document.getElementById("q").innerText = localStorage.getItem(ranNum);
}

function update(jsonStr) {
  
}
