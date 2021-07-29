let modal;

function openModal(element){
    if(modal)
        return;

    
}

function closeModal(){
    if(!modal)
        return;

    document.body.removeChild(modal);
    modal = null;
}

function switchesEvent(){
    let switches = document.querySelectorAll(".switch");
}

function init(){
    switchesEvent();
}

document.addEventListener("DOMContentLoaded", init);