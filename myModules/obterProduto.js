const codigoProduto = require('../parameters/baseDeProduto.json')

function obterProduto (produto, retorno = "codigo") { //
    let codReturn = false
    for (i in codigoProduto) {
        if (Object.keys(codigoProduto[i])[0].localeCompare(produto, undefined, { sensitivity: 'base'}) == 0) {
            return codReturn = Object.values(codigoProduto[i])[0][retorno]
        }
    }
    return codReturn
}
module.exports = {obterProduto}