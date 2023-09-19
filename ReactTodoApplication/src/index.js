import React, { useState } from 'react';
import ReactDOM from "react-dom";
import './App.css';
// import HomePage from './HomePage';
// import AddTodo from './AddTodo';

function App() {
    const [todos, setTodos] = useState([]);
    const [inputField, setInputField] = useState('');
    const [todoPriority, setTodoPriority] = useState('High');
    const [todoDueDate, setTodoDueDate] = useState('');

    const [editIndex, setEditIndex] = useState(-1);
    const [editTodoField, setEditTodoField] = useState('');
    const [editTodoPriority, setEditTodoPriority] = useState('');
    const [editTodoDueDate, setEditTodoDueDate] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [searchPriority, setSearchPriority] = useState('all');
    const [searchDueDate, setSearchDueDate] = useState('');
    const [searchPending, setSearchPending] = useState('all');


    // 
    // 
    // 
    // whoever is done, please try:

    // add priority to todos
    // due date to todos
    // filter of priority and due-date
    // filter of already done todos
    // filter of todos pending (but before the due date)

    // filter of todos pending (after due date has passed)

    // Extra things to try whoever has already done react before or wants to practise more: 
    // backlogs page with routing
    // activity logs page with routing
    // localstorage using useEffect
    // drag and drop todos around
    // component restructuring (divide components into multiple files to reuse code)

    // TODO:
    // Home - list of Todo Items
    // Add Item - add an Item
    // Edit an Item in the list

    // Fetch data from an API
    // useEffect(() => { setTimeout(() => { setCount((count) => count + 1); }, 1000); }, []); // <- add empty brackets here
    // useEffect(() => {
    //     //  fetch data from an API
    // }, []);
    // 
    // 

// 1 - Create a list view component

// 2 - inside the list view create a movie component with details of the movie and the image

// 3 - keep separate files for each





    //handling change in input field
    const handleInputChange = (event) => {
        setInputField(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setTodoPriority(event.target.value);
    }
    const handleDueDateChange = (event) => {
        setTodoDueDate(event.target.value);
    };

    //handling change in edit field
    const handleEditTodoTextChange = (event) => {
        setEditTodoField(event.target.value);
    }
    //handling change in edit field
    const handleEditTodoPriorityChange = (event) => {
        setEditTodoPriority(event.target.value);
    }
    //handling change in edit field
    const handleEditTodoDueDateChange = (event) => {
        setEditTodoDueDate(event.target.value);
    }
    //adding todo in array
    const handleAddTodo = () => {
        if (inputField.trim() !== '') {
            setTodos([...todos, { text: inputField, priority: todoPriority, dueDate: todoDueDate, completed: false }]);
            setInputField('');
            setTodoDueDate('');
        }
    };

    //check if todo complete
    const handleToggleComplete = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    };

    //removing todo from array
    const handleRemoveTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    };

    //handling editing todo
    const handleEditTodo = (index, newText) => {
        const updatedTodos = [...todos];
        updatedTodos[index].text = newText;
        setTodos(updatedTodos);
        setEditIndex(-1);
    };

    //handling search input
    const handleSearchItem = (event) => {
        setSearchTerm(event.target.value);
    };
    //handling search input
    const handleSearchPriority = (event) => {
        setSearchPriority(event.target.value);
    };
    //handling search input
    const handleSearchDueDate = (event) => {
        setSearchDueDate(event.target.value);
    };
    //handling search input
    const handleSearchPending = (event) => {
        setSearchPending(event.target.value);
    };

    const filteredTodos = todos.filter((todo) => {
        const textMatch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
        const priorityMatch = searchPriority === 'all' || todo.priority === searchPriority;
        const statusMatch = searchPending === 'all' || (searchPending === 'completed' ? todo.completed : !todo.completed);
        const pendingBeforeDueDateMatch = !searchDueDate || new Date(todo.dueDate).getTime() <= new Date(searchDueDate).getTime();
        // const pendingAfterDueDateMatch = !searchDueDate || new Date(todo.dueDate).getTime() > new Date(searchDueDate).getTime();
        return textMatch && priorityMatch && statusMatch && pendingBeforeDueDateMatch;// && pendingAfterDueDateMatch;  && dueDateMatch
    });

    // <Link to={`/users/${user.id}`} activeClassName="active">{user.name}</Link>
    // const router = createBrowserRouter([
    //     {
    //         path: "/homePage",
    //         element: <div className='application-container'>
    //             <h2 className='heading'>Todo List</h2>
    //             <div className='inputs-container'>
    //                 {/* search field to search for todos */}
    //                 <div className='search-todo-container'>
    //                     <input
    //                         className='search-todo-input'
    //                         type="text"
    //                         value={searchTerm}
    //                         onChange={handleSearchItem}
    //                         placeholder="Search todos here"
    //                     />
    //                     <select value={searchPriority} onChange={handleSearchPriority}>
    //                         <option value="all">All</option>
    //                         <option value="Low">Low</option>
    //                         <option value="Medium">Medium</option>
    //                         <option value="High">High</option>
    //                     </select>
    //                     <input
    //                         type="date"
    //                         value={searchDueDate}
    //                         onChange={handleSearchDueDate}
    //                         placeholder="Due Date"
    //                     />
    //                     <select value={searchPending} onChange={handleSearchPending}>
    //                         <option value="all">All</option>
    //                         <option value="completed">Completed</option>
    //                         <option value="pending">Pending</option>
    //                     </select>
    //                 </div>
    //             </div>
    //             {/* todos list */}
    //             <div className='todos-table-container'>
    //                 <table className="table">
    //                     <thead className="table_head">
    //                         <tr>
    //                             <th scope="col">Title</th>
    //                             <th scope="col">Status</th>
    //                             <th scope="col">Priority</th>
    //                             <th scope="col">Due Date</th>
    //                             <th scope="col"></th>
    //                             <th scope="col"></th>
    //                         </tr>
    //                     </thead>
    //                     <tbody>
    //                         {
    //                             filteredTodos.map((todo, id) => {
    //                                 return (
    //                                     <tr className='table_row' key={id}>
    //                                         <td>
    //                                             {
    //                                                 editIndex === id ? (
    //                                                     <input
    //                                                         className='todo-edit-input'
    //                                                         type="text"
    //                                                         value={editTodoField}
    //                                                         onChange={handleEditTodoTextChange}
    //                                                     />
    //                                                 ) : (
    //                                                     <span
    //                                                         className='todo-text'
    //                                                         style={{
    //                                                             textDecoration: todo.completed ? 'line-through' : 'none',
    //                                                             color: todo.completed ? 'gray' : 'black',
    //                                                             cursor: 'default'
    //                                                         }}
    //                                                         onClick={() => handleToggleComplete(id)}
    //                                                     >
    //                                                         {todo.text}
    //                                                     </span>
    //                                                 )
    //                                             }
    //                                         </td>
    //                                         <td>
    //                                             {todo.completed ? 'Completed' : 'Pending'}
    //                                         </td>
    //                                         <td>
    //                                             {
    //                                                 editIndex === id ? (
    //                                                     <select value={editTodoPriority} onChange={handleEditTodoPriorityChange}>
    //                                                         <option>High</option>
    //                                                         <option>Medium</option>
    //                                                         <option>Low</option>
    //                                                     </select>
    //                                                 ) : (
    //                                                     <span
    //                                                         className='todo-text'
    //                                                         style={{
    //                                                             textDecoration: todo.completed ? 'line-through' : 'none',
    //                                                             color: todo.completed ? 'gray' : 'black',
    //                                                             cursor: 'default'
    //                                                         }}
    //                                                         onClick={() => handleToggleComplete(id)}
    //                                                     >
    //                                                         {todo.priority}
    //                                                     </span>
    //                                                 )
    //                                             }
    //                                         </td>
    //                                         <td>
    //                                             {
    //                                                 editIndex === id ? (
    //                                                     <input
    //                                                         type="date"
    //                                                         value={editTodoDueDate}
    //                                                         onChange={handleEditTodoDueDateChange}
    //                                                         placeholder="Due Date"
    //                                                     />
    //                                                 ) : (
    //                                                     <span
    //                                                         className='todo-text'
    //                                                         style={{
    //                                                             textDecoration: todo.completed ? 'line-through' : 'none',
    //                                                             color: todo.completed ? 'gray' : 'black',
    //                                                             cursor: 'default'
    //                                                         }}
    //                                                         onClick={() => handleToggleComplete(id)}
    //                                                     >
    //                                                         {todo.dueDate}
    //                                                     </span>
    //                                                 )
    //                                             }
    //                                         </td>
    //                                         <td>
    //                                             {
    //                                                 editIndex === id ? (
    //                                                     <button className='todo-save-button' onClick={() => { setEditIndex(-1); handleEditTodo(id, editTodoField) }}>Save</button>
    //                                                 ) : (
    //                                                     <button className='todo-edit-button' onClick={() => { setEditIndex(id); setEditTodoField(todo.text) }}>Edit</button>
    //                                                 )
    //                                             }
    //                                         </td>
    //                                         <td>
    //                                             <button className='todo-delete-button' onClick={() => handleRemoveTodo(id)}>Remove</button>
    //                                         </td>
    //                                     </tr>
    //                                 )
    //                             })
    //                         }
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //     }, {
    //         path: "/addTodo",
    //         element: <div className='add-todo-container'>
    //             <h2 className='heading'>Add Todo</h2>
    //             <input
    //                 className='add-todo-input'
    //                 type="text"
    //                 value={inputField}
    //                 onChange={handleInputChange}
    //                 //   onKeyPress={handleKeyPress}
    //                 placeholder="Add a new todo here"
    //             />
    //             <select value={todoPriority} onChange={handlePriorityChange}>
    //                 <option>High</option>
    //                 <option>Medium</option>
    //                 <option>Low</option>
    //             </select>
    //             <input
    //                 type="date"
    //                 value={todoDueDate}
    //                 onChange={handleDueDateChange}
    //                 placeholder="Due Date"
    //             />
    //             <button className='add-todo-button' onClick={handleAddTodo}>Add</button>
    //         </div>
    //     }
    // ])
    return (
        // <React.StrictMode>
        //     <RouterProvider router={router} />
        // </React.StrictMode>
        <div className='application-container'>
            <h2 className='heading'>Todo List</h2>
            <div className='inputs-container'>
                {/* input field to add new todo */}
                <div className='add-todo-container'>
                    <input
                        className='add-todo-input'
                        type="text"
                        value={inputField}
                        onChange={handleInputChange}
                        // onKeyPress={handleKeyPress}
                        placeholder="Add a new todo here"
                    />
                    <select value={todoPriority} onChange={handlePriorityChange}>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                    </select>
                    <input
                        type="date"
                        value={todoDueDate}
                        onChange={handleDueDateChange}
                        placeholder="Due Date"
                    />
                    <button className='add-todo-button' onClick={handleAddTodo}>Add</button>
                </div>
                {/* search field to search for todos */}
                <div className='search-todo-container'>
                    <input
                        className='search-todo-input'
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchItem}
                        placeholder="Search todos here"
                    />
                    <select value={searchPriority} onChange={handleSearchPriority}>
                        <option value="all">All</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <input
                        type="date"
                        value={searchDueDate}
                        onChange={handleSearchDueDate}
                        placeholder="Due Date"
                    />
                    <select value={searchPending} onChange={handleSearchPending}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>
            {/* todos list */}
            <div className='todos-table-container'>
                <table className="table">
                    <thead className="table_head">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Status</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Due Date</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredTodos.map((todo, id) => {
                                return (
                                    <tr className='table_row' key={id}>
                                        <td>
                                            {
                                                // changing the tag based on is todo is being edited or not
                                                editIndex === id ? (
                                                    <input
                                                        className='todo-edit-input'
                                                        type="text"
                                                        value={editTodoField}
                                                        onChange={handleEditTodoTextChange}
                                                    />
                                                ) : (
                                                    <span
                                                        className='todo-text'
                                                        style={{
                                                            textDecoration: todo.completed ? 'line-through' : 'none',
                                                            color: todo.completed ? 'gray' : 'black',
                                                            cursor: 'default'
                                                        }}
                                                        onClick={() => handleToggleComplete(id)}
                                                    >
                                                        {todo.text}
                                                    </span>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {todo.completed ? 'Completed' : 'Pending'}
                                        </td>
                                        <td>
                                            {
                                                // changing based based on if todo is being edited or not
                                                editIndex === id ? (
                                                    <select value={editTodoPriority} onChange={handleEditTodoPriorityChange}>
                                                        <option>High</option>
                                                        <option>Medium</option>
                                                        <option>Low</option>
                                                    </select>
                                                ) : (
                                                    <span
                                                        className='todo-text'
                                                        style={{
                                                            textDecoration: todo.completed ? 'line-through' : 'none',
                                                            color: todo.completed ? 'gray' : 'black',
                                                            cursor: 'default'
                                                        }}
                                                        onClick={() => handleToggleComplete(id)}
                                                    >
                                                        {todo.priority}
                                                    </span>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                // changing based based on if todo is being edited or not
                                                editIndex === id ? (
                                                    <input
                                                        type="date"
                                                        value={editTodoDueDate}
                                                        onChange={handleEditTodoDueDateChange}
                                                        placeholder="Due Date"
                                                    />
                                                ) : (
                                                    <span
                                                        className='todo-text'
                                                        style={{
                                                            textDecoration: todo.completed ? 'line-through' : 'none',
                                                            color: todo.completed ? 'gray' : 'black',
                                                            cursor: 'default'
                                                        }}
                                                        onClick={() => handleToggleComplete(id)}
                                                    >
                                                        {todo.dueDate}
                                                    </span>
                                                )
                                            }
                                        </td>
                                        <td>
                                            {
                                                // changing based based on if todo is being edited or not
                                                editIndex === id ? (
                                                    <button className='todo-save-button' onClick={() => { setEditIndex(-1); handleEditTodo(id, editTodoField) }}>Save</button>
                                                ) : (
                                                    <button className='todo-edit-button' onClick={() => { setEditIndex(id); setEditTodoField(todo.text) }}>Edit</button>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <button className='todo-delete-button' onClick={() => handleRemoveTodo(id)}>Remove</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));