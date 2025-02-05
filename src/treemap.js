import AbstractDrawLineStrategy from "./DrawLinesStrategy/AbstractDrawLineStrategy";
import ColumnDrawLineStrategy from "./DrawLinesStrategy/ColumnDrawLineStrategy";
import DrawLineContext from "./DrawLinesStrategy/DrawLineContext";

const Treemap = (function() {
    'use strict';
    let canva;
    let context;

    class Treemap {
        constructor(data, canvas) {
            canva = canvas
            context = canva.getContext('2d')
            this._data = data;
        }

        render() {
            
            let matrix = []
            let currentLine = []
            let vertical = true;
            let startPoint = {y: 0, x: 0}
            let endPoint = {y: canva.height, x: canva.width}
            let middlePoint = {x: canva.width * 0.45, y: canva.height}
            const areaTotal = this._data.reduce((sum, item) => sum + item.value, 0)
            const canvaArea = (canva.width * canva.height);
            let currentArea = 0.5;
            let isFirstLoop = true;
            const strCtx = new DrawLineContext()
            strCtx.setContext(context)

            const draw = (data, vertical, start, end) => {
                const strategy = /*vertical ?*/ new ColumnDrawLineStrategy() /*: new LineDrawLineStrategy() */
                strCtx.setStrategy(strategy)
                strCtx.setData(data)
                strCtx.setVertical(vertical)
                strCtx.setStartPoint(start)
                strCtx.setEndPoint(end)
                
                strCtx.renderLine()
            }

            context.fillStyle = '#ccc'
            context.fillRect(0, 0, endPoint.x, endPoint.y);

            const calcItemArea = (item) => (item.value * canvaArea) / areaTotal

            for (const item of this._data) {
                item.area = calcItemArea(item)
                if (currentLine.length === 0) {
                    currentLine.push(item);
                    continue;
                }
                const currentLineSum = currentLine.reduce((sum, item) => sum + item.value, 0)
                const lineArea = (currentLineSum + item.value) / areaTotal
                
                if (lineArea > currentArea) {
                    matrix.push(currentLine)
                    if (isFirstLoop) {
                        draw(currentLine, vertical, startPoint, middlePoint)
                        isFirstLoop = false;
                    }
                    currentLine = [item];
                    currentArea *= 0.5;
                    continue;
                }
                if (lineArea === currentArea) {
                    currentLine.push(item)

                    matrix.push(currentLine)
                    if (isFirstLoop) {
                        draw(currentLine, vertical, startPoint, middlePoint)
                        isFirstLoop = false;
                    }
                    
                    currentLine = []
                    currentArea *= 0.5;
                    continue;
                }
                currentLine.push(item)
            }

        }
    }

    return Treemap;
})()

export default Treemap;