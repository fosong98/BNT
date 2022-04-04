window.addEventListener("load", start, false);
window.addEventListener("load", reload, false);

function start() {
  setTimeout(()=>{
  document.body.setAttribute("class", "reveal");},
  500);

  setTimeout(()=>{
    document.getElementById("plants").classList.add("visible");
  }, 1700);

  var plants = document.getElementById("plants");

  var count = localStorage.getItem("ending");

  for (var i = 0; i < count; ++i) {
    var plant = document.createElement("div");
    plant.id = i.toString();
    plant.className = "plant bg-primary";
    var jsonString = localStorage.getItem(i);
    plant.setAttribute("value", jsonString);
    plant.setAttribute("onmousedown", "clicked()");
    plant.innerText = JSON.parse(jsonString).Cultivar;
    plants.append(plant);
  }
}

function clicked() {
  var plant = event.target;
  if (plant.classList.contains("bg-primary")) {
    plant.classList.remove("bg-primary");
    plant.classList.add("bg-success");
  } else {
    plant.classList.add("bg-primary");
    plant.classList.remove("bg-success");
  }
}

function chooseAll() {
  var choosed = document.getElementsByClassName("bg-primary");
  
  for (var i = 0; i < choosed.length;++i) { 
    choosed.item(i).classList.add("bg-success");
  }
  
  choosed = document.getElementsByClassName("bg-success");

  for (var i = 0; i < choosed.length;++i) { 
    var t = choosed.item(i); 
    if (t.classList.contains("bg-primary"))
      t.classList.remove("bg-primary");
  }
}

function releaseAll() {
  var release = document.getElementsByClassName("bg-success");
  
  for (var i = 0; i < release.length;++i) { 
    release.item(i).classList.add("bg-primary");
  }
  
  release = document.getElementsByClassName("bg-primary");

  for (var i = 0; i < release.length;++i) { 
    var t = release.item(i); 
    if (t.classList.contains("bg-success"))
      t.classList.remove("bg-success");
  }
}

function confirm() {
  var count = localStorage.getItem("ending");
  var plants = document.getElementsByClassName("plant");
  var index = count;
  for (var i = 0; i < count; ++i) {
    console.log(plants[i].classList.toString());
    if (plants[i].classList.contains("bg-success")) {
      var val = plants.item(i).getAttribute("value");
      localStorage.setItem(parseInt(index), val);
      index++;
    }
  }
  window.location.replace("practiceWindow.html");
}

function goBack() {
  var length = localStorage.length;
  for (var i = localStorage.getItem("ending"); i < length; ++i) {
    localStorage.removeItem(i);
  }
  window.location.replace("index.html");
}

function reload() {
  var length = localStorage.length;
  for (var i = localStorage.getItem("ending"); i < length; ++i) {
    localStorage.removeItem(i);
  }
}