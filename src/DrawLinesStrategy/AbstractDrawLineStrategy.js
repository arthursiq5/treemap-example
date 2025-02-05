import { calcNewStartPoint, getDrawCoordinates } from "../Helpers/CalcCoordinateHelper"

class AbstractDrawLineStrategy {

    setVertical(vertical = true) {
        this._vertical = vertical;
    }

    setContext(context) {
        this._context = context
    }

    setData(data = []) {
        this._data = data
    }

    setStartPoint(startPoint) {
        this._startPoint = startPoint
    }

    setEndPoint(endPoint) {
        this._endPoint = endPoint
    }

    checkAllAttributesSetted() {
        //if (!this._context || !this._startPoint || this._endPoint) throw new Error('Elements are not setted')
    }

    renderLine() {
        console.log(this._data)
        this.checkAllAttributesSetted()
        let startPoint = this._startPoint;
        this._data.forEach(item => {
            const pointToDraw = getDrawCoordinates(item.area, this._vertical, startPoint, this._endPoint)
            this.renderItem(item, startPoint, pointToDraw)
            startPoint = calcNewStartPoint(this._vertical, startPoint, pointToDraw)
        });
    }

    renderItem(item, startPoint, endPoint) {
        this._context.fillStyle = item.color;
        this._context.fillRect(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

        this._context.strokeStyle = "black";
        this._context.strokeRect(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
    }
}

export default AbstractDrawLineStrategy