const taskList = document.querySelector('.todo__list')
let tasklist_database = [ 
]


const createItem = (newTask, status, index) => { 
    const newItem  = document.createElement('label');
    newItem.classList.add('todo__item');
    newItem.innerHTML = `
        <input type="checkbox" ${status} data-index = ${index}>
        <div>${newTask}</div>
        <input type="button" value="x" data-index = ${index}>
    `
    document.querySelector('.todo__list').appendChild(newItem);

}

const clear = () =>{ 
    let taskList = document.querySelector('.todo__list')
    while(taskList.firstChild){ 
        taskList.removeChild(taskList.firstChild)
    }

}

const render = () => { 
    clear() 
    tasklist_database.forEach((item, index) => {
        createItem(item.task, item.status, index)
    })
    console.log(tasklist_database)
}

function enterTask(e){ 
    if(e.keyCode === 13){ 
        let taskInp = document.querySelector('#newItem > input')
        // console.log(taskInp.value)
        tasklist_database.push({"task": taskInp.value, "status": ""})
        render()
        taskInp.value = ''
    }
}

const clickItem = (e)=>{ 
    const element = e.target
    if(element.type === 'button'){ 
        const index = element.dataset.index
        // console.log(index)
        removeTask(index)
    }

    if(element.type === 'checkbox'){ 
        const index = element.dataset.index
        updateTaskStatus(index)
    }
} 

const removeTask = (index) => { 
    tasklist_database.splice(index, 1)
    render()
}

const updateTaskStatus = (index) => { 
    tasklist_database[index].status = tasklist_database[index].status == ''? 'checked' : ''
    render()
}
document.querySelector('#newItem').addEventListener('keydown', enterTask)
document.querySelector('.todo__list').addEventListener('click', clickItem)