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

        getDrawCoordinates(area, vertical, startPoint, middlePoint) {
            const direction = 'y'
            const fixedSide = 'x'
            const side = middlePoint[fixedSide] - startPoint[fixedSide]
            const lineToDraw = area / side
            const drawPoints = {}
            drawPoints[fixedSide] = middlePoint[fixedSide]
            drawPoints[direction] = lineToDraw

            return drawPoints
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
                        this.renderLine(currentLine, vertical, startPoint, middlePoint)
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
                        this.renderLine(currentLine, vertical, startPoint, middlePoint)
                        isFirstLoop = false;
                    }
                    
                    currentLine = []
                    currentArea *= 0.5;
                    continue;
                }
                currentLine.push(item)
            }

        }

        renderLine(data, vertical, startPoint, endPoint) {
            let startPoints = startPoint;
            let drawPointsDebug = []
            const calcNewStartPoint = (startPoint, middlePoint) => {
                const direction = 'y'
                const fixedSide = 'x'
                const drawPoints = {}
                drawPoints[fixedSide] = startPoint[fixedSide]
                drawPoints[direction] = middlePoint[direction]

                return drawPoints
            }
            let drawed = false;
            data.forEach(item => {
                const pointToDraw = this.getDrawCoordinates(item.area, vertical, startPoints, endPoint)
                drawPointsDebug.push({item,startPoints, pointToDraw})
                this.renderItem(item, startPoints, pointToDraw)
                startPoints = calcNewStartPoint(startPoints, pointToDraw)
            });
            
        }

        renderItem(item, startPoint, endPoint) {
            const i = {item, startPoint, endPoint}

            context.fillStyle = item.color;
            context.fillRect(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

            context.strokeStyle = "black";
            context.strokeRect(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
        }
    }

    return Treemap;
})()

export default Treemap;