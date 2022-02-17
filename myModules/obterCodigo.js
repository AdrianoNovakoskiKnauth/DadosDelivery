const codigoProduto = require('../parameters/codigoProduto.json')

function obterCodigo (produto) {
    let codReturn = false
    /* for (i = 0; i < codigoProduto.length; i++){
        if (codigoProduto[i][produto]) {
            return codReturn = codigoProduto[i][produto]
         }
    }
    return codReturn */
    for (i in codigoProduto) {
        if (Object.keys(codigoProduto[i])[0].localeCompare(produto, undefined, { sensitivity: 'base'}) == 0) {
            return codReturn = Object.values(codigoProduto[i])[0]
        }
    }
    return codReturn
}
module.exports = {obterCodigo}