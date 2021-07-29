function weatherGetIcon(text){
    text = text.toLowerCase();

    if(~text.indexOf("sun"))
        return `
            <svg id="icon-sun" viewBox="0 0 24 24">
                <path d="M18 12c0-1.657-0.673-3.158-1.757-4.243s-2.586-1.757-4.243-1.757-3.158 0.673-4.243 1.757-1.757 2.586-1.757 4.243 0.673 3.158 1.757 4.243 2.586 1.757 4.243 1.757 3.158-0.673 4.243-1.757 1.757-2.586 1.757-4.243zM16 12c0 1.105-0.447 2.103-1.172 2.828s-1.723 1.172-2.828 1.172-2.103-0.447-2.828-1.172-1.172-1.723-1.172-2.828 0.447-2.103 1.172-2.828 1.723-1.172 2.828-1.172 2.103 0.447 2.828 1.172 1.172 1.723 1.172 2.828zM11 1v2c0 0.552 0.448 1 1 1s1-0.448 1-1v-2c0-0.552-0.448-1-1-1s-1 0.448-1 1zM11 21v2c0 0.552 0.448 1 1 1s1-0.448 1-1v-2c0-0.552-0.448-1-1-1s-1 0.448-1 1zM3.513 4.927l1.42 1.42c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-1.42-1.42c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414zM17.653 19.067l1.42 1.42c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-1.42-1.42c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414zM1 13h2c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2c-0.552 0-1 0.448-1 1s0.448 1 1 1zM21 13h2c0.552 0 1-0.448 1-1s-0.448-1-1-1h-2c-0.552 0-1 0.448-1 1s0.448 1 1 1zM4.927 20.487l1.42-1.42c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-1.42 1.42c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0zM19.067 6.347l1.42-1.42c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-1.42 1.42c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0z"></path>
            </svg>
        `;
    else if(~text.indexOf("rain"))
        return `
            <svg id="icon-cloud-rain" viewBox="0 0 24 24">
                <path d="M15 13v8c0 0.552 0.448 1 1 1s1-0.448 1-1v-8c0-0.552-0.448-1-1-1s-1 0.448-1 1zM7 13v8c0 0.552 0.448 1 1 1s1-0.448 1-1v-8c0-0.552-0.448-1-1-1s-1 0.448-1 1zM11 15v8c0 0.552 0.448 1 1 1s1-0.448 1-1v-8c0-0.552-0.448-1-1-1s-1 0.448-1 1zM20.401 17.496c1.517-0.665 2.623-1.883 3.181-3.312s0.572-3.074-0.092-4.591c-0.574-1.311-1.563-2.316-2.752-2.925-0.836-0.428-1.771-0.66-2.73-0.668h-0.528c-0.725-2.057-2.143-3.708-3.915-4.753-1.983-1.169-4.415-1.582-6.821-0.961s-4.334 2.161-5.503 4.144-1.582 4.415-0.961 6.821c0.509 1.97 1.634 3.623 3.099 4.783 0.433 0.343 1.062 0.27 1.405-0.163s0.27-1.062-0.163-1.405c-1.132-0.897-2.008-2.179-2.405-3.716-0.483-1.871-0.163-3.76 0.748-5.305s2.408-2.739 4.28-3.223 3.761-0.163 5.305 0.748 2.739 2.408 3.223 4.28c0.115 0.435 0.505 0.75 0.968 0.75h1.252c0.647 0.005 1.275 0.162 1.834 0.448 0.793 0.406 1.448 1.073 1.832 1.947 0.443 1.012 0.435 2.106 0.062 3.061s-1.109 1.765-2.121 2.208c-0.506 0.222-0.736 0.811-0.515 1.317s0.811 0.736 1.317 0.515z"></path>
            </svg>
        `;
    else if(~text.indexOf("snow"))
        return `
            <svg id="icon-cloud-snow" viewBox="0 0 24 24">
                <path d="M20.401 18.496c1.517-0.665 2.623-1.883 3.181-3.312s0.572-3.074-0.092-4.591c-0.574-1.311-1.563-2.316-2.752-2.925-0.836-0.428-1.771-0.66-2.73-0.668h-0.528c-0.725-2.057-2.143-3.708-3.915-4.753-1.983-1.169-4.415-1.582-6.821-0.961s-4.334 2.161-5.503 4.144-1.582 4.415-0.961 6.821c0.509 1.97 1.634 3.623 3.099 4.783 0.433 0.343 1.062 0.27 1.405-0.163s0.27-1.062-0.163-1.405c-1.132-0.897-2.008-2.179-2.405-3.716-0.483-1.871-0.163-3.76 0.748-5.305s2.408-2.739 4.28-3.223 3.761-0.163 5.305 0.748 2.739 2.408 3.223 4.28c0.115 0.435 0.505 0.75 0.968 0.75h1.252c0.647 0.005 1.275 0.162 1.834 0.448 0.793 0.406 1.448 1.073 1.832 1.947 0.443 1.012 0.435 2.106 0.062 3.061s-1.109 1.765-2.121 2.208c-0.506 0.222-0.736 0.811-0.515 1.317s0.811 0.736 1.317 0.515zM8 17c0.552 0 1-0.448 1-1s-0.448-1-1-1-1 0.448-1 1 0.448 1 1 1zM8 21c0.552 0 1-0.448 1-1s-0.448-1-1-1-1 0.448-1 1 0.448 1 1 1zM12 19c0.552 0 1-0.448 1-1s-0.448-1-1-1-1 0.448-1 1 0.448 1 1 1zM12 23c0.552 0 1-0.448 1-1s-0.448-1-1-1-1 0.448-1 1 0.448 1 1 1zM16 17c0.552 0 1-0.448 1-1s-0.448-1-1-1-1 0.448-1 1 0.448 1 1 1zM16 21c0.552 0 1-0.448 1-1s-0.448-1-1-1-1 0.448-1 1 0.448 1 1 1z"></path>
            </svg>
        `;
    else
        return `
            <svg id="icon-cloud" viewBox="0 0 24 24">
                <path d="M18 11c1.105 0 2.103 0.447 2.828 1.172s1.172 1.723 1.172 2.828-0.447 2.103-1.172 2.828-1.723 1.172-2.828 1.172h-8.995c-1.463-0.008-2.853-0.461-4.005-1.258-1.334-0.922-2.348-2.304-2.784-3.992-0.483-1.872-0.163-3.761 0.748-5.305s2.408-2.739 4.28-3.223 3.761-0.163 5.305 0.748 2.739 2.408 3.223 4.28c0.115 0.435 0.505 0.75 0.968 0.75zM18 9h-0.52c-0.725-2.057-2.143-3.708-3.915-4.753-1.983-1.169-4.415-1.583-6.821-0.961s-4.334 2.16-5.503 4.143-1.582 4.415-0.961 6.821c0.56 2.169 1.867 3.951 3.583 5.137 1.478 1.023 3.261 1.603 5.132 1.613h9.005c1.657 0 3.158-0.673 4.243-1.757s1.757-2.586 1.757-4.243-0.673-3.158-1.757-4.243-2.586-1.757-4.243-1.757z"></path>
            </svg>
        `;
}

function weatherTile(){
    let element = document.createElement("div"),
        logo = document.createElement("svg");

    element.classList = "weather-tile";
    logo.setAttribute("viewBox", "0 0 32 32");
    logo.innerHTML = `
        <path d="M16 26c1.105 0 2 0.895 2 2v2c0 1.105-0.895 2-2 2s-2-0.895-2-2v-2c0-1.105 0.895-2 2-2zM16 6c-1.105 0-2-0.895-2-2v-2c0-1.105 0.895-2 2-2s2 0.895 2 2v2c0 1.105-0.895 2-2 2zM30 14c1.105 0 2 0.895 2 2s-0.895 2-2 2h-2c-1.105 0-2-0.895-2-2s0.895-2 2-2h2zM6 16c0 1.105-0.895 2-2 2h-2c-1.105 0-2-0.895-2-2s0.895-2 2-2h2c1.105 0 2 0.895 2 2zM25.899 23.071l1.414 1.414c0.781 0.781 0.781 2.047 0 2.828s-2.047 0.781-2.828 0l-1.414-1.414c-0.781-0.781-0.781-2.047 0-2.828s2.047-0.781 2.828 0zM6.101 8.929l-1.414-1.414c-0.781-0.781-0.781-2.047 0-2.828s2.047-0.781 2.828 0l1.414 1.414c0.781 0.781 0.781 2.047 0 2.828s-2.047 0.781-2.828 0zM25.899 8.929c-0.781 0.781-2.047 0.781-2.828 0s-0.781-2.047 0-2.828l1.414-1.414c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-1.414 1.414zM6.101 23.071c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-1.414 1.414c-0.781 0.781-2.047 0.781-2.828 0s-0.781-2.047 0-2.828l1.414-1.414z"></path>
        <path d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8s-3.582-8-8-8zM16 21c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"></path>
    `;

    ajax("//wttr.in/?format=j1", "GET", null, response => {
        response = JSON.parse(response);

        let data = response.current_condition[0],
            city = response.nearest_area[0].areaName[0].value + ", " + response.nearest_area[0].region[0].value,
            temperature = data.temp_C + "°C",
            condition = data.weatherDesc[0].value,
            icon = weatherGetIcon(condition),
            days = response.weather,
            daysEl = document.createElement("div");

        daysEl.className = "full";

        for(let i = 0; i < days.length; i++){
            let day = document.createElement("div"),
                time = new Date(days[i].date),
                averageIcon = days[i].hourly[days[i].hourly.length / 2].weatherDesc[0].value;

            day.innerHTML = weatherGetIcon(averageIcon) + "<div><span>" + time.getDate() + " " + time.toLocaleString("default", {month: "short"}) + "</span><p>" + days[i].mintempC + "°C / " + days[i].maxtempC + "°C</p></div>";
            daysEl.appendChild(day);
        }

        daysEl = daysEl.outerHTML;

        element.innerHTML = `
            <div class="highlight">
                <div class="icon">
                    ${icon}
                </div>
                <div class="temp">
                    <p>${city}</p>
                    <span>${temperature}</span>
                </div>
            </div>
            <h3>Daily forecast</h3>
            ${daysEl}
            <h3>Other data</h3>
            <div class="other">
                <p>Humidity: ${data.humidity}%</p>
                <p>Wind: ${data.windspeedKmph} Km/h, ${data.winddirDegree}° ${data.winddir16Point}</p>
                <p>Pressure: ${data.pressure} Pa</p>
                <p>UV Index: ${data.uvIndex}</p>
            </div>
        `;
    });

    createTile("Weather", logo, element, "#0D47A1");
}

let NO_REDDIT_POSTS = 5;

function redditTile(subreddit){
    let logo = document.createElement("svg"),
        content = document.createElement("div");
    
    content.classList = "reddit-tile";
    logo.setAttribute("viewBox", "0 0 24 24");
    logo.innerHTML = `
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
    `;

    ajax("//api.reddit.com/r/" + subreddit, "GET", null, response => {
        let data = (JSON.parse(response)).data.children;

        for(let i = 0; i < NO_REDDIT_POSTS; i++){
            let local = data[i].data,
                thumb = ` style="background-image:url(${local.thumbnail})"`;

            if(!checkURL(local.thumbnail))
                thumb = "";

            content.innerHTML += `<a target="_blank" href="${local.url}"><div class="thumb"${thumb}></div>${escapeHtml(local.title)}</a>`;
        }
    });

    createTile("/r/" + subreddit, logo, content, "#FF5700");
}

let gmailDiv,
    NO_GMAIL_EMAILS = 6;

const CLIENT_ID = "20378849773-r2q5s15q5eeq4fko1erdnp8v9oga41p7.apps.googleusercontent.com",
      API_KEY = "AIzaSyDagUzRpuCRvmKBJM72smgTojIsgLYxptE",
      SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

function gmailAuthInit(){
    gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
    }, handleGmailAuth);
    return false;
}

function gmailGetHeader(obj, name){
    for(let i = 0; i < obj.length; i++){
        if(obj[i].name === name)
            return obj[i].value;
    }

    return "";
}

function gmailLogout(){
    let token = gapi.auth.getToken();

    if(token && token.access_token){
        ajax("https://accounts.google.com/o/oauth2/revoke?token=" + token.access_token, "GET");
    }

    gapi.auth.setToken(null);
    gapi.auth.signOut();
    gmailDiv.innerHTML = ``;
    handleGmailAuth({error: "immediate_failed"});
}

function gmailNewButton(address){
    if(!gmailDiv.querySelectorAll(".compose").length){
        let parent = document.createElement("div"),
            logout = document.createElement("span");
        
        parent.className = "gmail-buttons";
        logout.innerHTML = `<svg id="icon-log-out" viewBox="0 0 24 24">
                <path d="M9 20h-4c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-14c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h4c0.552 0 1-0.448 1-1s-0.448-1-1-1h-4c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v14c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h4c0.552 0 1-0.448 1-1s-0.448-1-1-1zM18.586 11h-9.586c-0.552 0-1 0.448-1 1s0.448 1 1 1h9.586l-3.293 3.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5-5c0.092-0.092 0.166-0.202 0.217-0.324 0.15-0.362 0.078-0.795-0.217-1.090l-5-5c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
            </svg>`;
        logout.addEventListener("click", gmailLogout);

        parent.innerHTML = `<a class="compose" onclick="window.open(this.href, 'newwin', 'width=600, height=500, '); return false;" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&authuser=${address}"><svg viewBox="0 0 24 24">
                <path d="M12 21h9c0.552 0 1-0.448 1-1s-0.448-1-1-1h-9c-0.552 0-1 0.448-1 1s0.448 1 1 1zM15.793 2.793l-12.5 12.5c-0.122 0.121-0.217 0.28-0.263 0.465l-1 4c-0.039 0.15-0.042 0.318 0 0.485 0.134 0.536 0.677 0.862 1.213 0.728l4-1c0.167-0.041 0.33-0.129 0.465-0.263l12.5-12.5c0.609-0.609 0.914-1.41 0.914-2.207s-0.305-1.598-0.914-2.207-1.411-0.915-2.208-0.915-1.598 0.305-2.207 0.914zM17.207 4.207c0.219-0.219 0.504-0.328 0.793-0.328s0.574 0.109 0.793 0.328 0.328 0.504 0.328 0.793-0.109 0.574-0.328 0.793l-12.304 12.304-2.115 0.529 0.529-2.115z"></path>
            </svg>Compose</a>`;
        parent.appendChild(logout);
        gmailDiv.appendChild(parent);
    }
}

function gmailFetchEmail(message){
    let element = document.createElement("a"),
        icon = document.createElement("svg"),
        from = escapeHtml(gmailGetHeader(message.payload.headers, "From")),
        subject = escapeHtml(gmailGetHeader(message.payload.headers, "Subject")),
        date = getShortTimePassed(gmailGetHeader(message.payload.headers, "Date")),
        delivered = gmailGetHeader(message.payload.headers, "Delivered-To"),
        id = message.id;

    element.className = "email";
    element.target = "_blank";
    element.href = "https://mail.google.com/mail?authuser=" + delivered + "#inbox/" + id;
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.innerHTML = `
        <path d="M3 7.921l8.427 5.899c0.34 0.235 0.795 0.246 1.147 0l8.426-5.899v10.079c0 0.272-0.11 0.521-0.295 0.705s-0.433 0.295-0.705 0.295h-16c-0.272 0-0.521-0.11-0.705-0.295s-0.295-0.433-0.295-0.705zM1 5.983c0 0.010 0 0.020 0 0.030v11.987c0 0.828 0.34 1.579 0.88 2.12s1.292 0.88 2.12 0.88h16c0.828 0 1.579-0.34 2.12-0.88s0.88-1.292 0.88-2.12v-11.988c0-0.010 0-0.020 0-0.030-0.005-0.821-0.343-1.565-0.88-2.102-0.541-0.54-1.292-0.88-2.12-0.88h-16c-0.828 0-1.579 0.34-2.12 0.88-0.537 0.537-0.875 1.281-0.88 2.103zM20.894 5.554l-8.894 6.225-8.894-6.225c0.048-0.096 0.112-0.183 0.188-0.259 0.185-0.185 0.434-0.295 0.706-0.295h16c0.272 0 0.521 0.11 0.705 0.295 0.076 0.076 0.14 0.164 0.188 0.259z"></path>
    `;

    if(message.labelIds.indexOf("UNREAD")){
        element.classList.add("unread");
        icon.innerHTML = `
            <path d="M21 13v5c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-16c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-5h4.465l1.703 2.555c0.182 0.27 0.486 0.445 0.832 0.445h4c0.326-0.002 0.64-0.158 0.832-0.445l1.703-2.555zM6.344 5.558c0.066-0.131 0.16-0.246 0.272-0.337 0.172-0.139 0.387-0.221 0.624-0.221h9.513c0.15 0.001 0.295 0.034 0.426 0.094 0.201 0.092 0.37 0.249 0.477 0.464l2.725 5.442h-4.381c-0.346 0-0.65 0.175-0.832 0.445l-1.703 2.555h-2.93l-1.703-2.555c-0.192-0.287-0.506-0.443-0.832-0.445h-4.381zM4.556 4.662l-3.441 6.872c-0.031 0.059-0.056 0.121-0.075 0.187-0.028 0.094-0.041 0.188-0.040 0.279v6c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h16c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-6c0-0.151-0.033-0.293-0.091-0.417-0.005-0.010-0.010-0.021-0.015-0.031l-0.009-0.018-3.441-6.872c-0.315-0.634-0.829-1.111-1.433-1.387-0.388-0.177-0.812-0.272-1.244-0.275h-9.527c-0.711 0-1.367 0.249-1.883 0.667-0.331 0.268-0.605 0.606-0.801 0.995z"></path>
        `;
    }

    icon = icon.outerHTML;
    element.innerHTML = `<div>${icon}<span>${date}</span></div><div><p>${subject}</p><span>${from}<span></div>`;
    gmailDiv.appendChild(element);

    gmailNewButton(delivered);
}

function gmailDisplayInbox(){
    gapi.client.gmail.users.messages.list({
        "userId": "me",
        "labelIds": "INBOX",
        "maxResults": NO_GMAIL_EMAILS
    }).execute(response => {
        response.messages.forEach(message => {
            gapi.client.gmail.users.messages.get({
                "userId": "me",
                "id": message.id
            }).execute(gmailFetchEmail);
        });
    });
}

function handleGmailAuth(auth){
    if(auth && !auth.error){
        let button = gmailDiv.querySelector(".auth-button");
        
        if(button)
            gmailDiv.removeChild(button);
        
        gapi.client.load("gmail", "v1", gmailDisplayInbox);
    }
    else if(auth.error === "immediate_failed"){
        let button = document.createElement("div");
        button.className = "auth-button";
        button.innerText = "Login with Google";
        gmailDiv.appendChild(button);
        button.addEventListener("click", gmailAuthInit);
    }
}

function handleGmailLoad(){
    gapi.client.setApiKey(API_KEY);
    gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: true
    }, handleGmailAuth);
}

function gmailTile(){
    let logo = document.createElement("svg"),
        element = document.createElement("div"),
        script = document.createElement("script");

    logo.setAttribute("viewBox", "0 0 24 24");
    logo.innerHTML = `
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
    `;

    gmailDiv = element;
    element.className = "gmail-tile";

    script.src = "https://apis.google.com/js/client.js?onload=handleGmailLoad";
    document.body.appendChild(script);

    createTile("Gmail", logo, element, "#EA4335");
}

let RSS_NO_POSTS = 5;

function rssTile(url){
    if(!checkURL(url))
        return;

    let title = (new URL(url)).hostname.replace("www.", "").replace("rss.", ""),
        logo = document.createElement("svg"),
        element = document.createElement("div");

    element.className = "rss-tile";
    logo.setAttribute("viewBox", "0 0 24 24");
    logo.innerHTML = `
        <path d="M4 12c2.209 0 4.208 0.894 5.657 2.343s2.343 3.448 2.343 5.657c0 0.552 0.448 1 1 1s1-0.448 1-1c0-2.761-1.12-5.263-2.929-7.071s-4.31-2.929-7.071-2.929c-0.552 0-1 0.448-1 1s0.448 1 1 1zM4 5c4.142 0 7.891 1.678 10.607 4.393s4.393 6.465 4.393 10.607c0 0.552 0.448 1 1 1s1-0.448 1-1c0-4.694-1.904-8.946-4.979-12.021s-7.327-4.979-12.021-4.979c-0.552 0-1 0.448-1 1s0.448 1 1 1zM7 19c0-0.552-0.225-1.053-0.586-1.414s-0.862-0.586-1.414-0.586-1.053 0.225-1.414 0.586-0.586 0.862-0.586 1.414 0.225 1.053 0.586 1.414 0.862 0.586 1.414 0.586 1.053-0.225 1.414-0.586 0.586-0.862 0.586-1.414z"></path>
    `;

    ajax("/api/rss.php?url=" + url, "GET", null, response => {
        let data = new window.DOMParser().parseFromString(response, "text/xml"),
            items = Array.from(data.querySelectorAll("rss channel item")).slice(0, RSS_NO_POSTS);

        for(let i = 0; i < items.length; i++){
            let post = document.createElement("a"),
                postTitle = escapeHtml(items[i].querySelector("title").innerHTML.replace("<![CDATA[", "").replace("]]>", "")),
                imageEl = items[i].querySelector("enclosure[type^='image'], content[type^='image']"),
                image,
                thumb;

            if(imageEl){
                image = imageEl.getAttribute("url");
                thumb = ` style="background-image:url(${image})"`;
            }
            else
                image = null;

            if(!checkURL(image))
                thumb = "";

            post.className = "post";
            post.target = "_blank";
            post.href = items[i].querySelector("link").innerHTML;
            post.innerHTML = `<div class="thumb"${thumb}></div>${postTitle}`;

            element.appendChild(post);
        }
    });

    createTile(title, logo, element, "#1B5E20");
}