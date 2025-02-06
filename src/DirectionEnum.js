class Direction {
    static leftToRight = new Direction('leftToRight')
    static upToDown = new Direction('upToDown')

    constructor(name) {
        this.name = name
    }

    toString() {
        return this.name
    }
}

export default Direction;
