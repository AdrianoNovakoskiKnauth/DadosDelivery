const xl = require("excel4node")
const wb = new xl.Workbook()
const ws = wb.addWorksheet("NovoDelivery")
const data = require('./provisorio.json') //Defina AQUI o arquivo a ser convertido.
const {obterMes} = require('../myModules/myDate')
const {obterUnidade} = require('../myModules/obterUnidade')
const {obterCodigo} = require('../myModules/obterCodigo')
const readline = require('readline')

function escolhaRelatorio (){
    let resp = ""
    let leitor = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    leitor.question("\n\tDigite o número da opção de arquivo deseja gerar?\n\n\t 1 - Detalhado (Unidade, Pedido, Status, Data, Produto, Quantidade, Código)" +
    "\n\t 2 - Resumido (Unidade, Data, Produto, Quantidade, Código)\n\t Digite: ", function(answer) {
        resp = answer;
        leitor.close();
    })
    if (resp != "1" || resp != "2") {
        console.log("Entrada inválida! \n Digite apenas os número das opções.")
    }
}
escolhaRelatorio()

function gerarExcel(){
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
        let itensDescartados = []
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
                    let codProduto = obterCodigo(i[0])
                    if (codProduto != "Molhos" && codProduto != "Adicional" && codProduto != false){
                        let columnIndex = 1; //diz para começar na primeira coluna
                        ws.cell(rowIndex, columnIndex++).string(nameUnidade)
                        ws.cell(rowIndex, columnIndex++).number(parseInt(numPedido))
                        ws.cell(rowIndex, columnIndex++).string(status)
                        ws.cell(rowIndex, columnIndex++).string(date)
                        ws.cell(rowIndex, columnIndex++).string(i[0])    // Produto
                        ws.cell(rowIndex, columnIndex++).number(parseInt(i[1]))    // Quantidade
                        ws.cell(rowIndex, columnIndex++).string(codProduto)           //Código Teknisa
                        //ws.cell(rowIndex, columnIndex++).number(parseInt(i[2].replace(".", ","))).style(styleReal)    // Valor Unitário
                        //ws.cell(rowIndex, columnIndex++).number(parseInt(i[3].replace(".", ","))).style(style)    // Incentivo
                        //ws.cell(rowIndex, columnIndex++).number(parseInt(i[4].replace(".", ","))).style(styleReal)    // Subtotal
                        rowIndex++; //incrementa o contador para ir para a próxima linha
                        //console.log(i[0] + " - "+ i[1] + " - "+i[2] + " - "+i[3] + " - "+i[4])
                    } else {
                        let item = []
                        item.push(i[0]) // Descrição do produto
                        codProduto ? item.push(codProduto) : item.push("Item não encontrado")
                        itensDescartados.push(item)
                    }
                }
            })
        })
        itensDescartados.forEach( item => {
            console.log(item)
        })
    });
    wb.write(`Delivery.xlsx`)
}


