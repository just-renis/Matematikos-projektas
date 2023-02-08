class Interval
{
    constructor(index, labelValue, pixels, intervalSize, whichInf)
    {
        this.open = true;
        this.element = document.createElement("div");
        this.element.className = "interval";
        this.position = window.innerWidth * (pixels / intervalSize * index / window.innerWidth);
        this.labelValue = labelValue;
        this.whichInf = whichInf;
    }
    setPosition(position){ this.position = position; }
}