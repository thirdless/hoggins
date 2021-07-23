let searchTimeout;

function searchCreateAutocomplete(terms){
    let bar = document.querySelector(".bar"),
        autocomplete = bar.querySelector(".autocomplete");

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
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/autocomplete?q=" + encodeURIComponent(term), true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            let response = JSON.parse(xhr.responseText),
                terms = [];
            
            for(let i = 0; i < response.length; i++) 
                if(response[i] instanceof Array)
                    terms = terms.concat(response[i]);

            searchCreateAutocomplete(terms);
        }
    }
    xhr.send();
}

function searchType(e){
    let target = e.target;

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

function dom(){
    let searchInput = document.querySelector(".bar [name=search]");

    searchInput.addEventListener("keydown", searchType);
}

document.addEventListener("DOMContentLoaded", dom);