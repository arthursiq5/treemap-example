import Point from "../Graphics/Point"

export function calcMiddlePointLeftToRight(area, initialPointer, endPointer) {
    const y = endPointer.y
    const x = area / (endPointer.y - initialPointer.y)
    return new Point(x, y)
}

export function recalcStartPointLeftToRight(area, initialPointer, endPointer) {
    const y = initialPointer.y
    const x = area / (endPointer.y - initialPointer.y)
    return new Point(x, y)
}

export function calcMiddlePointUpToDown(area, initialPointer, endPointer) {
    const x = endPointer.x
    const y = area / (endPointer.x - initialPointer.x)
    return new Point(x, y)
}

export function recalcStartPointUpToDown(area, initialPointer, endPointer) {
    const x = initialPointer.x
    const y = area / (endPointer.x - initialPointer.x)
    return new Point(x, y)
}
