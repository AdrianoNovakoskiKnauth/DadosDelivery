const xl = require("excel4node")
const wb = new xl.Workbook()
const ws = wb.addWorksheet("NovoDelivery")
const data = require('./teste.json') //Defina AQUI o arquivo a ser convertido.
const {obterMes} = require('../myModules/myDate')
const {obterUnidade} = require('../myModules/obterUnidade')
const {obterCodigo} = require('../myModules/obterCodigo')

const headingColumnNames = [
    "Unidade",
    "Nº pedido",
    "Status",
    "Data",
    "Produto",
    "Qtd",
    "Cod. Teknisa"
    /* "Valor Uni.",
    "Incentivo",
    "Subtotal" */
]

let headingColumnIndex = 1; //diz que começará na primeira linha

//colocando nome da colunas
headingColumnNames.forEach(heading => { //passa por todos itens do array
    // cria uma célula do tipo string para cada título
    ws.cell(1, headingColumnIndex++).string(heading);
});

let rowIndex = 2; //começa na linha 2
// Colocando os dados na planilha.
data.forEach(Uni => { //passa por cada Unidade
    const nameUnidade = obterUnidade(Uni.Unidade) || "Não encontrou unidade"
    Uni.Pedidos.forEach(ped => { //Passa por cada Pedido
        const numPedido = ped.Nº
        const status = ped.status
        let dia = ped.dataHora.slice(0,2)
        let mes = obterMes(ped.dataHora.slice(3,ped.dataHora.length-6))
        let date = `${dia}/${mes}/2022`
        const itensDia = ped.Itens
        itensDia.forEach(i => {
            if (i.length === 5) {
                let columnIndex = 1; //diz para começar na primeira coluna
                ws.cell(rowIndex, columnIndex++).string(nameUnidade)
                ws.cell(rowIndex, columnIndex++).number(parseInt(numPedido))
                ws.cell(rowIndex, columnIndex++).string(status)
                ws.cell(rowIndex, columnIndex++).string(date)
                ws.cell(rowIndex, columnIndex++).string(i[0])    // Produto
                ws.cell(rowIndex, columnIndex++).number(parseInt(i[1]))    // Quantidade
                ws.cell(rowIndex, columnIndex++).string(obterCodigo(i[0]) || "Não encontrado")           //Código Teknisa
                //ws.cell(rowIndex, columnIndex++).number(parseInt(i[2].replace(".", ","))).style(styleReal)    // Valor Unitário
                //ws.cell(rowIndex, columnIndex++).number(parseInt(i[3].replace(".", ","))).style(style)    // Incentivo
                //ws.cell(rowIndex, columnIndex++).number(parseInt(i[4].replace(".", ","))).style(styleReal)    // Subtotal
                rowIndex++; //incrementa o contador para ir para a próxima linha
                //console.log(i[0] + " - "+ i[1] + " - "+i[2] + " - "+i[3] + " - "+i[4])
            }
        })
    })

});
wb.write(`Delivery.xlsx`)


