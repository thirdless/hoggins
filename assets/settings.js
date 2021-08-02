const CONFIG_LINK = "/api/config.php";

const TILES = [
    {
        title: "Weather",
        image: "icon-sun",
        input: "Custom location"
    },
    {
        title: "RSS",
        image: "icon-rss",
        input: "Feed URL"
    },
    {
        title: "Reddit",
        image: "icon-reddit",
        input: "Subreddit name"
    },
    {
        title: "Gmail",
        image: "icon-gmail"
    }
];


function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

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
        disabled = "disabled",
        value = "true";

    if(target.classList.contains("on"))
        customDiv.classList.add(disabled);
    else{
        customDiv.classList.remove(disabled);
        value = "false";
    }

    ajax(CONFIG_LINK, "POST", "type=auto-background&value=" + value, res => {
        console.log(res);
    });
}

function switchesEvent(){
    let switches = document.querySelectorAll(".switch"),
        backgroundDiv = document.querySelector("#background");

    for(let i = 0; i < switches.length; i++)
        switches[i].addEventListener("click", toggleSwitch);

    backgroundDiv.addEventListener("click", backgroundSwitch);
}

function addBookmark2List(title, url){
    let list = document.querySelector(".bookmarks"),
        create = list.querySelector(".createLink"),
        newEl = document.createElement("div");

    newEl.className = "option";
    newEl.innerText = title + " - " + url;
    newEl.innerHTML += '<span class="remove"><svg viewBox="0 0 24 24"><path d="M23 12c0-3.037-1.232-5.789-3.222-7.778s-4.741-3.222-7.778-3.222-5.789 1.232-7.778 3.222-3.222 4.741-3.222 7.778 1.232 5.789 3.222 7.778 4.741 3.222 7.778 3.222 5.789-1.232 7.778-3.222 3.222-4.741 3.222-7.778zM21 12c0 2.486-1.006 4.734-2.636 6.364s-3.878 2.636-6.364 2.636-4.734-1.006-6.364-2.636-2.636-3.878-2.636-6.364 1.006-4.734 2.636-6.364 3.878-2.636 6.364-2.636 4.734 1.006 6.364 2.636 2.636 3.878 2.636 6.364zM8 13h8c0.552 0 1-0.448 1-1s-0.448-1-1-1h-8c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path></svg></span>';
    list.insertBefore(newEl, create);
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

    ajax(CONFIG_LINK, "POST", "type=create-bookmark&" + payload, res => {
        console.log(res);
        addBookmark2List(title, url);
        closeModal();
    }, res => {
        showNotification(res);
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

function changeTheme(e){
    let value = parseInt(e.target.value);

    ajax(CONFIG_LINK, "POST", "type=change-theme&value=" + value, res => {
        console.log(res);
    });
}

function changeBackground(e){
    let value = encodeURIComponent(e.target.value);

    ajax(CONFIG_LINK, "POST", "type=change-background&value=" + value, res => {
        console.log(res);
    });
}

function bookmarksEvent(e){
    let target = e.target,
        options = document.querySelectorAll(".bookmarks .option:not(.create)");

    while(true){
        if(target.classList.contains("remove") && target.tagName == "SPAN")
            break;
        else if(target == e.currentTarget)
            return;
        else
            target = target.parentNode;
    }

    target = target.parentNode;
    options = Array.from(options);

    let value = options.indexOf(target);

    if(value == -1)
        return;

    ajax(CONFIG_LINK, "POST", "type=remove-bookmark&value" + value, res => {
        document.querySelector(".bookmarks").removeChild(target);
    });
}

function createTile(){
    let element = document.createElement("div");

    for(let i = 0; i < TILES.length; i++){
        let option = document.createElement("div");
        option.className = "option";
        option.innerHTML = `
            <svg><use xlink:href="#${TILES[i].image}"></use></svg>
            <span>${TILES[i].title}</span>
        `;

        if(TILES[i].input)
            option.innerHTML += `
                <input type="text" placeholder="${TILES[i].input}">
            `;

        option.innerHTML += `
            <div class="addOption">
                <svg><use xlink:href="#icon-plus-circle"></use></svg>Add
            </div>
        `;

        element.appendChild(option);
    }
    
    element.addEventListener("click", submitTile);
    element.className = "tile-modal";
    openModal("Select a tile you wish to add", element);
}

function submitTile(e){
    let target = e.target;
    
    while(true){
        if(target.classList.contains("addOption"))
            break;
        else if(target == e.currentTarget)
            return;
        else
            target = target.parentNode;
    }

    target = target.parentNode;

    let name = target.querySelector("span").innerText,
        valueEl = target.querySelector("input"),
        payload = "name=" + encodeURIComponent(name);

    if(valueEl)
        payload += "&value=" + encodeURIComponent(valueEl.value);

    ajax(CONFIG_LINK, "POST", "type=add-tile&" + payload, res => {
        console.log(res);
        addTile2List(searchTilesLogo(name), name, valueEl);
        closeModal();
    }, res => {
        showNotification(res);
    });
}

function tilesEvent(e){
    let target = e.target,
        options = document.querySelectorAll(".tiles .option:not(.create)");
    
    while(true){
        if(target.classList.contains("remove"))
            break;
        else if(target == e.currentTarget)
            return;
        else
            target = target.parentNode;
    }

    target = target.parentNode.parentNode;
    options = Array.from(options);

    let value = options.indexOf(target);

    if(value == -1)
        return;

    ajax(CONFIG_LINK, "POST", "type=remove-tile&value" + value, res => {
        document.querySelector(".tiles").removeChild(target);
    });
}

function addTile2List(logo, title, input){
    let list = document.querySelector(".tiles"),
        create = list.querySelector(".createTile"),
        newEl = document.createElement("div"),
        text = title;

    if(input && input.value != "")
        text += " - " + input.value;

    newEl.className = "option";
    newEl.innerHTML = `<svg><use xlink:href="#${logo}"></use></svg>`;
    newEl.innerHTML += escapeHtml(text);
    newEl.innerHTML += `
        <div class="modifiers">
            <div class="remove">
                <svg><use xlink:href="#icon-minus-circle"></use></svg>
            </div>
        </div>
    `;
    list.insertBefore(newEl, create);
}

function searchTilesLogo(name){
    let ret = "";

    for(let i = 0; i < TILES.length; i++){
        if(TILES[i].title == name){
            ret = TILES[i].image;
            break;
        }
    }

    return ret;
}

function init(){
    switchesEvent();

    document.querySelector(".createLink").addEventListener("click", createLink);
    document.querySelector(".createTile").addEventListener("click", createTile);
    document.querySelector(".theme-select").addEventListener("change", changeTheme);
    document.querySelector(".background-input").addEventListener("change", changeBackground);

    document.querySelector(".bookmarks").addEventListener("click", bookmarksEvent);
    document.querySelector(".tiles").addEventListener("click", tilesEvent);
}

document.addEventListener("DOMContentLoaded", init);