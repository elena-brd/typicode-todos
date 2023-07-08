const apiURL = 'https://jsonplaceholder.typicode.com/todos';


const getTodos = () => {
    fetch(apiURL + '?_limit=5')
        .then(res => res.json())
        .then(data => {
            data.forEach((todo) => addTodoToDOM(todo))
        })
}

const addTodoToDOM = (todo) => {
    const div = document.createElement('div');
    div.classList.add('todo');
    div.setAttribute('data-id', todo.id);
    div.appendChild(document.createTextNode(todo.title));

    if (todo.completed) {
        div.classList.add('done')
    }

    document.getElementById('todo-list').appendChild(div);
}


const createTodo = (e) => {
    e.preventDefault();

    let newTodo = {
        title: e.target.firstElementChild.value,
        completed: false
    }

    fetch(apiURL, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => addTodoToDOM(data))
}


const toggleTodo = (e) => {
    if (e.target.classList.contains('todo')) {
        e.target.classList.toggle('done')
    }

    updateTodo(e.target.classList.contains('done'));
}

const updateTodo = (id, completed) => {
    fetch(`${apiURL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const deleteTodo = (e) => {
    if (e.target.classList.contains('todo')) {
        const id = e.target.dataset.id;
        fetch(`${apiURL}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => e.target.remove())
    }
}



document.addEventListener('DOMContentLoaded', getTodos);
document.getElementById('form-input').addEventListener('submit', createTodo);
document.getElementById('todo-list').addEventListener('click', toggleTodo);
document.getElementById('todo-list').addEventListener('dblclick', deleteTodo);