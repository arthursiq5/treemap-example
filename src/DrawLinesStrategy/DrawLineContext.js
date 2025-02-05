class DrawLineContext {
    constructor(strategy = null) {
        this.setStrategy(strategy)
    }

    setStrategy(strategy) {
        this._strategy = strategy
        if (!!this._strategy) {
            this._strategy.setVertical(this._vertical)
            this._strategy.setContext(this._context)
            this._strategy.setData(this._data)
            this._strategy.setStartPoint(this._startPoint)
            this._strategy.setEndPoint(this._endPoint)
        }
    }

    setVertical(vertical = true) {
        this._vertical = vertical;
        if (!!this._strategy) this._strategy.setVertical(vertical)
    }

    setContext(context) {
        this._context = context
        if (!!this._strategy) this._strategy.setContext(context)
    }

    setData(data = []) {
        this._data = data
        if (!!this._strategy) this._strategy.setData(data)
    }

    setStartPoint(startPoint) {
        this._startPoint = startPoint
        if (!!this._strategy) this._strategy.setStartPoint(startPoint)
    }

    setEndPoint(endPoint) {
        this._endPoint = endPoint
        if (!!this._strategy) this._strategy.setEndPoint(endPoint)
    }

    renderLine() {
        this._strategy.renderLine()
    }
}

export default DrawLineContext;
