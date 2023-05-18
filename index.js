// 3 seleção dos elementos
const formlario = document.querySelector("#formulario");
const formInput = document.querySelector("#form-input");
const listaTarefas = document.querySelector("#lista-de-tarefas");
const formEditar = document.querySelector("#formulario-editar");
const formEditeInput = document.querySelector("#form-edit-input");
const btnCancelar = document.querySelector("#cancelar");
const pesquisarInput = document.querySelector("#input-pesquisar");
const btnLimparPesquisa = document.querySelector("#limpar-pesquisa");
const btnfiltar = document.querySelector("#filtrar-select");
let tarefaAntiga;
let pegaTarefa;
let dataHoraCriacao;


//3 função
const valorDaInput = (texto, feita = 0, salva = 1) => {
    const divInput = document.createElement('div');
    divInput.classList.add("todas-tarefas");

    // Cria um elemento <h4> para exibir o texto da tarefa
    const nomeTarefa = document.createElement("h4");
    nomeTarefa.innerText = texto;
    divInput.appendChild(nomeTarefa);

 

    // Cria um botão para marcar a tarefa como concluída
    const botaoFinalizar = document.createElement("button");
    botaoFinalizar.classList.add("finalizar");
    botaoFinalizar.innerHTML = '<i class="fa-solid fa-check"></i>'
    divInput.appendChild(botaoFinalizar);

    // Cria um botão para editar a tarefa
    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("editar");
    botaoEditar.innerHTML = '<i class="fa-solid fa-pen"></i>'
    divInput.appendChild(botaoEditar);

    // Cria um botão para remover a tarefa
    const botaoRemover = document.createElement("button");
    botaoRemover.classList.add("remover");
    botaoRemover.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    divInput.appendChild(botaoRemover);

    // Cria um elemento <p> para exibir a data e a hora da criação da tarefa






    
    const dataHoraTarefa = document.createElement("p");
    const dataHoraAtual = new Date();
    const dataFormatada = dataHoraAtual.toLocaleDateString();
    const horaFormatada = dataHoraAtual.toLocaleTimeString();
    dataHoraTarefa.innerText = `Criado em: ${dataFormatada} às ${horaFormatada}`;
    divInput.appendChild(dataHoraTarefa);


    // Definindo uma função chamada saveTodoLocalStorage que salva uma nova tarefa em Local Storage.
    const saveTodoLocalStorage = (todo) => {
        const todos = getTodosLocalStorage();

        // Adiciona a data e hora atual à tarefa
        todo.dataCriacao = dataHoraTarefa;

        todos.push(todo);

        localStorage.setItem("todas", JSON.stringify(todos));
    };







    // Utilizando dados da localStorage
    if (feita) {
        divInput.classList.add("todas");
        // Adiciona a classe "todas" ao elemento divInput se a tarefa estiver marcada como concluída
    }

    if (salva) {
        saveTodoLocalStorage({ texto, feita: 0 });
        // Salva a tarefa na localStorage com os valores do texto e feita (valor 0 indica não concluída)
    }

    listaTarefas.appendChild(divInput);
    // Adiciona o elemento divInput à lista de tarefas

    formInput.value = "";
// Limpa o valor do input do formulário

};

//3 fuções
const mostraFormularioEditar = () => {
    formEditar.classList.toggle("prontas");
    formlario.classList.toggle("prontas");
    listaTarefas.classList.toggle("prontas");
}

const tarefaAtualizada = (tarefas) => {
    const todasTarefas = document.querySelectorAll(".todas-tarefas");
    // Obtém todos os elementos com a classe "todas-tarefas" e armazena em todasTarefas

    todasTarefas.forEach((todas) => {
        let titulos = todas.querySelector("h4");
        // Obtém o elemento <h4> dentro de cada elemento todas

        if (titulos.innerText === tarefaAntiga) {
            // Verifica se o texto do elemento <h4> é igual à tarefaAntiga
            titulos.innerText = tarefas;
            // Atualiza o texto do elemento <h4> para tarefas
        }
    });
}

const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todas-tarefas");
    // Obtém todos os elementos com a classe "todas-tarefas" e armazena em todos

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h4").innerText.toLowerCase();
        // Obtém o texto do elemento <h4> dentro de cada elemento todo e converte para letras minúsculas

        todo.style.display = "flex";
        // Define o estilo do elemento todo como "flex" para que seja exibido

        if (!todoTitle.includes(search)) {
            // Verifica se o texto do elemento todoTitle não contém a pesquisa fornecida
            todo.style.display = "none";
            // Oculta o elemento todo definindo o estilo como "none"
        }
    });
};


pesquisarInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchedTodos(search);
});

btnLimparPesquisa.addEventListener("click", (e) => {
    e.preventDefault();

    pesquisarInput.value = "";

pesquisarInput.dispatchEvent(new Event("keyup"));
});


const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todas-tarefas");

    switch (filterValue) {
        case "todas":
            todos.forEach((todo) => (todo.style.display = "flex"));

            break;

        case "feita":
            todos.forEach((todo) =>
                todo.classList.contains("feita")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );

            break;

        case "falta":
            todos.forEach((todo) =>
                !todo.classList.contains("feita")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );

            break;

        default:
            break;
    }
};

btnfiltar.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
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
                    removeTodoLocalStorage(pegaTarefa);
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
    }, 5000);
}

// Local Storage
// Definindo uma função chamada getTodosLocalStorage que retorna um array com todas as tarefas armazenadas em Local Storage, ou um array vazio caso não exista nenhum registro.
const getTodosLocalStorage = () => {
    // Recuperando os dados armazenados em Local Storage com a chave "todas". Caso não exista, retorna um array vazio.
    const todasTarefas = JSON.parse(localStorage.getItem("todas")) || [];

    // Retornando o array de tarefas.
    return todasTarefas;
};

// Definindo uma função chamada loadTodos que carrega todas as tarefas armazenadas em Local Storage.
const tarefasArmazenadas = () => {
    // Recuperando o array de tarefas armazenadas em Local Storage com a função getTodosLocalStorage.
    const todos = getTodosLocalStorage();

    // Iterando sobre cada tarefa do array com forEach.
    todos.forEach((todo) => {
        // Executando a função valorDaInput para adicionar a tarefa na interface do usuário.
        valorDaInput(todo.texto, todo.feita, 0);
    });
};




// Definindo uma função chamada removeTodoLocalStorage que remove uma tarefa do Local Storage.
const removeTodoLocalStorage = (todoText) => {
    console.log("Removendo tarefa: ", todoText);
    // Recuperando o array de tarefas armazenadas em Local Storage com a função getTodosLocalStorage.
    const todos = getTodosLocalStorage();
    // Filtrando o array de tarefas para remover a tarefa com o texto especificado.
    const filteredTodos = todos.filter((todo) => todo.texto != todoText);
    // Salvando o novo array de tarefas em Local Storage com a chave "todas".
    localStorage.setItem("todas", JSON.stringify(filteredTodos));
};


// Definindo uma função chamada updateTodoStatusLocalStorage que atualiza o status de uma tarefa (feita ou não feita) no Local Storage.
const updateTodoStatusLocalStorage = (todoText) => {
    // Recuperando o array de tarefas armazenadas em Local Storage com a função getTodosLocalStorage.
    const todos = getTodosLocalStorage();

    // Atualizando o status da tarefa com o texto especificado (marcando como feita se estava não feita e vice-versa).
    todos.map((todo) =>
        todo.texto === todoText ? (todo.feita = !todo.feita) : null
    );

    // Salvando o novo array de tarefas em Local Storage com a chave "todas".
    localStorage.setItem("todas", JSON.stringify(todos));
}

// Definindo uma função chamada updateTodoLocalStorage que atualiza o texto de uma tarefa no Local Storage.
const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    // Recuperando o array de tarefas armazenadas em Local Storage com a função getTodosLocalStorage.
    const todos = getTodosLocalStorage();

    // Atualizando o texto da tarefa com o texto
    // especificado (substituindo o texto antigo pelo novo).
    todos.map((todo) =>
        todo.texto === todoOldText ? (todo.texto = todoNewText) : null
    );

    // Salvando o novo array de tarefas em Local Storage com a chave "todas".
    localStorage.setItem("todas", JSON.stringify(todos));
};

// Carregando todas as tarefas armazenadas em Local Storage quando a página é carregada.
tarefasArmazenadas();
