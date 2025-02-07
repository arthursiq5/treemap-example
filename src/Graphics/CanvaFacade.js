import Point from "./Point";

export default class CanvaFacade {
    constructor(canva) {
        this.canva = canva
        this.context = this.canva.getContext('2d')
        this.drawnArea = 0;
        this.startPoint = new Point()
        this.endPoint = this.getDimensions()
    }

    getDimensions() {
        return new Point(800,600)//this.canva.width, this.canva.height)
    }

    getArea() {
        return this.endPoint.x * this.endPoint.y
    }

    drawRect(rect){
        this.context.fillStyle = rect.color;
        this.context.fillRect(rect.startPoint.x, rect.startPoint.y, rect.endPoint.x, rect.endPoint.y);

        this.context.strokeStyle = "black";
        this.context.strokeRect(rect.startPoint.x, rect.startPoint.y, rect.endPoint.x, rect.endPoint.y);
    }
}