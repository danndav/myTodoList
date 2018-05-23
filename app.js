const form = document.querySelector("#task-form")
const taskInput = document.querySelector("#task")
const taskList = document.querySelector(".collection")
//const addItem = document.querySelector(".btn")
const clearBtn= document.querySelector(".clear-tasks")
const filter = document.querySelector("#filter")

addlist();
removeList();
clearTask();
filterTask();
getTasks();


function getTasks(){
    document.addEventListener('DOMContentLoaded',function(){
        let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement("li");
        li.className = "collection-item"
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className= "delete-item secondary-content"
        link.innerHTML ='<i class="fa fa-remove"></li>'

        li.appendChild(link)
        taskList.appendChild(li);
    });
    });
};;



function addlist(){
    form.addEventListener("submit",function(e){
        e.preventDefault() 
        
        if(taskInput.value === ""){
            alert("add an item")
        }else{
        
        const li = document.createElement("li");
        li.className = "collection-item"
        li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement('a');
        link.className= "delete-item secondary-content"
        link.innerHTML ='<i class="fa fa-remove"></li>'

        li.appendChild(link)
        taskList.appendChild(li);

        // store in local storage
      
        storeTaskInLocalStorage(taskInput.value); 
        taskInput.value = ""
        }
    })
}


// store Task
function storeTaskInLocalStorage(task ){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}



function removeList(){
    taskList.addEventListener('click',function(e){
        if(e.target.parentElement.classList.contains('delete-item')){
            if(confirm('Are u sure'));{
            e.target.parentElement.parentElement.remove()

            removeTasksFromLocalStorage(e.target.parentElement.parentElement)
        }
    }

    });
};


function removeTasksFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function clearTask(){
    clearBtn.addEventListener('click',function(){
       // console.log('hello')
       //taskList.innerHTML="";
       while(taskList.firstChild){
           taskList.removeChild(taskList.firstChild)
       }

       clearTasksFromLocalStorage();
    });
};

function clearTasksFromLocalStorage(){
    localStorage.clear();
}


function filterTask(){
    filter.addEventListener('keyup',function(e){
        const text=e.target.value;
        
        document.querySelectorAll('.collection-item').forEach(function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) !=-1){
                task.style.display ='block';
            }else{
                task.style.display="none";
            }
        })
    })
}