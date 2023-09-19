import React, { useState } from 'react';
import ReactDOM from "react-dom";
import './App.css';
import { Router, createBrowserRouter, RouterProvider } from "react-router-dom";

const HomePage = () => {
    // Your Todo list logic goes here
    return (
        <div className='application-container'>
            <h2 className='heading'>React Todo Application</h2>
            <div className='inputs-container'>

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

export default HomePage;

