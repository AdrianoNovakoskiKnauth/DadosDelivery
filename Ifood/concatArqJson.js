const fs = require('fs').promises;
const diretorioArq = "./arquivosJson" // Aqui defina a pasta origem dos arquivos a ser concaternados
const arquivoDestino = "./provisorio.json" // Aqui defina o arquivo em que será concaternado.
const { listarArquivosDoDiretorio, sleep } = require("../myModules/app.js")
async function concaternar() {

    let arquivoAgrupado = []
    try {
        let arquivos = await listarArquivosDoDiretorio(diretorioArq); // coloque o caminho do seu diretorio
        
        await console.log("Total de arquivos é: " + arquivos.length)
        await arquivos.forEach(async e => { // Percorre todos arquivos .json
            await console.log(`${e}`);
            let arquivoE = require(`${e}`)  // Obtem um arqui de cada vez.
            await arquivoAgrupado.push(arquivoE)
            await sleep(1)
        })
        arquivoAgrupado = JSON.stringify(arquivoAgrupado)
        fs.writeFile(arquivoDestino, arquivoAgrupado, (err) => {
            if (err) throw err;
            console.log('O arquivo foi criado!');
        });
        return arquivos;

    } catch (err) {
        await console.log("Gerou erro no arquivo: " + err)
    }
}
concaternar()
