const xl = require("excel4node")
const wb = new xl.Workbook()
const ws = wb.addWorksheet("NovoDelivery")
const data = require('./provisorio.json') //Defina AQUI o arquivo a ser convertido.
const { obterProduto, obterUnidade, obterMes } = require('../myModules/app')
const readline = require('readline')


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

let headingColumnIndex = 1
headingColumnNames.forEach(heading => {
    ws.cell(1, headingColumnIndex++).string(heading)
})
let rowIndex = 2;
data.forEach(Uni => {
    let itensDescartados = []
    const nameUnidade = obterUnidade(Uni.Unidade) || "Não encontrou unidade"
    Uni.Pedidos.forEach(ped => {
        const numPedido = ped.Nº
        let status = ped.status ? `${ped.status}` : "Indeterminado"
        let dia = ped.dataHora.slice(0, 2)
        let mes = obterMes(ped.dataHora.slice(3, ped.dataHora.length - 6))
        let date = `${dia}/${mes}/2022`
        const itensDia = ped.Itens
        itensDia.forEach(i => {
            if (i.length === 5) {
                let descProduto = i[0]
                descProduto = descProduto.replace("Este item foi cancelado.", "")
                    .replace("Este sub item foi cancelado.", "")
                    .replace("Este item foi cancelado", "")                
                let codProduto = obterProduto(descProduto, "codigo")
                if (codProduto != "Molhos" && codProduto != "Adicional" && codProduto != false) {
                    let columnIndex = 1; //diz para começar na primeira coluna
                    ws.cell(rowIndex, columnIndex++).string(nameUnidade)
                    ws.cell(rowIndex, columnIndex++).number(parseInt(numPedido) || 999999)
                    ws.cell(rowIndex, columnIndex++).string(status)
                    ws.cell(rowIndex, columnIndex++).string(date)
                    ws.cell(rowIndex, columnIndex++).string(descProduto)    // Produto
                    ws.cell(rowIndex, columnIndex++).number(parseInt(i[1]))    // Quantidade
                    ws.cell(rowIndex, columnIndex++).string(codProduto)           //Código Teknisa
                    //ws.cell(rowIndex, columnIndex++).number(parseInt(i[2].replace(".", ","))).style(styleReal)    // Valor Unitário
                    //ws.cell(rowIndex, columnIndex++).number(parseInt(i[3].replace(".", ","))).style(style)    // Incentivo
                    //ws.cell(rowIndex, columnIndex++).number(parseInt(i[4].replace(".", ","))).style(styleReal)    // Subtotal
                    rowIndex++; //incrementa o contador para ir para a próxima linha
                } else if(codProduto == false) {
                    console.log(i[0]) // Descrição do produto
                }
            } 
        })
    })
});
wb.write(`Delivery.xlsx`)


