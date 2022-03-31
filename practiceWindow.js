var plants;
var set = new Set();

window.addEventListener("load", start, false);

function start() {
  plants = new Array();
  var startN = localStorage.getItem("ending");
  var endN = localStorage.length;
  for (var i = 0; i < endN - startN - 1; ++i) {
    plants[i] = localStorage.getItem(parseInt(startN) + i);
  }

  chooseOne();
}

function chooseOne() {
  if (set.size == plants.length) {
    set.clear();
    alert("one lap!!!");
  }
  var ranNum = Math.floor(Math.random() * plants.length)
  while (set.has(ranNum)) {
    ranNum = Math.floor(Math.random() * plants.length)
  }
  set.add(ranNum);

  uploading(ranNum);
}

function uploading(index) {
  var obj = JSON.parse(plants[index]);
  var k = Object.keys(obj);
  var blanks = document.getElementById("blanks");
  for (var i = 0; i < k.length; ++i) {
    var key = k[i];
    if (key == "Cultivar")
      document.getElementById("name").innerText = obj[key];
    else {
      var label = document.createElement("label");
      var val = document.createElement("input");
      val.type = "text";
      label.innerText = key;
      val.setAttribute("answer", obj[key]);

      label.append(val);
      blanks.append(label);
    }
  }
}

function goBack() {
  var length = localStorage.length;
  for (var i = localStorage.getItem("ending"); i < length; ++i) {
    localStorage.removeItem(i);
  }
  window.location.replace("practice.html");
}