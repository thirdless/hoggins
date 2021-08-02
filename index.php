<?php

session_start();

?><!DOCTYPE html>
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
        <div class="main">
            <div class="group">
                <div class="logo">
                    Hoggins
                </div>
                <div class="bar">
                    <input type="text" name="search" autocomplete="off" spellcheck="false"/>
                </div>
                <div class="bookmarks">
                    <a class="link" href="https://google.com"><img src="/api/favicon.php?url=https://google.com">Google</a>
                    <a class="link" href="https://google.com"><img src="/api/favicon.php?url=https://google.com">Google</a>
                    <a class="link" href="https://facebook.com"><img src="/api/favicon.php?url=https://facebook.com">Facebook</a>
                    <a class="link" href="https://music.youtube.com"><img src="/api/favicon.php?url=https://youtube.com">YouTube Music</a>
                </div>
            </div>
        </div>
        <div class="tiles-list"></div>
        <script src="/assets/svg.js"></script>
        <script src="/assets/index.js"></script>
        <script src="/assets/tiles.js"></script>
    </body>
</html>