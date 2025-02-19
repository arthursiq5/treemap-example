import Point from "./Point";

export default class CanvaFacade {
    constructor(canva) {
        this.canva = canva
        this.context = this.canva.getContext('2d')
        this.drawnArea = 0;
        this.startPoint = new Point()
        this.endPoint = this.getDimensions()
    }

    resetCanva() {
        this.drawnArea = 0;
        this.startPoint = new Point()
        this.endPoint = this.getDimensions()
    }

    setStartPoint(newPoint) {
        const endPoint = this.getDimensions()
        this.startPoint = newPoint
        endPoint.x -= newPoint.x
        endPoint.y -= newPoint.y
        this.endPoint = endPoint
    }

    resetDimensions() {
        this.startPoint = new Point()
        this.endPoint = this.getDimensions()
    }

    getDimensions() {
        return new Point(this.canva.width, this.canva.height)
    }

    getArea() {
        const dimensions = this.getDimensions()
        return dimensions.x * dimensions.y
    }

    drawRect(rect){
        this.context.fillStyle = rect.color;
        this.context.fillRect(rect.startPoint.x, rect.startPoint.y, rect.endPoint.x, rect.endPoint.y);

        this.context.strokeStyle = "black";
        this.context.strokeRect(rect.startPoint.x, rect.startPoint.y, rect.endPoint.x, rect.endPoint.y);

        if (!!rect.data) this.drawLegend(rect)
    }

    calcFont(rect) {
        const data = rect.data
        const text = data.getTitle()

        let fontSize = 32;
        this.context.font = `${fontSize}px Arial`;

        let textWidth = this.context.measureText(text).width;
        const padding = 10;

        while (textWidth > rect.endPoint.x - padding && fontSize > 8) {
            fontSize--;
            textWidth = this.context.measureText(text).width;
        }

        return fontSize
    }

    drawLegend(rect) {
        const data = rect.data
        const fontSize = this.calcFont(rect)
        const percentage = "-10%";
        this.context.font = fontSize + 'px Arial';
        this.context.fillStyle = "black";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.shadowColor = "white";
        this.context.shadowBlur = 4;
        this.context.shadowOffsetX = 2;
        this.context.shadowOffsetY = 2;

        const centerX = rect.startPoint.x + rect.endPoint.x / 2;
        const centerY = rect.startPoint.y + rect.endPoint.y / 2;

        this.context.fillText(data.getTitle(), centerX, centerY);

        // ------------------

        // Configuração da porcentagem
        const percentageFontSize = Math.max(fontSize * 0.8, 8); // Fonte menor que o texto principal
        this.context.font = `${percentageFontSize}px Arial`;

        // Definir cor da porcentagem (vermelho para negativo, verde para positivo)
        this.context.fillStyle = percentage.includes("-") ? "#480B0B" : "#030602";

        // Espaçamento entre o texto principal e a porcentagem
        const lineSpacing = percentageFontSize + 2;

        // Desenhar a porcentagem abaixo do texto principal
        this.context.fillText(data.getPercentageStr(), centerX, centerY + lineSpacing);
        this.context.shadowColor = "transparent";
        this.context.shadowBlur = 0;
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
    }
}