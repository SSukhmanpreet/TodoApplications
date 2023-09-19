import React, { useState } from 'react';
import ReactDOM from "react-dom";
import './App.css';
import { Router, createBrowserRouter, RouterProvider } from "react-router-dom";

const AddTodo = () => {
    const [todos, setTodos] = useState([]);
    const [inputField, setInputField] = useState('');
    const [todoPriority, setTodoPriority] = useState('High');
    const [todoDueDate, setTodoDueDate] = useState('');

    //adding todo in array
    const handleAddTodo = () => {
        if (inputField.trim() !== '') {
            setTodos([...todos, { text: inputField, priority: todoPriority, dueDate: todoDueDate, completed: false }]);
            setInputField('');
            setTodoDueDate('');
        }
    };

    //handling change in input field
    const handleInputChange = (event) => {
        setInputField(event.target.value);
    };

    //handling change in priority field
    const handlePriorityChange = (event) => {
        setTodoPriority(event.target.value);
    }

    //handling change in date field
    const handleDueDateChange = (event) => {
        setTodoDueDate(event.target.value);
    };

    //returning html code
    return (
        // input field to add new todo
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
    );
};

export default AddTodo;