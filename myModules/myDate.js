function imprirmirQtdPedidos() {
    const jsonAgrupado = require('./teste.json')
    let contadorPedidos = 0
    jsonAgrupado.forEach(unidArq => {
        let qtdPedidos = unidArq.Pedidos.length
        contadorPedidos = contadorPedidos + qtdPedidos
    })
    console.log("Total de pedidos: " + contadorPedidos)
}
//imprirmirQtdPedidos()

function obterDataHoraAtual(tipoRetorno = 1) {
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = String(data.getFullYear());
    let horas = String(data.getHours()).padStart(2, "0");
    let minutos = String(data.getMinutes()).padStart(2, "0");
    let segundos = String(data.getSeconds()).padStart(2, "0");
    let valorRetorno = null

    switch (tipoRetorno) {
        case 1: // Obter apenas data no formato (DD/MM/YYYY HH:MM:SS)
            valorRetorno = `${dia}-${mes}-${ano} ${horas}:${minutos}:${segundos}`;
            break
        case 2: // Obter apenas data no formato (DD/MM/YYYY)
            valorRetorno = `${dia}-${mes}-${ano}`;
            break
        case 3: // Obter apenas hora no formato (HH:MM:SS)
            valorRetorno = `${horas}:${minutos}:${segundos}`;
            break
        case 4: // Obter dia, mês e ano separados e uma array.
            valorRetorno = [dia, mes, ano];
            break
        case 5: // Obter horas, minutos e segundos separados e uma array.
            valorRetorno = [horas, minutos, segundos];
            break
    }
    return valorRetorno // TODO RETORNO SERÁ SEMPRE EM STRING
}

function obterMes(valor){
   const baseMes = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro"
   ]

    for( i=0; i< baseMes.length; i++){
        if (baseMes[i] == valor){
            if ( i + 1 < 10){
                i = `0${i+1}`
            }else {
                i = `${i+1}`
            }
            return i
        }
    }

}

module.exports = {obterDataHoraAtual, obterMes }
//let retorno1 = obterDataHoraAtual() // Sem parametro retorna data e hora atual completa.

