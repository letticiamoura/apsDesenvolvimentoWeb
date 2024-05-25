const uri = "tasks"

//URL do backend
const url = "http://localhost:3333/tasks";

//Guardando as informações do banco de dados
var dataResult = [];

//Representando as tarefas
const tasksBD = [];

//Requisitando as tasks ativas do banco de dados
async function listEnabled() {

    try {
        await fetch(url + "/enabled")
        .then(resp => resp.json())
        .then(data => {

            data.map(task => {
                tasksBD.push(task);
            })

            renderTasks(tasksBD);

        })
        .catch(e => {
            console.error("Error na requisição " + e)
        })
    } catch (err) {
        console.error("Error ao requisitar dados " + err)
    }
}

//Requisitando as tasks arquivadas do banco de dados
async function listArchived() {

    try {
        await fetch(url + "/archived")
        .then(resp => resp.json())
        .then(data => {

            data.map(task => {
                tasksBD.push(task);
            })

            renderTasks(tasksBD);

        })
        .catch(e => {
            console.error("Error na requisição " + e)
        })
    } catch (err) {
        console.error("Error ao requisitar dados " + err)
    }
}

//Requisitando as tasks por id
async function getTaskId() {
    
    try {

        const taskId = getParamUrl("id");
        await fetch(url + `/${taskId}`)
        .then(resp => resp.json())
        .then(data => {

            insertData(
                {
                    title: data.title,
                    description: data.description,
                    createdAt: data.created_at,
                    updatedAt: new Date()
                }
            );

        })
        .catch(e => console.log("Error: " + e));

    } catch (err) {
        console.error("Erro ao requisitar dados: " + err);
    }

}

//Inserindo os dados
function insertData(task) {

    const title = document.getElementById("titleEditValue");

    const description = document.getElementById("descriptionEditValue");

    const createdAt = document.getElementById("createdAtEditValue");

    const updateAt = document.getElementById("updatedAtEditValue");
    /*
    //Pegando somente a data
    var taskCreatedDate = task.createdAt.split("T");

    //Separando dia, mês e ano
    var part = taskCreatedDate[0].split("-");

    //Formatando dd/mm/aaaa
    var createdInDate = part[2] + '/' + part[1] + '/' + part[0];*/

    title.innerText = task.title;
    description.innerText = task.description;
    createdAt.innerText = "Criado em: " + task.createdAt;
    if(task.updateAt) updateAt.innerText = "Atualizado em: " + task.updateAt;

}

//Editando tarefa
async function editTask() {

    const idTask = getParamUrl("id");

    const titleInput = document.getElementById("titleEditInput");

    const descriptionInput = document.getElementById("descriptionEditInput");
    
    console.log(titleInput.value);
    console.log(descriptionInput.value);
    try {

        //Enviando os dados p/ a API
        await fetch(`${url}/${idTask}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: titleInput.value,
                description: descriptionInput.value
            })
        });

        alert("Tarefa editada com sucesso!");

        

        window.location.reload();
        

    } catch (err) {
        console.error("Erro ao atualizar tarefa: " + err);
    }
}

//Arquivando tarefa
async function archiveTask(id) {


    try {

        await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                state: 0
            })
        });

        alert("Task archived");

        window.location.reload();

    } catch (err) {
        console.error("Erro ao arquivar tarefa: " + err);
    }
}

//Arquivando tarefa
async function deleteTask(id) {


    try {

        await fetch(`${url}/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                state: 0
            })
        });

        alert("Task deleted");

        window.location.reload();

    } catch (err) {
        console.error("Erro ao arquivar tarefa: " + err);
    }
}

//Marcando a tarefa como concluida
async function markTaskDone(id, done) {

    var markAs;

    if(done) {
        markAs = false;
    } else {
        markAs = true;
    }

    try {
        
        //Enviando p/ a API
        var resp = await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                done: markAs
            })
        });

        var taskCreated = await resp.json();

        alert("Marcada como concluída!");

        window.location.reload();

    } catch (err) {
        console.error("Erro a marcar tarefa: " + err);
    }
}

//Inserindo dados da task selecionada na tela de edição
function renderTasks(tasks) {

    const allTasksDiv = document.getElementById('allTasks');

    tasks.forEach(task => {

        var newTaskDiv = document.createElement('div');
        newTaskDiv.className = ('task' + (task.done ? ' completed' : '')); 
        newTaskDiv.className = ('task');
        newTaskDiv.innerHTML = `
            
            <div class="containerTasks">

                <button type="button" onclick="markTaskDone(${task.id}, ${task.done})" class="btnMarcarTarefa">${task.done ? '<i class="fas fa-check-circle"></i>' : 'X'}</button>

           
                <h3>${task.title}</h3>

                <p>${task.description}</p>

                <div class="optionsTask">

                    <button title="Edit">
                        <a href="./Edit.html?id=${task.id}">
                            <i class="fas fa-edit icon" title="Edit"></i>
                        </a>
                    </button>

                    <button title="Delete" type="button" onclick="deleteTask(${task.id})" >
                        <i class="fas fa-trash icon" title="Delete"></i>
                    </button>

                    <button title="Archive" type="button" onclick="archiveTask(${task.id})" >
                        <i class="fas fa-archive icon" title="Archive"></i>
                    </button>

                </div>

            </div>
        `;

        allTasksDiv.appendChild(newTaskDiv);
    });
}

//Cadastrando uma nova tarefa
async function createTask(tasks) {

    //Pegando os valores dos input
    var title = document.getElementById('titleInput').value;

    var description = document.getElementById('descriptionInput').value;

    
    if( title === '' || description === '') {
        alert("Preencha todos os campos!");
        return;
    }

    try {

        //Enviando os dados p/ a API
        var resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });

        // Limpando os campos de input
        titleInput.value = '';
        descriptionInput.value = '';

        var taskCreated = await resp.json();

        tasksBD.push(taskCreated);
        renderTasks(tasksBD); // não precisa

        // renderTasks({title: title, description: description});

        title.value = ''
        description.value = ''

        alert("Task created")

    } catch (err) {
        console.error("Erro ao cadastrar tarefa: " + err);
    }
}

//Pegando parâmetro "paramId" que é o id da tarefa 
function getParamUrl(param) {
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    return urlParams.get(param);
}

function pageEdit() {
    window.location.href = "../pages/Edit.html";
}