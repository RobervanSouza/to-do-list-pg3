// 3 seleção dos elementos
const formlario = document.querySelector("#formulario");
const formInput = document.querySelector("#form-input");
const listaTarefas = document.querySelector("#lista-de-tarefas");
const formEditar = document.querySelector("#formulario-editar");
const formEditeInput = document.querySelector("#form-edit-input");
const btnCancelar = document.querySelector("#cancelar");
const pesquisar = document.querySelector("#pesquisar-itens");
let tarefaAntiga;
let titulo;

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


// 3 eventos
formlario.addEventListener("submit", (e) =>{
    e.preventDefault();
   const valorDigitado = formInput.value;
   
if(valorDigitado){
    valorDaInput(valorDigitado)
}
})

// 3 eventos >> como identificar o click nos botoes

// Seleciona todos os elementos com a classe "finalizar" e armazena em uma variável
const btnFinalizar = document.querySelectorAll(".finalizar");
// Itera sobre cada botão com a classe "finalizar"
btnFinalizar.forEach((btn) => {
    // Adiciona um evento de escuta de clique a cada botão


    btn.addEventListener("click", (event) => {
        // Usa o método closest para encontrar o elemento pai mais próximo com a classe "todas-tarefas" e armazena em uma variável
        const divTodasTarefas = event.currentTarget.closest(".todas-tarefas");
        // Adiciona ou remove a classe "prontas" no elemento pai encontrado acima (com o método closest) dependendo do estado atual da classe
        divTodasTarefas.classList.toggle("prontas");
        

       
    });  
});






const mostrarForm = (event) => {
    formEditar.classList.toggle("form-editar")
    formlario.classList.toggle("form-editar");
    listaTarefas.classList.toggle("form-editar");
    
}

const botaoEditar = document.querySelectorAll('.editar');
botaoEditar.forEach((edit) => {
    edit.addEventListener('click', () => {
        mostrarForm();

    });
})

btnCancelar.addEventListener('click', (event) => {
    event.preventDefault();
    mostrarForm();
})


const btnEditar = document.querySelectorAll(".editar");

btnEditar.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        const divTodasTarefas = event.currentTarget.closest(".todas-tarefas");
        const tarefa = divTodasTarefas.querySelector(".tarefa");
        const formEditInput = document.getElementById("form-edit-input");
        formEditInput.value = tarefa.innerText;
        document.getElementById("formulario-editar").style.display = "block";
    });
});






let alertaExistente = null;

function mostrarAlerta(mensagem, elemento) {
    // Verifica se já existe um alerta criado
    if (alertaExistente) {
        // Atualiza a mensagem do alerta existente
        alertaExistente.querySelector(".mensagem").textContent = mensagem;

        // Atualiza a posição do alerta existente
        alertaExistente.style.top = `${elemento.offsetTop}px`;
        alertaExistente.style.left = `${elemento.offsetLeft + elemento.offsetWidth}px`;
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
    }, 3000);
}

const btnsRemover = document.querySelectorAll(".remover");
btnsRemover.forEach((btnRemover) => {
    btnRemover.addEventListener("click", (event) => {
        const divTodasTarefas = event.currentTarget.closest(".todas-tarefas");
        if (divTodasTarefas.classList.contains("prontas")) {
            divTodasTarefas.remove();
        } else {
            mostrarAlerta("Remove apenas tarefas concluidas", btnRemover);
        }
    });
});

let 




  