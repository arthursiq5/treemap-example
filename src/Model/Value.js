export default class Value {
    constructor(name, symbol, value, percentage = 0, color = '#fff') {
        this.name = name
        this.symbol = symbol
        this.value = value
        this.percentage = percentage
        this.color = color;
    }

    getTitle() {
        return this.name.substring(0, 15) + ' (' + this.symbol + ')'
    }

    getPercentageStr() {
        return `${this.percentage.toFixed(3)}%`
    }

    static buildFromObject(obj) {
        return new Value(
            obj.name,
            obj.symbol,
            obj.value,
            obj.percentage,
            obj.color
        )
    }
}