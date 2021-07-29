function ajax(url, method, data, accept, reject){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300){
            if(typeof accept === "function")
                accept(xhr.responseText);
        }
        else if(xhr.readyState === 4){
            if(typeof reject === "function")
                reject(xhr.responseText);
        }
    }

    if(method === "POST")
        xhr.send(data);
    else
        xhr.send();
}

let modal;

function openModal(title, element){
    if(modal)
        return;

    modal = document.createElement("div");
    modal.appendChild(element);
    modal.className = "modal-div";
    document.body.appendChild(modal);
}

function closeModal(){
    if(!modal)
        return;

    document.body.removeChild(modal);
    modal = null;
}

function toggleSwitch(e){
    let target = e.target,
        className = "on";

    if(target.classList.contains(className))
        target.classList.remove(className);
    else
        target.classList.add(className);
}

function backgroundSwitch(e){
    let target = e.target;

    if(target.classList.contains("on")){
        ajax("/api/config.php", "POST", "ceva=ceva", res => {
            console.log(res);
        });
    }
}

function switchesEvent(){
    let switches = document.querySelectorAll(".switch"),
        backgroundDiv = document.querySelector("#background");

    for(let i = 0; i < switches.length; i++)
        switches[i].addEventListener("click", toggleSwitch);

    backgroundDiv.addEventListener("click", backgroundSwitch);
}

function init(){
    switchesEvent();
}

document.addEventListener("DOMContentLoaded", init);