import AbstractDrawLineStrategy from "./AbstractDrawLineStrategy";

class ColumnDrawLineStrategy extends AbstractDrawLineStrategy {
    constructor() {
        super().setVertical(true)
    }
}

export default ColumnDrawLineStrategy;