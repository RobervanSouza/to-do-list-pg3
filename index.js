// 3 seleção dos elementos
const formlario = document.querySelector("#formulario");
const formInput = document.querySelector("#form-input");
const listaTarefas = document.querySelector("#lista-de-tarefas");
const formEditar = document.querySelector("#formulario-editar");
const formEditeInput = document.querySelector("#form-edit-input");
const btnCancelar = document.querySelector("#cancelar");
const pesquisarInput = document.querySelector("#input-pesquisar");
const btnLimparPesquisa = document.querySelector("#limpar-pesquisa");
let tarefaAntiga;
let pegaTarefa;

//3 função
const valorDaInput = (texto) => {
    const divInput = document.createElement('div');
    divInput.classList.add("todas-tarefas");

    const nomeTarefa = document.createElement("h4");
    nomeTarefa.innerText = texto;
    divInput.appendChild(nomeTarefa);
    
    const botaoFinalizar = document.createElement("button");
    botaoFinalizar.classList.add("finalizar");
    botaoFinalizar.innerHTML = '<i class="fa-solid fa-check"></i>'
    divInput.appendChild(botaoFinalizar);

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("editar");
    botaoEditar.innerHTML = '<i class="fa-solid fa-pen"></i>'
    divInput.appendChild(botaoEditar);
    const botaoRemover = document.createElement("button");
    botaoRemover.classList.add("remover");
    botaoRemover.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    divInput.appendChild(botaoRemover);
    
    listaTarefas.appendChild(divInput)
    
    formInput.value = ""
    formInput.focus();
}

//3 fuções
const mostraFormularioEditar = () => {
    formEditar.classList.toggle("prontas");
    formlario.classList.toggle("prontas");
    listaTarefas.classList.toggle("prontas");
}

const tarefaAtualizada = (tarefas) => {
    const todasTarefas = document.querySelectorAll(".todas-tarefas")
    todasTarefas.forEach((todas) => {
        let titulos = todas.querySelector("h4");
        if(titulos.innerText === tarefaAntiga){
            titulos.innerText = tarefas;
        }
    })
}
const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todas-tarefas");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h4").innerText.toLowerCase();

        todo.style.display = "flex";

        console.log(todoTitle);

        if (!todoTitle.includes(search)) {
            todo.style.display = "none";
        }
    });
};

pesquisarInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchedTodos(search);
});




// 3 eventos
formlario.addEventListener("submit", (e) =>{
    e.preventDefault();
   const valorDigitado = formInput.value;
   
if(valorDigitado){
    valorDaInput(valorDigitado)
}
})

btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    mostraFormularioEditar();
})

formEditar.addEventListener("submit", (e) => {
    e.preventDefault();
    const valorEditado = formEditeInput.value;

    if(valorEditado){
        tarefaAtualizada(valorEditado);

    }
    mostraFormularioEditar();
})

// 3 eventos >> como identificar o click nos botoes


document.addEventListener("click", (e) => {
    const eventoFinalizar = e.target;
    const todosEventos = eventoFinalizar.closest("div");
   
    if (todosEventos && todosEventos.querySelector("h4")){
        pegaTarefa = todosEventos.querySelector("h4").innerText;
    }

    if (eventoFinalizar.classList.contains("finalizar")) {
        todosEventos.classList.toggle("feita");
        
    }
    
    if (eventoFinalizar.classList.contains("remover")) {
        const btnsRemover = document.querySelectorAll(".remover");
        btnsRemover.forEach((btnRemover) => {
            btnRemover.addEventListener("click", (event) => {
                const divTodasTarefas = event.currentTarget.closest(".todas-tarefas");
                if (divTodasTarefas.classList.contains("feita")) {
                    divTodasTarefas.remove();
                } else {
                    mostrarAlerta("Remove apenas tarefas concluidas", btnRemover);
                }
            });
        });
    }
    
    if (eventoFinalizar.classList.contains("editar")) {
       mostraFormularioEditar();
       formEditeInput.value = pegaTarefa;
       tarefaAntiga = pegaTarefa;
    }
    
   
});















// 3 mensagem de alerta 




let alertaExistente = null;

function mostrarAlerta(mensagem, elemento) {
    // Verifica se já existe um alerta criado
    if (alertaExistente) {
        // Atualiza a mensagem do alerta existente
        alertaExistente.querySelector(".mensagem").textContent = mensagem;
        alertaExistente.style.top = `${elemento.offsetTop - 10}px`;
        alertaExistente.style.left = `${elemento.offsetLeft + elemento.offsetWidth + 20}px`;
    } else {
        // Cria um novo alerta
        const alerta = document.createElement("div");
        alerta.classList.add("alerta");
        alerta.style.backgroundColor = "green";
        alerta.style.color = "white";
        alerta.style.padding = "9px";
        alerta.style.position = "absolute";
        alerta.style.top = `${elemento.offsetTop - 10}px`;
        alerta.style.left = `${elemento.offsetLeft + elemento.offsetWidth + 20}px`;
        alerta.style.borderRadius = "10px";
        alerta.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";

        // Cria o elemento de mensagem do alerta
        const mensagemAlerta = document.createElement("span");
        mensagemAlerta.classList.add("mensagem");
        mensagemAlerta.textContent = mensagem;
        alerta.appendChild(mensagemAlerta);

        // Adiciona a seta ao alerta
        const seta = document.createElement("div");
        seta.style.position = "absolute";
        seta.style.top = "calc(50% - 9px)";
        seta.style.left = "-10px";
        seta.style.width = "0";
        seta.style.height = "0";
        seta.style.borderTop = "10px solid transparent";
        seta.style.borderBottom = "10px solid transparent";
        seta.style.borderRight = "10px solid green";
        alerta.appendChild(seta);

        // Adiciona o alerta ao corpo da página
        document.body.appendChild(alerta);

        // Define o alerta criado como o alerta existente
        alertaExistente = alerta;
    }

    // Remove o alerta depois de 3 segundos
    setTimeout(() => {
        alertaExistente.remove();
        alertaExistente = null;
    }, 4000);
}
