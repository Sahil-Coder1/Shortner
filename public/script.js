function send() {
  localStorage.setItem("url", document.getElementById("long").value);
  window.location.href = "./shortener/";
}

function short() {
  setTimeout(function () {
    var uurl = getData();
    const url = "https://spoo.me";
    const data = new URLSearchParams();
    data.append("url", uurl);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var jsonResponse = JSON.parse(xhr.response);
          document.getElementById("shorted-url").style.display = "block";
          document.getElementById("remov").style.display = "none";
          console.log(jsonResponse.short_url);
          document.getElementById("shorten-url").value = jsonResponse.short_url;
          document.getElementById("long-url").innerHTML = uurl;
          document.getElementById("long-url").href = uurl;
        }
        else
        {
          alert("An Error Occured \nTry after some time");
        }
      }
    };
    xhr.send(data);
  }, 2000);
}
function copy() {
  copyToClipboard(document.getElementById("shorten-url").value);
  document.getElementById("copp").value = "Copied";
  document.getElementById("copp").style.backgroundColor = "green";
  document.getElementById("copp").style.pointerEvents = "none";
}
function copyToClipboard(text) {
  var textElement = document.createElement("textarea");
  textElement.value = text;
  document.body.appendChild(textElement);
  textElement.select();
  document.execCommand("copy");
  document.body.removeChild(textElement);
}

function getData() {
  if (localStorage.getItem("url") == null) {
    window.location.href = "../404.html";
  } else {
    var url = localStorage.getItem("url");
    localStorage.removeItem("url");
    return url;
  }
}
