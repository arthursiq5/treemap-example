export default class Rect {
    constructor(startPoint, endPoint, color) {
        this.startPoint = startPoint
        this.endPoint = endPoint
        this.color = color
    }
}

export class DataRect extends Rect {
    constructor(startPoint, endPoint, color, data) {
        super(startPoint, endPoint, color)
        this.data = data
    }
}
