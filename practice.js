window.addEventListener("load", start, false);

function start() {
  setTimeout(()=>{
  document.body.setAttribute("class", "reveal");},
  500);

  var plants = document.getElementById("plants");

  for (var i = 1; i <= localStorage.length; ++i) {
    var plant = document.createElement("div");
    plant.id = i.toString();
    plant.className = "plant bg-primary";
    var jsonString = localStorage.getItem(i);
    plant.setAttribute("value", jsonString);
    plant.setAttribute("onclick", "clicked()");
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