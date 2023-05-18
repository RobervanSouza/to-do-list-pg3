

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();

    // Verifica se a tarefa já possui data de criação
    if (!todo.dataCriacao) {
        // Cria o horário atual
        const dataHoraAtual = new Date();
        const dataFormatada = dataHoraAtual.toLocaleDateString();
        const horaFormatada = dataHoraAtual.toLocaleTimeString();
        const dataHoraFormatada = `Criado em: ${dataFormatada} às ${horaFormatada}`;

        // Define a data de criação da tarefa
        todo.dataCriacao = dataHoraFormatada;
    }
    const dataHoraTarefa = document.createElement("p");
    dataHoraTarefa.innerText = todo.dataCriacao;
    divInput.appendChild(dataHoraTarefa);
    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
};

