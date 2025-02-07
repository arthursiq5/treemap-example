export default class Point {
    constructor(x=0, y=0) {
        this.x = x
        this.y = y
    }

    calcArea(secondPoint) {
        if (this.x < secondPoint.x || this.y < secondPoint.y){
            return secondPoint.calcArea(this);
        }
        return (this.x - secondPoint - x) * (this.y - secondPoint.y)
    }
}