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
  var cell = document.getElementById("blanks");
   while ( cell.hasChildNodes() )
   { cell.removeChild( cell.firstChild ); }

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
  blank.className = "plant"

  var keyName = document.createElement("p");
  keyName.classList.add("keyName");
  keyName.innerText = key;

  var input = document.createElement("input");
  input.classList.add("form-control");
  input.type = "text";
  input.setAttribute("ans", answer);
  
  var row = document.createElement("div");
  row.className = "ddd";

  var submit = document.createElement("button");
  submit.classList.add("btn-primary");
  submit.classList.add("submit");
  submit.classList.add("col-xs-1");
  submit.innerText = "제출";
  submit.addEventListener("click", submitBlank, false);
  
  var clear = document.createElement("button");
  clear.classList.add("clear");
  clear.innerText = "비움";
  clear.addEventListener("click", clearBlank, false);

  row.append(submit);
  row.append(clear);

  var ans = document.createElement("p");
  ans.setAttribute("class", "answer");
  
  blank.append(document.createElement("hr"));
  blank.append(keyName);
  blank.append(row);
  blank.append(input);
  blank.append(ans);
  blanks.append(blank); 
}

function submitBlank() {
  var blank = event.target.parentNode.nextSibling;
  var ans = event.target.parentNode.nextSibling.nextSibling;

  if (blank.value == "")
    blank.value = blank.getAttribute("ans");
  else if (blank.value == blank.getAttribute("ans"))
    blank.classList.add("collect");
  else {
    blank.classList.add("incollect");
    ans.innerText = blank.getAttribute("ans");

  }
}

function clearBlank() {
  var blank = event.target.parentNode.nextSibling;
  var ans = event.target.parentNode.nextSibling.nextSibling;
  blank.value = "";
  ans.innerText = "";
}

function goBack() {
  var length = localStorage.length;
  for (var i = localStorage.getItem("ending"); i < length; ++i) {
    localStorage.removeItem(i);
  }
  window.location.replace("practice.html");
}

function allSubmit() {
  var submits = document.getElementsByClassName("submit");
  for (var i = 0; i < submits.length; ++i)
    submits[i].click();
}

function allClear() {
  var clears = document.getElementsByClassName("clear");
  for (var i = 0; i < clears.length; ++i)
    clears[i].click();
}