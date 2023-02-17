class Circle
{
    static circleAmount = 1;
    constructor(circle, line, lineBorder, intervalLabel, currentNumber, circleLabel, positionLeft)
    {
        this.circle = circle;
        this.line = line;
        this.lineBorder = lineBorder;
        this.intervalLabel = intervalLabel;
        this.circleLabel = circleLabel;
        this.index = Circle.circleAmount - 1;
        this.circleLabel.innerText = Circle.circleAmount++;
        if (currentGraph.currentLevel >= 4) 
        {
            this.switchType("white", "5px dashed");
            this.intervalLabel.innerText = circleLabel.id == "circleLabel1" ? "-∞" : "+∞";
        }
        else
        {
            this.intervalLabel.innerText = (currentNumber / currentGraph.trueNumber).toLocaleString('de-DE');
            this.circle.style.backgroundColor = "black";
        }
        this.circle.style.left = positionLeft + "px";
        this.line.style.left = positionLeft + "px";
        this.circle.style.top = currentGraph.axisConfig[0];
        this.intervalSpot = -1;
    }
    getBounds() { return this.circle.getBoundingClientRect(); }
    getBackgroundColor() { return this.circle.style.backgroundColor; }
    switchType(color, change)
    {
        this.circle.style.backgroundColor = color;
        switch(this.lineBorder)
        {
            case "left": this.line.style.borderLeft = change; break;
            case "right": this.line.style.borderRight = change; break;
            case "top": this.line.style.borderTop = change; break;
            default: this.line.style.borderBottom = change;
        }
    }
}