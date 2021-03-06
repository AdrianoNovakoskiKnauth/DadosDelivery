const fs = require('fs').promises;
async function listarArquivosDoDiretorio(diretorio, arquivos) {
    if (!arquivos)
        arquivos = [];
    let listaDeArquivos = await fs.readdir(diretorio);
    for (let k in listaDeArquivos) {
        let stat = await fs.stat(diretorio + '/' + listaDeArquivos[k]);
        if (stat.isDirectory())
            await listarArquivosDoDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
        else
            arquivos.push(diretorio + '/' + listaDeArquivos[k]);
    }
    return arquivos;
}

function obterNomeArquivo (diretorio) {
    diretorio = diretorio
    diretorio = diretorio.split("/")
    diretorio = diretorio[diretorio.length-1].split(".")
    let nomeArquivo = diretorio[0]
    let extencao = diretorio[1]
    return nomeArquivo
}

module.exports = { listarArquivosDoDiretorio, obterNomeArquivo }