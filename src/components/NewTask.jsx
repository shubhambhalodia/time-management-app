import {useState} from 'react';
export default function NewTask({onAdd}){
    const [enteredTask,setEnteredTask]=useState('');
    function handleChange(e){
        setEnteredTask(e.target.value);
    }
    function handleClick(){
        if(enteredTask.trim()===''){
            return;
        }
        onAdd(enteredTask);
        setEnteredTask('');
    }
    return <div className="flex item-center gap-4">
        <input type="text" onChange={handleChange} value={enteredTask} className="w-64 px-2 py-1 rounded-sm bg-stone-200"/>
        <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
    </div>
}