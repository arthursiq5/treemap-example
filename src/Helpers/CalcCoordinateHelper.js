import Point from "../Graphics/Point"

export function calcMiddlePointLeftToRight(area, initialPointer, endPointer) {
    const y = endPointer.y
    const x = area / endPointer.y
    return new Point(x, y)
}

export function recalcStartPointLeftToRight(area, initialPointer, endPointer) {
    const x = area / endPointer.y
    return new Point(x, initialPointer.y)
}

export function calcMiddlePointUpToDown(area, initialPointer, endPointer) {
    const y = area / endPointer.x
    return new Point(endPointer.x, y)
}

export function recalcStartPointUpToDown(area, initialPointer, endPointer) {
    const x = initialPointer.x
    const y = area / endPointer.x
    return new Point(x, y)
}
