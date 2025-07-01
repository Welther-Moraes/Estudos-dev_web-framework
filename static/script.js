// static/script.js

function logStatus(msg) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = msg;
}

function prepararPedido(nomePedido) {
  return new Promise((resolve, reject) => {
    const tempoPreparo = Math.floor(Math.random() * 5000) + 1000;

    logStatus(`Pedido "${nomePedido}" iniciado. Tempo estimado: ${tempoPreparo}ms`);

    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(`Faltaram ingredientes para o pedido "${nomePedido}"`);
      } else {
        resolve(`Pedido "${nomePedido}" está pronto!`);
      }
    }, tempoPreparo);
  });
}

function fazerPedido(nomePedido) {
  prepararPedido(nomePedido)
    .then(resultado => {
      logStatus(resultado);
    })
    .catch(erro => {
      logStatus('Erro: ' + erro);
    })
    .finally(() => {
      setTimeout(() => {
        logStatus('Aguardando pedido...');
      }, 2000);
    });
}

function fazerPedidosEmLote(pedidos) {
  logStatus('Fazendo vários pedidos...');

  const promessas = pedidos.map(pedido =>
    prepararPedido(pedido)
      .then(resultado => {
        console.log(resultado);
        return resultado;
      })
      .catch(erro => {
        console.error(erro);
        return erro;
      })
  );

  Promise.all(promessas)
    .then(resultados => {
      logStatus('Todos os pedidos foram processados!');
      console.log('Resultados dos pedidos:', resultados);
    });
}
