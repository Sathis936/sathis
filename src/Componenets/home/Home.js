import React, { useEffect, useState } from 'react'
import { todoList } from '../../Services/data'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import useCounter from '../../Services/useCounter';
import RemoveIcon from '@mui/icons-material/Remove';
import AddCircleIcon from '@mui/icons-material/AddCircle';
function Home() {
  const [todos, setTodos] = useState(todoList);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState('');
  const [editedTaskId, setEditedTaskId] = useState(null);
  const{result,increament,decreament} =useCounter(0,1);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleEditTask(id) {
    const editedTodo = todos.find(todo => todo.id === id);
    setIsEditing(true);
    setEditedTask(editedTodo.task);
    setEditedTaskId(id);
  }

  function handleUpdateTask() {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === editedTaskId ? { ...todo, task: editedTask } : todo
      )
    );
    setEditedTask('');
    setEditedTaskId(null);
    setIsEditing(false);
  }

  function handleDeleteTask(id) {
    setTodos(prevTodo => prevTodo.filter(todo => todo.id !== id));
  }

  return (
    <div>
      <p>{result}</p>
      <box>
        <RemoveIcon onClick={decreament} sx={{cursor:'pointer',fontsize:'32px', mt:'10px'}}/>
        <AddCircleIcon onClick={increament} sx={{cursor:'pointer',fontsize:'32px', mt:'10px'}}/>
        
      </box>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {isEditing && editedTaskId === todo.id ? (
              <input
                type="text"
                value={editedTask}
                onChange={e => setEditedTask(e.target.value)}
                onBlur={handleUpdateTask}
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'red' : '#000'
                }}
              >
                {todo.task}
              </span>
            )}
            {!isEditing || editedTaskId !== todo.id ? (
              <EditOutlinedIcon
                onClick={() => handleEditTask(todo.id)}
                style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
              />
            ) : null}
            <DeleteOutlinedIcon
              onClick={() => handleDeleteTask(todo.id)}
              style={{ color: 'red', cursor: 'pointer', marginLeft: '5px' }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;