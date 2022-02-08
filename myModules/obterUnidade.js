const unidades = require('../parameters/uniades.json')
function obterUnidade (chave) {
    let unidReturn = false
    unidades.map(unid => {
        for (x in unid){
            if (unid[x] == chave){
                unidReturn = unid.teknisa
            }
        }
    })
    return unidReturn
}

module.exports = {obterUnidade}