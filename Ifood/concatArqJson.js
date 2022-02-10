const fs = require('fs').promises;
const diretorioArq = "./arquivosJson" // Aqui defina a pasta origem dos arquivos a ser concaternados
const arquivoDestino = "./Provisorio.json" // Aqui defina o arquivo em que será concaternado.

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
(async function concaternar() {
    let arquivoErr = ""
    try {
        let arquivos = await listarArquivosDoDiretorio(diretorioArq); // coloque o caminho do seu diretorio
        
        console.log("Total de arquivos é: " + arquivos.length)
        let arquivoAgrupado = require(arquivoDestino)
        arquivos.forEach(async e => { // Percorre todos arquivos .json
            arquivoErr = e
            console.log(e);
            let arquivoE = require(`${e}`)  // Obtem um arqui de cada vez.
            arquivoAgrupado.push(arquivoE)
        })
        arquivoAgrupado = JSON.stringify(arquivoAgrupado)
        fs.writeFile(arquivoDestino, arquivoAgrupado, (err) => {
            if (err) throw err;
            console.log('O arquivo foi criado!');
        });
        return arquivos;

    } catch {
        console.log("Gerou erro no arquivo: " + arquivoErr)
    }
})()
