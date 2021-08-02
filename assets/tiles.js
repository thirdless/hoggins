function weatherGetIcon(text){
    text = text.toLowerCase();

    if(~text.indexOf("sun"))
        return `<svg><use xlink:href="#icon-sun"></use></svg>`;
    else if(~text.indexOf("rain"))
        return `<svg><use xlink:href="#icon-cloud-rain"></use></svg>`;
    else if(~text.indexOf("snow"))
        return `<svg><use xlink:href="#icon-cloud-snow"></use></svg>`;
    else
        return `<svg><use xlink:href="#icon-cloud"></use></svg>`;
}

function weatherTile(){
    let element = document.createElement("div"),
        logo = document.createElement("svg");

    element.classList = "weather-tile";
    logo.innerHTML = `<use xlink:href="#icon-sun"></use>`;

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
    logo.innerHTML = `<use xlink:href="#icon-reddit"></use>`;

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
        logout.innerHTML = `<svg><use xlink:href="#icon-log-out"></use></svg>`;
        logout.addEventListener("click", gmailLogout);

        parent.innerHTML = `<a class="compose" onclick="window.open(this.href, 'newwin', 'width=600, height=500, '); return false;" href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&authuser=${address}"><svg><use xlink:href="#icon-edit"></use></svg>Compose</a>`;
        parent.appendChild(logout);
        gmailDiv.appendChild(parent);
    }
}

function gmailFetchEmail(message){
    let element = document.createElement("a"),
        icon = document.createElement("svg"),
        from = escapeHtml(gmailGetHeader(message.payload.headers, "From")).split("&lt;")[0],
        subject = escapeHtml(gmailGetHeader(message.payload.headers, "Subject")),
        date = getShortTimePassed(gmailGetHeader(message.payload.headers, "Date")),
        delivered = gmailGetHeader(message.payload.headers, "Delivered-To"),
        id = message.id;

    element.className = "email";
    element.target = "_blank";
    element.href = "https://mail.google.com/mail?authuser=" + delivered + "#inbox/" + id;
    icon.innerHTML = `<use xlink:href="#icon-inbox"></use>`;

    if(message.labelIds.indexOf("UNREAD")){
        element.classList.add("unread");
        icon.innerHTML = `<use xlink:href="#icon-mail"></use>`;
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
        button.innerHTML = `<svg><use xlink:href="#icon-log-in"></use></svg> Login with Google`;
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

    logo.innerHTML = `<use xlink:href="#icon-gmail"></use>`;

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
    logo.innerHTML = `<use xlink:href="#icon-rss"></use>`;

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