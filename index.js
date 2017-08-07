var lastNode = null;

function addLine(lineText) {
  var newLine = document.createElement("div");
  newLine.innerHTML = lineText;
  newLine.classList.add("output");
  document.getElementById("outputContainer").insertBefore(newLine, lastNode);
  lastNode = newLine;
}

function checkStatus() {
  navigator.permissions.query({name: 'geolocation'}).then(function(result) {
    addLine("Status is " + result.state);
  });
}

function geoSuccess(position) {
  addLine("Position is (" + position.coords.latitude + ", " + position.coords.longitude + ")");
}

function geoError(error) {
  if (error.code == 1) {
    addLine("Permission denied.");
  } else if (error.code == 2) {
    addLine("Position unavailable.");
  } else if (error.code == 3) {
    addLine("Timeout.");
  } else {
    addLine("Unknown error.");
  }
}

function readLocation() {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

function readLocationDelayed() {
  window.setTimeout(readLocation, 5000);
}


function setup() {
  window.addEventListener("beforeinstallprompt", event => {
    window.console.log("event: beforeinstallprompt");
    event.preventDefault();

    btn = document.getElementById("installbutton");
    btn.disabled = false;
    btn.addEventListener("click", async e => {
            window.console.log("clicked install button");
            btn.disabled = true;
            prmpt = event.prompt();
            uc = await prmpt;
//            const {userChoice} = uc;
            console.info(`choice was ${uc}`); //userChoice}`);
    });
  });
  if ('serviceWorker' in navigator) {
    console.log("Will the service worker register?");
    navigator.serviceWorker.register('service-worker.js')
      .then(function(reg){
        console.log("Yes, it did.");
      }).catch(function(err) {
        console.log("No it didn't. This happened: ", err)
      });
  }
}
