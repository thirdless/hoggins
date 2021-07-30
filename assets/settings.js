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

function showNotification(text){
    alert(text);
}

let modal;

function openModal(title, element){
    if(modal)
        return;

    let contentDiv = document.createElement("div"),
        titleDiv = document.createElement("div"),
        overlay = document.createElement("div");

    contentDiv.className = "modal-content";
    titleDiv.className = "modal-title";
    overlay.className = "modal-overlay";
    
    titleDiv.innerText = title;
    contentDiv.appendChild(element);

    overlay.addEventListener("click", closeModal);

    modal = document.createElement("div");
    modal.appendChild(titleDiv);
    modal.appendChild(contentDiv);
    modal.className = "modal-div";
    document.body.appendChild(modal);
    document.body.appendChild(overlay);
}

function closeModal(){
    if(!modal)
        return;

    document.body.removeChild(modal);
    document.body.removeChild(document.querySelector(".modal-overlay"));
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
    let target = e.target,
        customDiv = document.querySelector(".custom-bg"),
        disabled = "disabled";

    if(target.classList.contains("on")){
        ajax("/api/config.php", "POST", "ceva=ceva", res => {
            console.log(res);
        });

        customDiv.classList.add(disabled);
    }
    else
        customDiv.classList.remove(disabled);
}

function switchesEvent(){
    let switches = document.querySelectorAll(".switch"),
        backgroundDiv = document.querySelector("#background");

    for(let i = 0; i < switches.length; i++)
        switches[i].addEventListener("click", toggleSwitch);

    backgroundDiv.addEventListener("click", backgroundSwitch);
}

function submitBookmark(e){
    let parent = e.target.parentNode,
        title = parent.querySelector("[name=title]").value,
        url = parent.querySelector("[name=url]").value,
        payload = "title=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(url);

    if(title == "" || url == ""){
        showNotification("Please fill the inputs.");
        return;
    }
    else if(title.length > 20){
        showNotification("Title is too long");
        return;
    }

    ajax("/api/config.php", "POST", "type=create-bookmark&" + payload, res => {
        console.log(res);
    });
}

function createLink(){
    let element = document.createElement("div"),
        button = document.createElement("button");
    element.innerHTML = `
        <input type="text" placeholder="Title" name="title">
        <input type="url" placeholder="URL" name="url">
    `;
    button.innerText = "Create";
    button.addEventListener("click", submitBookmark);
    element.appendChild(button);
    element.className = "bookmark-modal";
    openModal("Create new bookmark", element);
}

function init(){
    switchesEvent();
    document.querySelector(".createLink").addEventListener("click", createLink);
}

document.addEventListener("DOMContentLoaded", init);