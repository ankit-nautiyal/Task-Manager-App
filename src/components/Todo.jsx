import { useSelector } from "react-redux";
import AddForm from "./AddForm";
import { deleteTodo, markAsDone } from "../features/toDo/todoSlice";
import { useDispatch } from "react-redux";

export default function Todo(){
    const todos= useSelector((state) => state.todo.todos);
    console.log(todos);

    const dispatch= useDispatch();

    const deleteHandler= (id)=>{
        console.log(`Deleted the task with ID: ${id}` );
        dispatch(deleteTodo(id));
    }

    const markDoneHandler= (id)=>{
        console.log(`Task done with ID: ${id}` );
        dispatch(markAsDone(id));
    }


    return(
        <>
            <h2>Todo List App</h2>
            <AddForm/>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span style={todo.isDone ? {textDecoration: "line-through"} : {}}> {todo.task} </span> 
                        <button onClick={() => deleteHandler(todo.id)}> Delete</button>
                        <button onClick={() => markDoneHandler(todo.id)}> Mark As Done</button>
                    </li>
                ))}
            </ul>
        </>
    );
}