const output = document.querySelector("#output");
const useAjax = document.querySelector("#ajaxDisplay");
const useFetch = document.querySelector("#fetchDisplay");
const file2Btn = document.getElementById("file2-loader");
const file3Btn = document.getElementById("file3-loader");
const clearBtn = document.querySelector("#clearOutput");

// Generic AJAX loader with error handling
function loadWithAjax(filename) {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (this.status === 200) {
            output.innerHTML = this.responseText;
        } else {
            output.innerHTML = `<span style='color:red;'>Error loading file: ${filename}</span>`;
        }
    };
    xhttp.onerror = function() {
        output.innerHTML = `<span style='color:red;'>AJAX request failed.</span>`;
    };
    xhttp.open("GET", filename);
    xhttp.send();
}

// Generic Fetch loader with error handling
function loadWithFetch(filename) {
    output.innerHTML = "Loading...";
    fetch(filename)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(text => output.innerHTML = text)
        .catch(err => output.innerHTML = `<span style='color:red;'>Error loading file: ${filename}<br>${err.message}</span>`);
}

useAjax.addEventListener("click", () => loadWithAjax("ajax_info.txt"));
useFetch.addEventListener("click", () => loadWithFetch("ajax_info.txt"));

if (file2Btn) file2Btn.addEventListener("click", () => loadWithAjax("ajax_info2.txt"));
if (file3Btn) file3Btn.addEventListener("click", () => loadWithAjax("ajax_info3.txt"));
if (clearBtn) clearBtn.addEventListener("click", () => output.innerHTML = "");