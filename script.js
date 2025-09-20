// Function to toggle hints
function toggleHint(number) {
  const hint = document.getElementById("hint" + number);
  hint.style.display =
    hint.style.display === "none" || hint.style.display === ""
      ? "block"
      : "none";
}

// TODO: Exercise 1 - Implement the loadTextFile function
const introDisplay = document.querySelector("#result1");
const introBtn = document.querySelector("#runIntro");

introBtn.addEventListener("click", loadTxtFile);

function loadTxtFile() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    introDisplay.innerHTML = this.responseText;
  };

  xhttp.onerror = function(){
    introDisplay.innerHTML = "Request failed";
  }

  xhttp.open("GET", "sample.txt");
  xhttp.send();
}

// TODO: Exercise 2 - Implement the sendGetRequest function
const nameinput = document.querySelector("#nameInput");
const getRqstBtn = document.querySelector("#getRequestBtn");
const result2 = document.querySelector("#result2");

getRqstBtn.addEventListener("click", sendGetRequest);
function sendGetRequest() {
  const xhttp = new XMLHttpRequest();
  let str = nameinput.value;
  if (str === "") {
    result2.innerHTML = "";
    return;
  }
  xhttp.onload = function () {
    result2.innerHTML = this.responseText;
  };

  xhttp.onerror = function(){
    result2.innerHTML = "Request failed";
  }

  xhttp.open("GET", "getdata.php?name=" + encodeURIComponent(str));
  xhttp.send();
}

// TODO: Exercise 3 - Implement the processJsonResponse function
const processJSONBtn = document.querySelector("#processJSON");
const result3 = document.querySelector("#result3");

processJSONBtn.addEventListener("click", processJsonResponse);

function processJsonResponse() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    let user = JSON.parse(this.responseText);
    result3.innerHTML = `Name: ${user.name}<br>
    Email: ${user.email}`;
  };

  xhttp.onerror = function(){
    result3.innerHTML = "Request failed";
  }

  xhttp.open("GET", "user.php");
  xhttp.send();
}

// TODO: Exercise 4 - Implement the processXmlResponse function
const btnXml = document.querySelector("#xmlBtn");
const result4 = document.querySelector("#result4");

btnXml.addEventListener("click", processXmlResponse);

function processXmlResponse() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if(this.status === 200){
      
    let xmlDoc = this.responseXML;
    let cd = xmlDoc.getElementsByTagName("book");
    myFunction(cd);
    } else {
      result4.innerHTML = "Error loading XML file";
    }
  };

  xhttp.onerror = function(){
    result4.innerHTML = "Request failed";
  }

  xhttp.open("GET", "books.xml");
  xhttp.send();
}

function myFunction(cd) {
  let bookTitles = `<h4>Book titles:</h4><ul>`;
  for (let i = 0; i < cd.length; i++) {
    let title = cd[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
    bookTitles += `<li>${title}</li>`;
  }
  result4.innerHTML = bookTitles + "</ul>";
  console.log(cd);
}

// TODO: Exercise 5 - Implement the loadUsers function
const loadUserBtn = document.querySelector("#loadUserBtn");
const result5 = document.querySelector("#result5");

loadUserBtn.addEventListener("click", loadUsers);

function loadUsers() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.status === 200) {
      try {
        let user = JSON.parse(this.responseText);
        let table =
          "<table class = 'table'><tr><th>Id</th><th>Name</th><th>Email</th></tr>";
        for (let i = 0; i < user.length; i++) {
          table += `<tr><td>${user[i].id}</td><td>${user[i].name}</td><td>${user[i].email}</td></tr>`;
        }

        result5.innerHTML = table + "</table>";
      } catch (error) {
        result5.innerHTML = "Error parsing JSON";
      }
    } else {
      result5.innerHTML = "error = " + this.status;
    }
  };

  xhttp.onerror = function(){
     result5.innerHTML = "Request failed";
  }
  xhttp.open("GET", "getusers.php");
  xhttp.send();
}

// TODO: Exercise 6 - Implement the loadWithErrorHandling function

const errorHandlerBtn = document.querySelector("#errorHandlerBtn");
const result6 = document.querySelector("#result6");

errorHandlerBtn.addEventListener("click", loadWithErrorHandling);

function loadWithErrorHandling() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      result6.innerHTML = this.responseText;
    } else {
      result6.innerHTML =
        "Status: " + this.status + "<br>Message: " + this.statusText;
    }
  };

  xhttp.onerror = function () {
    result6.innerHTML = "Request failed - the resource might not exist";
  };

  xhttp.open("GET", "somefile.php");
  xhttp.send();
}
