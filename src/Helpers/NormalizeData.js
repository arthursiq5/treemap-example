import Value from "../Model/Value"
import CalcColors from "./CalcColors"

export function normalize (data, order = true) {
    const calcColors = new CalcColors(data)
    let ordenedData
    if (!!order) {
        ordenedData = data.sort((b, a) => a.regularMarketVolume - b.regularMarketVolume)
    }

    const normalizedData = ordenedData.map(element => {
        return new Value(
            element.longName,
            element.symbol,
            element.regularMarketVolume,
            element.regularMarketChangePercent,
            calcColors.getColor(element.regularMarketChangePercent)
        )
    });
    return normalizedData;
}
