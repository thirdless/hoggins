<!DOCTYPE html>
<html>
    <head>
        <title>Hoggins</title>
        <meta charset="utf-8"/>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="/assets/index.css"/>
        <link rel="stylesheet" href="/assets/tiles.css"/>
    </head>
    <body>
        <div class="background"></div>
        <a class="settings" href="/settings"><svg><use xlink:href="#icon-settings"></use></svg></a>
        <div class="main">
            <div class="group">
                <div class="logo">Hoggins</div>
                <div class="bar">
                    <input type="text" name="search" autocomplete="off" spellcheck="false"/>
                </div>
                <div class="bookmarks"></div>
            </div>
        </div>
        <div class="tiles-list"></div>
        <script src="/assets/svg.js"></script>
        <script src="/assets/index.js"></script>
        <script src="/assets/tiles.js"></script>
    </body>
</html>