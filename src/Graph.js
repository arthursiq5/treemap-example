import Direction from "./DirectionEnum";
import CanvaFacade from "./Graphics/CanvaFacade";
import Point from "./Graphics/Point";
import Rect from "./Graphics/Rect";
import { calcMiddlePointLeftToRight, calcMiddlePointUpToDown, recalcStartPointLeftToRight, recalcStartPointUpToDown } from "./Helpers/CalcCoordinateHelper";
import Tree from "./Tree/Tree"

async function pauseForTwoSeconds() {
    return new Promise(resolve => setTimeout(resolve, 2000));
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
            let newStartPoint;

            if (left.direction === Direction.leftToRight) {
                middlePoint = calcMiddlePointLeftToRight(
                    this.tree.calcPercentage(left) * this.canva.getArea(),
                    startPoint,
                    this.canva.endPoint
                )
                
                newStartPoint = recalcStartPointLeftToRight(
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
                console.log(middlePoint);
                
                
                newStartPoint = recalcStartPointUpToDown(
                    this.tree.calcPercentage(left) * this.canva.getArea(),
                    startPoint,
                    this.canva.endPoint
                )
            }

            this.renderTree(left, startPoint, middlePoint)
            this.canva.setStartPoint(newStartPoint)
            counter++
        }
    }

    renderTree(tree, startPoint, endPoint) {
        console.log({desc: 'renderTree',tree, startPoint, endPoint});
        
        if (tree.direction === Direction.leftToRight) {
            this.renderTreeLeftToRight(tree, startPoint, endPoint)
        } else {
            this.renderTreeUpToDown(tree, startPoint, endPoint)
        }
    }

    renderTreeLeftToRight(tree, startPoint, endPoint) {
        const coordinates = this.getDrawCoordinatesToTreeLeftToRight(tree, startPoint, endPoint)
        coordinates.forEach(rect => setTimeout(this.canva.drawRect(rect), 3000));

    }

    renderTreeUpToDown(tree, startPoint, endPoint) {
        const coordinates = this.getDrawCoordinatesToTreeUpToDown(tree, startPoint, endPoint)
        coordinates.forEach(rect => setTimeout(this.canva.drawRect(rect), 3000));
    }

    getDrawCoordinatesToTreeUpToDown(tree, startPoint, endPoint) {
        const areaTotal = (endPoint.y - startPoint.y) * (endPoint.x * startPoint.x)
        const sumTotal = tree.sum()
        let currentPoint = new Point(startPoint.x, startPoint.y)
        
        const drawCoordinates = tree.root.getChild().map(node => {
            const areaNode = (node.sum() * this.canva.getArea()) / this.tree.sum()

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
            console.log(rect)

            return rect
        })

        return drawCoordinates;
    
    }

    getDrawCoordinatesToTreeLeftToRight(tree, startPoint, endPoint) {

        console.log({desc: 'getDrawCoordinatesToLeftToRight', startPoint, endPoint});

        const areaTotal = (endPoint.y - startPoint.y) * (endPoint.x * startPoint.x)
        const sumTotal = tree.sum()
        let currentPoint = new Point(startPoint.x, startPoint.y)
        
        const drawCoordinates = tree.root.getChild().map(node => {
            const areaNode = (node.sum() * this.canva.getArea()) / this.tree.sum()

            const endPointSquare = calcMiddlePointUpToDown(
                areaNode,
                currentPoint,
                endPoint
            )
            const rect = new Rect(currentPoint, endPointSquare, node.getData().color)
            currentPoint = recalcStartPointUpToDown(
                areaNode,
                currentPoint,
                endPointSquare
            )
            return rect
        })

        console.log({desc: 'getDrawCoordinatesToLeftToRight ans', drawCoordinates});
        
        return drawCoordinates;
    
    }
}