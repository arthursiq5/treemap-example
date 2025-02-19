import chroma from "chroma-js";

const baseGreen = '#33691E';
const baseRed = '#B71C1C';
const white = '#FFFFFF';

export default class CalcColors {
    constructor(data) {
        this.maxPositive = Math.max(
            ...data.map(d => d.regularMarketChangePercent)
        );
        this.maxNegative = Math.min(
            ...data.map(d => d.regularMarketChangePercent)
        );
        this.minFactor = 0.1; 
    }

    getColor (percent) {
        if (percent > 0) {
            const factor = Math.max(percent / this.maxPositive, this.minFactor);
            return chroma.mix(white, baseGreen, factor).hex();
        } else if (percent < 0) {
            const factor = Math.max(Math.abs(percent / this.maxNegative), this.minFactor);
            return chroma.mix(white, baseRed, factor).hex();
        }
        return white;
    };
}