class Circle
{
    constructor(circle, line, lineBorder, label, currentNumber)
    {
        this.circle = circle;
        this.line = line;
        this.lineBorder = lineBorder;
        this.label = label;
        this.label.innerText = currentNumber / currentGraph.trueNumber;
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