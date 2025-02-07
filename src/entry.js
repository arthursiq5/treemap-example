import Graph, { CanvaFacade } from "./Graph"

const canva = document.getElementById('chart')

const data = [
    { name: 'Maçã', value: 30, color: '#00ff55' },
    { name: 'Banana', value: 15, color: '#ffff55' },
    { name: 'Tutti Fruti', value: 15, color: '#ff00ff' },
    { name: 'Uva', value: 15, color: '#750095' },
    { name: 'Passas', value: 15, color: '#00ff99' },
    { name: 'Milho', value: 10, color: '#ddfe99' },
]

const g = new Graph(canva, data)
g.render()
