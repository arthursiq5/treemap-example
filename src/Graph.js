import Direction from "./DirectionEnum";
import { calcMiddlePointLeftToRight, calcMiddlePointUpToDown, recalcStartPointLeftToRight, recalcStartPointUpToDown } from "./Helpers/CalcCoordinateHelper";
import Tree from "./Tree/Tree"

async function pauseForTwoSeconds() {
    return new Promise(resolve => setTimeout(resolve, 2000));
}

export class Rect {
    constructor(startPoint, endPoint, color) {
        this.startPoint = startPoint
        this.endPoint = endPoint
        this.color = color
    }
}

export class Point {
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

export class CanvaFacade {
    constructor(canva) {
        this.canva = canva
        this.context = this.canva.getContext('2d')
        this.drawnArea = 0;
        this.startPoint = new Point()
        this.endPoint = new Point(800, 600)//this.canva.width, this.canva.height)
        
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

export default class Graph {
    constructor (canva, data = []) {
        this.canva = new CanvaFacade(canva)
        this.tree = Tree.buildFromArray(data)
        this.canva.drawRect(new Rect(this.canva.startPoint, this.canva.endPoint, '#ccc'))
    }

    setData(data) {
        this.tree = Tree.buildFromArray(data)
    }

    async render() {
        let currentTree = this.tree
        let counter = 0
        
        while(!!currentTree && counter <= 1) {
            const slicedTree = currentTree.sliceTree()
            const left = slicedTree.left
            const right = slicedTree.right
            currentTree = right
            const startPoint = this.canva.startPoint
            let middlePoint;
            if (left.direction === Direction.leftToRight) {
                middlePoint = calcMiddlePointLeftToRight(
                    this.tree.calcPercentage(left) * this.canva.getArea(),
                    startPoint,
                    this.canva.endPoint
                )
                
                this.canva.startPoint = recalcStartPointLeftToRight(
                    this.tree.calcPercentage(left) * this.canva.getArea(),
                    startPoint,
                    this.canva.endPoint
                )
            } else {
                middlePoint = calcMiddlePointUpToDown(
                    this.tree.calcPercentage(left) * this.canva.getArea(),
                    startPoint,
                    this.canva.endPoint
                )
                
                this.canva.startPoint = recalcStartPointUpToDown(
                    this.tree.calcPercentage(left) * this.canva.getArea(),
                    startPoint,
                    this.canva.endPoint
                )
            }

            this.renderTree(left, startPoint, middlePoint)
            counter++
        }
    }

    renderTree(tree, startPoint, endPoint) {
        if (tree.direction === Direction.leftToRight) {
            this.renderTreeLeftToRight(tree, startPoint, endPoint)
        } else {
            this.renderTreeUpToDown(tree, startPoint, endPoint)
        }
        //this.renderTreeUpToDown(tree, startPoint, endPoint)
    }

    renderTreeLeftToRight(tree, startPoint, endPoint) {
        this.canva.drawRect(new Rect(startPoint, endPoint, 'red'))
        const coordinates = this.getDrawCoordinatesToTreeLeftToRight(tree, startPoint, endPoint)
        coordinates.forEach(rect => setTimeout(this.canva.drawRect(rect), 3000));

    }

    renderTreeUpToDown(tree, startPoint, endPoint) {
        this.canva.drawRect(new Rect(startPoint, endPoint, 'purple'))
        const coordinates = this.getDrawCoordinatesToTreeUpToDown(tree, startPoint, endPoint)
        coordinates.forEach(rect => setTimeout(this.canva.drawRect(rect), 3000));
    }

    getDrawCoordinatesToTreeUpToDown(tree, startPoint, endPoint) {
        const areaTotal = (endPoint.y - startPoint.y) * (endPoint.x * startPoint.x)
        const sumTotal = tree.sum()
        let currentPoint = new Point(startPoint.x, startPoint.x)
        
        const drawCoordinates = tree.root.getChild().map(node => {
            const areaNode = (node.sum() * this.canva.getArea()) / this.tree.sum()
            console.log(areaNode)

            const endPointSquare = calcMiddlePointLeftToRight(
                areaNode,
                currentPoint,
                endPoint
            )
            const rect = new Rect(currentPoint, endPointSquare, node.getData().color)
            currentPoint = recalcStartPointLeftToRight(
                areaNode,
                currentPoint,
                endPoint
            )
            return rect
        })

        console.log(drawCoordinates);
        
        
        return drawCoordinates;
    
    }

    getDrawCoordinatesToTreeLeftToRight(tree, startPoint, endPoint) {
        const areaTotal = (endPoint.y - startPoint.y) * (endPoint.x * startPoint.x)
        const sumTotal = tree.sum()
        let currentPoint = new Point(startPoint.x, startPoint.x)
        
        const drawCoordinates = tree.root.getChild().map(node => {
            const areaNode = (node.sum() * this.canva.getArea()) / this.tree.sum()
            console.log(areaNode)

            const endPointSquare = calcMiddlePointUpToDown(
                areaNode,
                currentPoint,
                endPoint
            )
            const rect = new Rect(currentPoint, endPointSquare, node.getData().color)
            currentPoint = recalcStartPointUpToDown(
                areaNode,
                currentPoint,
                endPoint
            )
            return rect
        })

        console.log(drawCoordinates);
        
        
        return drawCoordinates;
    
    }
}