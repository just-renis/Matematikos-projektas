class Interval
{
    constructor(index, pixels, intervalSize)
    {
        this.open = true;
        this.index = index;
        this.element = document.createElement("div");
        this.element.className = "interval";
        this.position = window.innerWidth * (pixels / intervalSize * index / window.innerWidth);
    }
    setPosition(position){ this.position = position; }
}