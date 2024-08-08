import { useEffect, useState } from "react";

function Todo() {

    const [list, setList] = useState([]);
    const [input, setInput] = useState('');


    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem('list'));
        if (storedList) {
            setList(storedList);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('list',  JSON.stringify(list));
    }, [list])


    function addTask(task) {
        if (task) {
            const newTask = {
                task: task,
                done: false,
            }

            setList(l => [...l, newTask]);
            setInput('');
        }
    }

    function handleInputChange(e) {
        let value = e.target.value;
        setInput(value);
    }

    function handleCheckbox(i) {
        setList(prevList => {
            const updatedList = [...prevList];
            updatedList[i].done = !updatedList[i].done;
            return updatedList;
        })
    }

    function deleteTask(i) {
        const filteredList = list.filter((_, index) => i !== index);
        setList(filteredList);
    }

    function clearList() {
        setList([]);
    }


    return(
        <form onSubmit={(e) => {e.preventDefault()}}>
            <h1>To Do List <span>byDavid</span></h1>
            <div className="container">

                <div className="inputDiv">
                    <input type="text" className="inputTask" value={input} onChange={handleInputChange} />
                    <button onClick={() => addTask(input)} style={{width: list.length > 0 ? '15%' : '20%'}}>Add Task</button>
                    <button style={{display: list.length > 0 ? 'block' : 'none', width: list.length > 0 ? '15%' : '20%'}} onClick={clearList}>clear</button>
                </div>

                <div className="list" style={{marginTop: list.length > 0 ? '30px' : '0px' }}>
                    <ul>
                        {list.map((item, i) => {
                            return <li key={i} style={{opacity: item.done ? '.45' : '1'}}>
                                <div className="right">
                                    <input type="checkbox" className="checkbox" id={`item${i}`} checked={item.done} style={{cursor: 'pointer'}} onChange={() => handleCheckbox(i)} />
                                    <label htmlFor={`item${i}`} style={{textDecoration: item.done ? 'line-through' : 'none', cursor: 'pointer'}} >{item.task}</label>
                                </div>
                                <button className="deleteLi" onClick={() => deleteTask(i)}>Delete</button>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </form>
    );
}





export default Todo;