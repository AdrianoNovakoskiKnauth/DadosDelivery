const codigoProduto = require('../parameters/codigoProduto.json')

function obterCodigo (produto) {
    let codReturn = false
    for (i in codigoProduto) {
        if (Object.keys(codigoProduto[i])[0].localeCompare(produto, undefined, { sensitivity: 'base'}) == 0) {
            return codReturn = Object.values(codigoProduto[i])[0]
        }
    }
    return codReturn
}
module.exports = {obterCodigo}