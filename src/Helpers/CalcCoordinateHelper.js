const getDirection = (vertical) => vertical ? 'y' : 'x'
const getFixedSize = (vertical) => vertical ? 'x' : 'y'

/**
 * 
 * calculate coordinates to draw
 * 
 * @param number area
 * @param bool vertical 
 * @param {x, y} startPoint 
 * @param {x, y} middlePoint 
 * @returns 
 */
export function getDrawCoordinates(area, vertical, startPoint, middlePoint) {
    const direction = getDirection(vertical)
    const fixedSide = getFixedSize(vertical)
    const side = middlePoint[fixedSide] - startPoint[fixedSide]
    const lineToDraw = area / side
    const drawPoints = {}
    drawPoints[fixedSide] = middlePoint[fixedSide]
    drawPoints[direction] = lineToDraw

    return drawPoints
}

export function calcNewStartPoint (vertical, startPoint, middlePoint) {
    const direction = getDirection(vertical)
    const fixedSide = getFixedSize(vertical)
    const drawPoints = {}
    drawPoints[fixedSide] = startPoint[fixedSide]
    drawPoints[direction] = middlePoint[direction]

    return drawPoints
}