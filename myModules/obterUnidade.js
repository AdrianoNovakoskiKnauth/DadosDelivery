const unidades = require('../parameters/uniades.json')
function obterUnidade (chave) {
    let unidReturn = false
    let contad = 0
    unidades.map(unid => {
        for (x in unid){
            contad++
            if (unid[x] == chave){
                unidReturn = unid.teknisa
            }
        }
    })
    return unidReturn
}

module.exports = {obterUnidade}