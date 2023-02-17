class Interval
{
    constructor(labelValue)
    {
        this.open = true;
        this.element = document.createElement("div");
        this.element.className = "interval";
        this.position = 0;
        this.labelValue = labelValue;
    }
    static findNearestIntervalLabel(position) 
    {
        for (let i = 0; i < intervals.length; i++) if (parseFloat(position.slice(0, -2)) < intervals[i].position) return intervals[i].labelValue;
    }
}