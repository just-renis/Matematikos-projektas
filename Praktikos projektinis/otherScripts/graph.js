class Graph 
{
    static graphNumber = 0;
    constructor(path, graphName, start, end, intervalStep, axisConfig = [], intervalAnswers = [], inputAnswer, trueNumber) 
    {
        this.path = path;
        this.start = start;
        this.end = end;
        this.intervalSize = (this.end - this.start);
        this.intervalStep = intervalStep;
        this.axisConfig = axisConfig;
        this.intervalAnswers = intervalAnswers;
        this.inputAnswer = inputAnswer;
        this.graphName = graphName;
        this.currentLevel = graphName.split(" ")[1][0];
        if (this.currentLevel < 3) this.finishedAnimLimit = 3;
        else this.finishedAnimLimit = 4;
        this.finishedAnimations = 0;
        this.trueNumber = trueNumber;
    }
    setGraph() 
    {
        document.getElementById("graph").src = this.path;
        this.configGraph();
    }
    configGraph() 
    {
        intervalContainer.style.left = this.axisConfig[1];
        const allIntervals = document.querySelectorAll('.interval');
        for (let i = 0; i < allIntervals.length; i++) allIntervals[i].style.marginLeft = this.axisConfig[2];
    }
}