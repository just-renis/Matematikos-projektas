class Circle
{
    static circleAmount = 1;
    constructor(circle, line, lineBorder, intervalLabel, currentNumber, circleLabel)
    {
        this.circle = circle;
        this.line = line;
        this.lineBorder = lineBorder;
        this.intervalLabel = intervalLabel;
        this.circleLabel = circleLabel;
        this.circleLabel.innerText = Circle.circleAmount++;
        this.intervalLabel.innerText = (currentNumber / currentGraph.trueNumber).toLocaleString('de-DE');
        this.circle.style.backgroundColor = "black";
        this.intervalSpot = -1;
    }
    getBounds() { return this.circle.getBoundingClientRect(); }
    getOffsetWidth() { return this.circle.offsetWidth; }
    getOffsetHeight() { return this.circle.offsetHeight; }
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