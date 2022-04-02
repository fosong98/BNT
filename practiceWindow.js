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
  for (var i = 0; i < k.length; ++i) {
    var key = k[i];
    if (key == "Cultivar")
      document.getElementById("name").innerText = obj[key];
    else {
      makeBlank(key, obj[key]);
    }
  }
}

function makeBlank(key, answer) {
  var blanks = document.getElementById("blanks");

  var blank = document.createElement("div");

  var keyName = document.createElement("p");
  keyName.innerText = key;

  var input = document.createElement("input");
  input.type = "text";
  input.classList.add("form-control");
  input.setAttribute("ans", answer);

  var submit = document.createElement("button");
  submit.classList.add("btn-primary");
  submit.addEventListener("click", submitBlank, false);
  
  var clear = document.createElement("button");

  var ans = document.createElement("p");
  
  blank.append(keyName);
  blank.append(input);
  blank.append(submit);
  blank.append(clear);
  blank.append(ans);
  blanks.append(blank);
}

function submitBlank() {
  var blank = event.target.previousSibling;
  var ans = event.target.nextSibling.nextSibling;

  if (blank.value == "")
    blank.value = blank.getAttribute("ans");
  else if (blank.value == blank.getAttribute("ans"))
    blank.classList.add("collect");
  else {
    blank.classList.add("incollect");
    ans.innerText = blank.getAttribute("ans");
  }
}

function goBack() {
  var length = localStorage.length;
  for (var i = localStorage.getItem("ending"); i < length; ++i) {
    localStorage.removeItem(i);
  }
  window.location.replace("practice.html");
}