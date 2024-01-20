function taskListApp() {
    const inputTask = document.querySelector('.input-task');
    const btnAdd = document.querySelector('.btn-add');
    const tasks = document.querySelector('.tasks');

    function createElementLi() {
        const li = document.createElement('li');
        return li;
    }

    function clearInput() {
        inputTask.value = '';
        inputTask.focus();
    }

    function createDeleteBtn(li) {
        const btnDelete = document.createElement('button');
        btnDelete.innerText = 'Delete';
        btnDelete.setAttribute('class', 'btn-delete');
        btnDelete.setAttribute('title', 'Delete this task');
        li.appendChild(btnDelete);
    }

    function createTask(inputText) {
        const li = createElementLi();
        li.innerText = inputText;
        tasks.appendChild(li);
        clearInput();
        createDeleteBtn(li);
        saveTasks();
    }

    inputTask.addEventListener('keypress', e => {
        if (e.keyCode === 13) {
            if (!inputTask.value) {
                alert('Create a task.');
                return;
            }
            createTask(inputTask.value);
        }
    });

    btnAdd.addEventListener('click', () => {
        if (!inputTask.value) {
            alert('Create a task.');
            return;
        }
        createTask(inputTask.value);
    });

    function saveTasks() {
        const liTasks = document.querySelectorAll('li');
        const taskList = [];

        for (let task of liTasks) {
            let taskText = task.innerText;
            taskText = taskText.replace('Delete', '').trim();
            taskList.push(taskText);
        }

        const tasksJSON = JSON.stringify(taskList);
        localStorage.setItem('tasks', tasksJSON);
    }

    document.addEventListener('click', e => {
        const el = e.target;
        if (el.classList.contains('btn-delete')) {
            el.parentElement.remove();
            saveTasks();
        }
    });

    function addSavedTasks() {
        const tasks = localStorage.getItem('tasks');
        const taskList = JSON.parse(tasks);

        for (let task of taskList) {
            createTask(task);
        }
    }
    addSavedTasks();
}
taskListApp();