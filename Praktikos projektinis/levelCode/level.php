<!DOCTYPE html>
<html>
    <head>
        <title id="title">Apibrėžimo sritis - Lygis 1.1</title>
        <link rel="stylesheet" href="level.css">
        <script src="../otherScripts/interval.js"></script>
        <script src="../otherScripts/graph.js"></script>
        <script src="../otherScripts/circle.js"></script>
        <script src="../otherScripts/globalVariables.js"></script>
        <script src="../otherScripts/animationFunctions.js"></script>
        <script src="../otherScripts/graphFunctions.js"></script>
        <script src="../otherScripts/utilityFunctions.js"></script>
        <script src="level.js" defer></script>
        <script src="../testCode/testClass.js"></script>
    </head>
    <body>
        <button id="goBackButton" onclick="goBack()">Grįžti į lygių pasirinkimą</button>
        <h1 id="levelTag">Apibrėžimo sritis - Lygis 1.1</h1>
        <h1 id="ats"></h1>
        <div class="container" id="container">
            <img id="graph" class="graph">
            <div class="overlay" id="overlay">
                <div id="intervalContainer"></div>
                <canvas id="filledArea" width="700px" height="500px"></canvas>
                <canvas id="additionalLines" width="700px" height="500px"></canvas>
                <div id="functionBlock"></div>
                <p id="functionName"></p>
            </div>
        </div>
        <div id="apibrezimoSritiesContainer"></div>
        <div id="buttons">
            <button id="changeCircleButton" onclick="changeSelectedCircleType()">Pakeisti skrituliuko tipą</button><br>
            <button id="negInfButton" onclick="writeInfSymbol(false)">Įdėti -∞</button>
            <button id="posInfButton" onclick="writeInfSymbol(true)">Įdėti +∞</button><br>
            <button id="answerButton" onclick="checkIfCorrect()">Patvirtinti atsakymą</button>
            <button id="nextLevelButton" onclick="nextLevel()">Kitas lygis</button><br>
            <button id="showAnswerButton" onclick="showAnswer()">Parodyti atsakymą</button>
            <button id="repeatExample" onclick="repeatExample()" >Pakartoti pavyzdį</button>
        </div>
        <div id="infinitySpots"></div>
        <div id="explanation"></div>
        <p id="rulesLeftSide" class="rules"></p>
        <p id="rulesRightSide" class="rules"></p>
    </body>
</html>