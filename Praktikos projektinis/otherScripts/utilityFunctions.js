function setColor()
{
    switch (currentGraph.currentLevel)
    {
        case "1": document.body.style.backgroundColor = "lightgreen"; break;
        case "2": document.body.style.backgroundColor = "rgb(0, 255, 100)"; break;
        case "3": document.body.style.backgroundColor = "rgb(0, 255, 150)"; break;
        case "4": document.body.style.backgroundColor = "rgb(255, 255, 130)"; break;
        case "5": document.body.style.backgroundColor = "yellow"; break;
        case "6": document.body.style.backgroundColor = "gold"; break;
        case "7": document.body.style.backgroundColor = "rgb(255, 139, 137)"; break;
        case "8": document.body.style.backgroundColor = "rgb(255, 130, 60)"; break;
        case "9": document.body.style.backgroundColor = "pink"; break;
    }
}