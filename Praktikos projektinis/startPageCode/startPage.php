<!DOCTYPE html>
<html>
    <head>
        <title lang="lt">Lygių pasirinkimas</title>
        <link rel="stylesheet" href="startPage.css">
        <script src="startPage.js"></script>
    </head>
    <body>
        <button id="clearProgress" onclick="clearProgress()">Išvalyti progresą</button>
        <h1 id="levelTag">Lygiai</h1>
        <div class="container">
            <div id="buttons">
                <button id="level1" onclick="goToLevel('../levelCode/level.html', 'Lygis 1.0', 0)">Lygis 1</button><br>
                <button id="level2" class="levelButton" onclick="goToLevel('../levelCode/level.html', 'Lygis 2.0', 3)">Lygis 2</button><br>
                <button id="level3" class="levelButton" onclick="goToLevel('../levelCode/level.html', 'Lygis 3.0', 6)">Lygis 3</button><br>
                <button id="level4" class="levelButton" onclick="goToLevel('../levelCode/level.html', 'Lygis 4.0.1', 9)">Lygis 4</button><br>
                <button id="level5" class="levelButton" onclick="goToLevel('../levelCode/level.html', 'Lygis 5.0', 13)">Lygis 5</button><br>
                <button id="level6" class="levelButton" onclick="goToLevel('../levelCode/level.html', 'Lygis 6.0', 16)">Lygis 6</button><br>
                <button id="level7" class="levelButton" onclick="goToLevel('../levelCode/level.html', 'Lygis 7.0', 19)">Lygis 7</button><br>
                <button id="level8" class="levelButton" onclick="goToLevel('../levelCode/level.html', 'Lygis 8.0', 22)">Lygis 8</button><br>
                <button id="level9" class="levelButton" onclick="goToLevel('../levelCode/level.html', 'Lygis 9.0.1', 25)">Lygis 9</button>
            </div>
        </div>
    </body>
</html>