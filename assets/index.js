const NUMBER_OF_SUGGESTIONS = 6;

let searchInput,
    searchTimeout,
    searchOldText = "",
    searchCurrentTerms,
    searchCurrentIndex = -1;

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function checkURL(value){
    let url;

    try{
        url = new URL(value);
    }
    catch{
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

function getShortTimePassed(date){
    date = (new Date(date)).getTime() / 1000;

    let current = Date.now() / 1000,
        difference = current - date;
    
    let minutes = 60,
        hours = minutes * 60,
        days = hours * 24,
        months = days * 30,
        years = days * 365;
    
    if(difference < 60){
        return "1m";
    }
    else if(difference < hours){
        let dif = parseInt(difference / minutes);
        return dif + "m";
    }
    else if(difference < days){
        let dif = parseInt(difference / hours);
        return dif + "h";
    }
    else if(difference < months){
        let dif = parseInt(difference / days);
        return dif + "d";
    }
    else if(difference < years){
        let dif = parseInt(difference / months);
        return dif + "mo";
    }
    else{
        let dif = parseInt(difference / years);
        return dif + "y"; 
    }
}

function ajax(url, method, data, accept, reject){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

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

function searchEngine(term){
    location.href = "https://google.com/search?q=" + encodeURIComponent(term);
}

function searchChangeSuggestion(offset){
    let suggestions = document.querySelectorAll(".bar .autocomplete .term");

    searchCurrentIndex += offset;

    if(searchCurrentIndex < 0)
        searchCurrentIndex += searchCurrentTerms.length;
    else if(searchCurrentIndex >= searchCurrentTerms.length)
        searchCurrentIndex -= searchCurrentTerms.length;

    for(let i = 0; i < suggestions.length; i++)
        suggestions[i].classList.remove("selected");

    if(suggestions[searchCurrentIndex])
        suggestions[searchCurrentIndex].classList.add("selected");
    
    searchInput.value = searchCurrentTerms[searchCurrentIndex];
}

function searchCreateAutocomplete(terms){
    let bar = document.querySelector(".bar"),
        autocomplete = bar.querySelector(".autocomplete");

    searchCurrentTerms = terms;

    if(autocomplete)
        bar.removeChild(autocomplete);

    if(!terms.length)
        return;

    autocomplete = document.createElement("div");
    autocomplete.className = "autocomplete";
    
    for(let i = 0; i < terms.length; i++){
        let term = document.createElement("div");
        term.className = "term";
        term.innerHTML = terms[i];
        autocomplete.appendChild(term);
    }

    bar.appendChild(autocomplete);
}

function searchAutocomplete(term){
    ajax("/api/autocomplete?q=" + encodeURIComponent(term), "GET", null, response => {
        let terms = [];

        response = JSON.parse(response);
        
        for(let i = 0; i < response.length; i++) 
            if(response[i] instanceof Array)
                terms = terms.concat(response[i]);

        if(terms.length >= NUMBER_OF_SUGGESTIONS)
            terms = terms.slice(0, NUMBER_OF_SUGGESTIONS);

        searchCreateAutocomplete(terms);
    });
}

function searchPreventBug(e){
    if(e.key === "ArrowUp" || e.key === "ArrowDown")
        e.preventDefault();
}

function searchType(e){
    let target = e.target;

    if(searchCurrentTerms instanceof Array && searchCurrentTerms.length){
        if(e.key === "ArrowUp"){
            searchChangeSuggestion(-1);
            return;
        }
        else if(e.key === "ArrowDown"){
            searchChangeSuggestion(1);
            return;
        }
    }

    if(e.key === "Enter"){
        searchEngine(target.value);
        return;
    }

    if(target.value === searchOldText)
        return;

    searchCurrentIndex = -1;
    searchOldText = target.value;

    if(typeof searchTimeout === "number"){
        clearTimeout(searchTimeout);
        searchTimeout = null;
    }

    searchTimeout = setTimeout(function(){
        if(target.value != "")
            searchAutocomplete(target.value);
        else
            searchCreateAutocomplete([]);
    }, 200);
}

function searchBarClick(e){
    let target = e.target;

    while(true){
        if(target === e.currentTarget)
            return;
        else if(target.tagName === "DIV" && target.classList.contains("term"))
            break;

        target = target.parentNode;
    }

    searchEngine(target.innerText);
}

function getBackground(){
    ajax("/api/background.php", "GET", null, response => {
        let element = document.querySelector("body>.background");
        element.style.backgroundImage = "url(" + response + ")";
    });
}

function createTile(title, logo, child, color = "#000"){
    let titleEl = document.createElement("div"),
        element = document.createElement("div"),
        list = document.querySelector(".tiles-list");
    
    element.classList = "tile-content";
    titleEl.classList = "tile-title";
    titleEl.style.color = color;
    titleEl.appendChild(logo);
    titleEl.innerHTML += title;
    element.appendChild(titleEl);
    element.appendChild(child);

    list.appendChild(element);
}

function generateDefaultTiles(){
    weatherTile();
    gmailTile();
    rssTile("https://www.mediafax.ro/rss");
    rssTile("http://rss.cnn.com/rss/edition.rss");
    redditTile("worldnews");
    redditTile("all");
    redditTile("globaloffensive");
}

function dom(){
    let searchBarElement = document.querySelector(".bar");

    searchInput = document.querySelector(".bar [name=search]");

    searchInput.addEventListener("keyup", searchType);
    searchInput.addEventListener("keydown", searchPreventBug);

    searchBarElement.addEventListener("click", searchBarClick);

    getBackground();
    generateDefaultTiles();
}

document.addEventListener("DOMContentLoaded", dom);