const formulario = document.querySelector("#formulario");
const tarefa = document.querySelector("#tarefa");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const tarefaDigitada = {
        tarefa: tarefa.value
    };

    const opcoesFetch = {
        method: 'POST',
        body: JSON.stringify(tarefaDigitada),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch('/data.json', opcoesFetch)
        .then((resposta) => {
            if (!resposta.ok) {
                throw new Error('Erro ao enviar dados para o servidor.');
            }
            return resposta.json();
        })
        .then((dados) => {
            console.log(dados);
        })
        .catch((erro) => {
            console.error(erro);
        });
});
