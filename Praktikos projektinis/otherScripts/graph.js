class Graph 
{
    static graphNumber = 0;
    constructor(path, graphName, start, end, intervalStep, graphConfig = [], intervalAnswers = [], inputAnswer, trueNumber, brackets) 
    {
        this.path = path;
        this.start = start;
        this.end = end;
        this.intervalSize = (this.end - this.start);
        this.intervalStep = intervalStep;
        this.graphConfig = graphConfig;
        this.intervalAnswers = intervalAnswers;
        this.inputAnswer = inputAnswer;
        this.graphName = graphName;
        this.currentLevel = graphName.split(" ")[1][0];
        this.trueNumber = trueNumber;
        this.brackets = brackets;
    }
    setGraph() 
    {
        document.getElementById("graph").src = this.path;
        this.configGraph();
    }
    configGraph() 
    {
        intervalContainer.style.left = this.graphConfig[1];
        document.getElementById("functionBlock").style.margin = this.graphConfig[3];
        document.getElementById("functionName").style.margin = this.graphConfig[3];
        let funcName = currentGraph.currentLevel == 5 ? currentGraph.inputAnswer[0] : currentGraph.currentLevel > 5 ? currentGraph.inputAnswer[2] : "f";
        if (currentGraph.currentLevel == 5) document.getElementById("functionName").innerHTML = "y=<span style='color: red'>" + funcName + "</span>(x)";
        else document.getElementById("functionName").innerText = "y=" + funcName + "(x)";
        const allIntervals = document.querySelectorAll('.interval');
        for (let i = 0; i < allIntervals.length; i++) allIntervals[i].style.marginLeft = this.graphConfig[2];
    }
}