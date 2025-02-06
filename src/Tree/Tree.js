import Direction from "../DirectionEnum"
import Node from "./Node"

export default class Tree {
    constructor(root = null, direction = Direction.leftToRight) {
        this.root = root
        this.direction = Direction.leftToRight
    }

    static buildFromArray(data, direction = Direction.leftToRight) {
        let root = new Node()
        let dataSet = JSON.parse(JSON.stringify(data))
        const dataSum = data.reduce((sum, el) => el.value + sum, 0)
        let sumLimit = dataSum * 0.5

        while(dataSet.length > 0) {
            let currentNodeData = []
            let dataSumLoop = 0;
            while(true) {
                if (dataSet.length === 0) break;
                if ((dataSumLoop + dataSet[0].value) > sumLimit && currentNodeData.length > 0) break;
                const element = dataSet.shift()
                currentNodeData.push(element)
                dataSumLoop += element.value
            }
            currentNodeData.forEach(el => root.getLastRoot().addChildByData(el))
            if (dataSet.length > 0) root.getLastRoot().addChild(new Node())
            sumLimit = (dataSum - root.sum()) * 0.5
        }

        return new Tree(root)
    }

    getDepth(root = this.root, depth = 0) {
        if (!!root.getData()) return depth;
        const depths = root.getChild().map(el => this.getDepth(el, depth + 1))
        
        return Math.max(...depths)
    }

    sum() {
        return this.root.sum()
    }

    sliceTree() {
        const nextDirection = this.direction == Direction.leftToRight ? Direction.upToDown : Direction.leftToRight;
        const leftRootArr = this.root.getLeft()
        const leftRoot = new Node();
        leftRoot._children = leftRootArr
        const rightRoot = this.root.getRight();
        
        let left = !!leftRoot ? new Tree(leftRoot, this.direction) : null
        let right = !!rightRoot ? new Tree(rightRoot, nextDirection) : null
        
        return { left, right }
    }

    calcPercentage(tree) {
        return tree.sum() / this.sum()
    }
}