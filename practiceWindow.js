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
  blanks.childNodes.forEach((e)=>{
    e.remove();
  })
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
  keyName.classList.add("keyName");
  keyName.innerText = key;

  var input = document.createElement("input");
  input.type = "text";
  input.setAttribute("size", 10);
  input.setAttribute("ans", answer);
  

  var submit = document.createElement("button");
  submit.classList.add("btn-primary");
  submit.innerText = "submit";
  submit.addEventListener("click", submitBlank, false);
  
  var clear = document.createElement("button");
  clear.innerText = "clear";
  clear.addEventListener("click", clearBlank, false);

  var ans = document.createElement("p");
  ans.setAttribute("class", "answer");
  
  blank.append(document.createElement("hr"));
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

function clearBlank() {
  var blank = event.target.previousSibling.previousSibling;
  var ans = event.target.nextSibling;
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