
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const weekday = document.getElementById('weekday');
const tasks_container = document.getElementById('tasks_container');

const load = () => {
    if (localStorage.getItem('...')) {
        tasks_container.innerHTML += localStorage.getItem('...')
        let task = document.getElementsByClassName('task')
        let deleteTask = document.getElementsByClassName('task_remove')
        for (let i = 0; i < task.length; i++) {
            task[i].addEventListener('click', (event) => {
                if (!event.target.classList.contains('task_remove')) {
                    event.target.classList.toggle('completed')
                }
                localStorage.setItem('...', tasks_container.innerHTML)
            })
        }
        for (let i = 0; i < deleteTask.length; i++) {
            deleteTask[i].addEventListener('click', (event) => {
                event.target.parentElement.remove()
            })
        }
    }
};

const newTask = event => {
    event.preventDefault()
    const { value } = event.target.task_input
    if (!value) return
    const deleteTask = document.createElement('button')
    deleteTask.textContent = '🗑'
    deleteTask.classList.add('task_remove')
    deleteTask.addEventListener('click', (event) => {
        event.target.parentElement.remove()
    })
    let task = document.createElement('div')
    task.textContent = value
    task.classList.add('task', 'round')
    task.addEventListener('click', (event) => {
        if (!event.target.classList.contains('task_remove')) {
            event.target.classList.toggle('completed')
        }
        localStorage.setItem('...', tasks_container.innerHTML)
    })
    task.append(deleteTask)
    tasks_container.prepend(task)
    localStorage.setItem('...', tasks_container.innerHTML)
    event.target.reset()
};

const order = () => {
    const completed = []
    const toDo = []
    tasks_container.childNodes.forEach(child => {
        child.classList.contains('completed') ? completed.push(child) : toDo.push(child)
    })
    return [...toDo, ...completed]
};

const orderTasks = () => {
    order().forEach(element => tasks_container.appendChild(element))
    localStorage.setItem('...', tasks_container.innerHTML)
};

const setDate = () => {
    const date = new Date()
    day.textContent = date.toLocaleString('en-GB', { day: 'numeric' })
    month.textContent = date.toLocaleString('en-GB', { month: 'short' })
    year.textContent = date.toLocaleString('en-GB', { year: 'numeric' })
    weekday.textContent = date.toLocaleString('en-GB', { weekday: 'long' })
};
setDate();