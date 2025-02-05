export default class Node {
    constructor(data = null) {
        this._children = []
        this._data = data
    }

    getData() {
        return this._data
    }

    getChild() {
        return this._children
    }

    addChild(child) {
        this._children.push(child)
    }

    addChildByData(data) {
        this.addChild(new Node(data))
    }

    getLeft() {
        const filteredChildren = this._children.filter(child => child._data !== null);
        if (filteredChildren.length > 0) {
            return filteredChildren;
        }
        return null;
    }

    getRight() {
        const filteredChildren = this._children.filter(child => child._data === null);
        if (filteredChildren.length > 0) {
            return filteredChildren.at(-1);
        }
        return null;
    }

    getLastRoot() {
        const filteredChildren = this._children.filter(child => child._data === null);
        if (filteredChildren.length > 0) {
            return filteredChildren.at(-1).getLastRoot();
        }
        return this;
    }

    sum() {
        let ans = 0
        if (!!this._data) ans += this._data.value
        this._children.forEach(child => {
            ans += child.sum()
        })
        return ans
    }
}