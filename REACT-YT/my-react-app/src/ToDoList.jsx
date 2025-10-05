import React,{useState} from 'react'

function ToDoList(){
    const [tasks,setTasks] = useState(["Go to gym","Eat BKF"]);
    const [newTask,setNewTask] = useState("");

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t,newTask]);
            setNewTask("");
        }
        else{
            alert("Task connat be empty");
        }
    }

    function removeTask(index){
        setTasks(tasks.filter((_,i) => i !== index));
    }

    function moveTaskUp(index){
        if(index > 0){
        const updatedTasks = [...tasks];
        [updatedTasks[index - 1],updatedTasks[index]] = [updatedTasks[index],updatedTasks[index-1]];
        setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if(index < tasks.length-1){
        const updatedTasks = [...tasks];
        [updatedTasks[index + 1],updatedTasks[index]] = [updatedTasks[index],updatedTasks[index+1]];
        setTasks(updatedTasks);
        }
    }

    return(
        <div>
            <h1>To-Do-List</h1>

            <input type="text" value={newTask} placeholder='Enter task' onChange={handleInputChange} />
            <button onClick={addTask}>Add Task</button>

            <ol>
                {tasks.map((task,index) => <li key={index}>
                    <span className="To-do-text">
                        {task}
                    </span>
                    <button onClick={() => removeTask(index)}>
                        Delete
                    </button>
                    <button onClick={() => moveTaskUp(index)}>
                        👆🏻
                    </button>
                    <button onClick={() => moveTaskDown(index)}>
                        👇🏻
                    </button>
                </li>)}
            </ol>

        </div>
    );

}

export default ToDoList