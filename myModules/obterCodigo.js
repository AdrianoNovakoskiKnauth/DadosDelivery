const codigoProduto = require('../parameters/codigoProduto.json')

function obterCodigo (produto) {
    let codReturn = false
    for (i = 0; i < codigoProduto.length; i++){
        if (codigoProduto[i][produto]) {
            return codReturn = codigoProduto[i][produto]
         }
    }
    return codReturn
}
module.exports = {obterCodigo}