<!DOCTYPE html>
<html>
    <head>
        <title>Hoggins</title>
        <meta charset="utf-8"/>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/assets/index.css"/>
    </head>
    <body class="settings">
        <div class="header"><a href="/">Hoggins</a></div>
        <div class="view">
            <h1>Settings page</h1>
            <div class="menu">
                <h2>Theme</h2>
                <select class="theme-select">
                    <option selected value="0">Small</option>
                    <option value="1">Smaller</option>
                    <option value="2">Smallest</option>
                </select>
                <div class="line">Auto-background: <div class="switch" id="background"></div></div>
                <div class="line custom-bg">Custom background URL: <input type="url" class="background-input"/></div>
            </div>
            <div class="menu bookmarks">
                <h2>Bookmarks</h2>
                <div class="option create createLink"><svg><use xlink:href="#icon-plus-circle"></use></svg>Create new bookmark</div>
            </div>
            <div class="menu tiles">
                <h2>Tiles</h2>
                <div class="option create createTile"><svg><use xlink:href="#icon-plus-circle"></use></svg>Add new tile</div>
            </div>
        </div>
        <script src="/assets/svg.js"></script>
        <script src="/assets/settings.js"></script>
    </body>
</html>