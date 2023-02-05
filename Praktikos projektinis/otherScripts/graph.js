class Graph
{
    static graphNumber = 0;
    constructor(path, graphName, start, end, intervalStep, pixels, axisConfig = [], offset, intervalAnswers = [], inputAnswer, trueNumber)
    {
        this.path = path;
        this.start = start;
        this.end = end;
        this.intervalSize = this.end - this.start;
        this.intervals = [];
        this.pixels = pixels;
        this.axisConfig = axisConfig;
        this.offset = offset;
        this.intervalAnswers = intervalAnswers;
        this.inputAnswer = inputAnswer;
        this.graphName = graphName;
        this.currentLevel = graphName.split(" ")[1][0];
        if (this.currentLevel < 3) this.finishedAnimLimit = 3;
        else this.finishedAnimLimit = 4;
        this.finishedAnimations = 0;
        this.trueNumber = trueNumber;
        for (let i = 0; i <= this.intervalSize; i += intervalStep) 
        {
            this.intervals.push([window.innerWidth * (pixels / this.intervalSize * i / window.innerWidth), i + this.start]);
        }
    }
    setGraph() 
    {
        document.getElementById("graph").src = this.path; 
        this.configGraph();
    }
    findNearestIntervalExample(circlePos)
    {
        if (circlePos < 0) return ["-∞", -105 - currentGraph.offset];
        else if (circlePos > currentGraph.pixels) return ["∞", 779 - currentGraph.offset];
        for (let i = 0; i < this.intervals.length; i++)
        {
            if (circlePos < this.intervals[i][0])
            {
                if (circlePos - this.intervals[i - 1][0] > (this.intervals[i][0] - this.intervals[i - 1][0]) / 2) return [this.intervals[i][1], this.intervals[i][0]];
                else return [ this.intervals[i - 1][1], this.intervals[i - 1][0]];
            }
        }
        return [this.intervals[this.intervals.length - 1][1], this.intervals[this.intervals.length - 1][0]];
    }
    findNearestIntervalLevel(circlePos, otherCirclePos, startCircle)
    {
        if (startCircle && otherCirclePos == 0) return ["-∞", -105 - currentGraph.offset];
        else if (!startCircle && otherCirclePos == currentGraph.pixels) return ["∞", 779 - currentGraph.offset];
        for (let i = 0; i < this.intervals.length; i++)
        {
            if (circlePos < this.intervals[i][0])
            {
                if (circlePos - this.intervals[i - 1][0] > (this.intervals[i][0] - this.intervals[i - 1][0]) / 2 && this.intervals[i][0] != otherCirclePos) return [this.intervals[i][1], this.intervals[i][0]];
                else if (this.intervals[i - 1][0] != otherCirclePos) return [ this.intervals[i - 1][1], this.intervals[i - 1][0]];
            }
        }
        return [this.intervals[this.intervals.length - 1][1], this.intervals[this.intervals.length - 1][0]];
    }
    configGraph()
    {
        axisX.style.width = this.axisConfig[0];
        axisX.style.marginTop = this.axisConfig[1];
        axisX.style.marginLeft = this.axisConfig[2];
        startLineX.style.left = this.axisConfig[2];
        endLineX.style.right = this.axisConfig[3];
        negInf.style.top = this.axisConfig[4];
        posInf.style.top = this.axisConfig[4];
        intervalContainer.style.left = this.axisConfig[5];
        const allIntervals = document.querySelectorAll('.interval');
        for (let i = 0; i < allIntervals.length - 2; i++)
        {
            allIntervals[i].style.marginLeft = this.axisConfig[6];
        }
    }
}