async function sleep(seg) {
  return await new Promise((resolve) => {
      setTimeout(function () {
          resolve();
      }, seg * 1000)
  })
}
var todosPedidos = []
var erroCarregar = false

async function dadosPedidos() {
  let testeErr = false
  let contadorErr = 0
  do {
      try {
          async function* asyncGenerator3() { // Função necessaria para FOR AWAIT
              let iit = 1;
              while (iit <= tdsLinhaTR.length) {
                  yield iit++;
              }
          }
          let pedido = {}
          let numPedido = await document.querySelector('h1[class="sc-gKclnd bbpaGf"] > div[class="sc-bdvvtL jRDSVZ"]')
          numPedido = await numPedido.textContent
          if (numPedido.indexOf('Concluído') !== -1) {
              pedido["status"] = "Concluído"
              pedido["Nº"] = await numPedido.replace('Concluído', "").replace('Pedido nº ', "")
          } else if (numPedido.indexOf('Cancelado') !== -1) {
              pedido["status"] = "Cancelado"
              pedido["Nº"] = await numPedido.replace('Cancelado', "").replace('Pedido nº ', "")
          }else {
            pedido["status"] = "Indeterminado"
            pedido["Nº"] = await numPedido.slice(0,4).replace('Pedido nº ', "")
            console.log(pedido["Nº"])
          }
          let dataHora = await document.querySelectorAll('span[class="sc-fKVqWL gBuhxG"]')
          dataHora = await dataHora[0].textContent
          pedido["dataHora"] = await dataHora.replace(" de ", " ").replace(" - ", " ")
          pedido["Itens"] = []
          let tdsLinhaTR = await document.querySelectorAll('table[data-testid="detail-table"] > tbody > tr') // Obtem todas as linhas dos Itens completa
          for await (let num of asyncGenerator3()) {
              let todosOsValoresDaLinha = []
              let valorTD = await tdsLinhaTR[num - 1].querySelectorAll('td') // Obtem todos os valores da linha
              await valorTD.forEach(async TD => {
                  await todosOsValoresDaLinha.push(TD.textContent)
              })
              await pedido["Itens"].push(todosOsValoresDaLinha)
          }
          await todosPedidos.push(pedido)
          testeErr = false
      } catch (err) {
          if (contadorErr == 10) {
              await console.log("Retornando a página de pedidos, total de erros = " + contadorErr)
              erroCarregar = true
              testeErr = false
              return erroCarregar
          }
          testeErr = true
          await contadorErr++
          await console.log('Erro nº: ' + contadorErr + ".  Erro = " + err)
          await sleep(1)
      }
  } while (testeErr == true)
}

async function forPedidos() {
  await sleep(2)
  listPedidos = await document.querySelectorAll('table > tbody > tr') // Obtem os elementos de paginas
  async function* asyncGenerator2() { // Função necessaria para FOR AWAIT
      let ipd = 1;
      while (ipd <= listPedidos.length) {
          yield ipd++;
      }
  }
  for await (let num of asyncGenerator2()) { // FOR em cima da quantidade de pedidos.
      do {
          await listPedidos[num - 1].click()
          await sleep(2)
          erroCarregar = await dadosPedidos()
          btnVoltar = await document.querySelectorAll('div[aria-label="Fechar notificação"]')
          await btnVoltar[0].click()
          await sleep(1)
      } while (erroCarregar == true)
  }
}

(async function forPaginas() {
  let numName = 1
  let unidadeItens = await document.querySelectorAll('span[data-testid="restaurant-profile-name"]')
  unidadeItens = await unidadeItens[0].textContent
  await console.log(unidadeItens)
  save: function baixarArquivo(filename) {
      let pedidosUnidade = {}
      pedidosUnidade["Unidade"] = unidadeItens
      pedidosUnidade["Pedidos"] = todosPedidos
      let dadosSalvar = JSON.stringify(pedidosUnidade)

      var blob = new Blob([dadosSalvar], { type: 'text/csv' });

      if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, filename);
      }
      else {
          var elem = window.document.createElement('a');
          elem.href = window.URL.createObjectURL(blob);
          elem.download = filename;
          document.body.appendChild(elem);
          elem.click();
          document.body.removeChild(elem);
      }
      return
  }
  arr = await document.querySelectorAll('li[class="sc-TBWPX jQpvbc"]') // Obtem os elementos de paginas
  btnNext = await arr[arr.length - 1].children  // Captura o botão NEXT
  pagestotal = await parseInt(arr[arr.length - 2].textContent) //Obtem já em Inteiro o total de paginas.
  await console.log("Total de páginas: " + pagestotal)
  async function* asyncGenerator() { // Função necessaria para FOR AWAIT
      let ipg = 1;                          // Trocado de 0 para 2, eliminando 1ª e ultima pagina.
      while (ipg <= pagestotal) {
          yield ipg++;
      }
  }
  for await (let num of asyncGenerator()) { // FOR em cima da quantidade de paginas.
      await console.log("Página " + num)
      await forPedidos()
      await sleep(1)
      let filename = await `Arquivo ${numName}.json`
      if (num % 10 === 0) {
          await baixarArquivo(filename)
          await numName++
          todosPedidos = await []
      }
      await btnNext[0].click()
      await sleep(1)
  }
  if (pagestotal % 10 !== 0) {
      let filename = await `Arquivo Final.json`
      await baixarArquivo(filename)
  } else {
      console.log("Download já concluído")
  }
  console.log("Fim de execução do código.")
})()