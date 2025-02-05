import AbstractDrawLineStrategy from "./DrawLinesStrategy/AbstractDrawLineStrategy";

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
                        (new AbstractDrawLineStrategy(context,currentLine,vertical,startPoint,middlePoint)).renderLine()
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
                        (new AbstractDrawLineStrategy(context,currentLine,vertical,startPoint,middlePoint)).renderLine()
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