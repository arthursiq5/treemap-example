class AbstractDrawLineStrategy {

    constructor(context, data, vertical, startPoint, endPoint) {
        this._context = context
        this._data = data
        this._vertical = vertical
        this._startPoint = startPoint
        this._endPoint = endPoint
    }

    getDrawCoordinates(area, startPoint, middlePoint) {
        const direction = this._vertical? 'y' : 'x'
        const fixedSide = this._vertical ? 'x' : 'y'
        const side = middlePoint[fixedSide] - startPoint[fixedSide]
        const lineToDraw = area / side
        const drawPoints = {}
        drawPoints[fixedSide] = middlePoint[fixedSide]
        drawPoints[direction] = lineToDraw

        return drawPoints
    }

    renderLine() {
        let startPoint = this._startPoint;
        let drawPointsDebug = []
        const calcNewStartPoint = (startPoint, middlePoint) => {
            const direction = this._vertical? 'y' : 'x'
            const fixedSide = this._vertical ? 'x' : 'y'
            const drawPoints = {}
            drawPoints[fixedSide] = startPoint[fixedSide]
            drawPoints[direction] = middlePoint[direction]

            return drawPoints
        }
        this._data.forEach(item => {
            const pointToDraw = this.getDrawCoordinates(item.area, startPoint, this._endPoint)
            drawPointsDebug.push({item,startPoint, pointToDraw})
            this.renderItem(item, startPoint, pointToDraw)
            startPoint = calcNewStartPoint(startPoint, pointToDraw)
        });
    }

    renderItem(item, startPoint, endPoint) {
        const i = {item, startPoint, endPoint}

        this._context.fillStyle = item.color;
        this._context.fillRect(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

        this._context.strokeStyle = "black";
        this._context.strokeRect(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
    }
}

export default AbstractDrawLineStrategy