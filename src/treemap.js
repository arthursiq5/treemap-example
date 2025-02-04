const Treemap = (function() {
    'use strict';
    let canva;
    let context;
    const calcSidehByArea = (area, side) => area / side
    const calcSide = (startPoint, endPoint, area, vertical) => {
        let side = vertical ? (endPoint.y - startPoint.y) : (endPoint.x - startPoint.x)
        return calcSidehByArea(area, side)
    }
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
            let middlePoint = {x: canva.width / 2, y: canva.width}
            const areaTotal = this._data.reduce((sum, item) => sum + item.value, 0)
            const canvaArea = (canva.width * canva.height);
            let currentArea = 0.5;
            let occupiedArea = 0
            let isFirstLoop = true;

            for (const item of this._data) {
                if (currentLine.length === 0) {
                    currentLine.push(item);
                    continue;
                }
                const currentLineSum = currentLine.reduce((sum, item) => sum + item.value, 0)
                const lineArea = (currentLineSum + item.value) / areaTotal
                console.log(lineArea);
                console.log(currentArea)
                
                if (lineArea > currentArea) {
                    matrix.push(currentLine)
                    if (isFirstLoop) {
                        this.renderLine(currentLine, vertical, startPoint, middlePoint)
                        isFirstLoop = false;
                    }
                    currentLine = [item];
                    currentArea *= 0.5;
                    console.log('maior que');
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
                    console.log('igual a');
                    continue;
                }
                currentLine.push(item)
            }

            console.log(currentLine)
            console.log(matrix)


        }

        renderLine(data, vertical, startPoint, endPoint) {
            data.forEach(item => {
                context.fillStyle = item.color;
                context.fillRect(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

                context.strokeStyle = "black";
                context.strokeRect(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
            });
        }
    }

    return Treemap;
})()

export default Treemap;