window.addEventListener('load', () => {
    //storing form data from the page to variables
    const formData = document.querySelector('#new-form');
    //storing input task field data
    const inputTaskData = document.querySelector('#input-task-field');
    //storing list of all tasks
    const selectedCategory = document.querySelector('#category-selector');
    const selectedPriority = document.querySelector('#priority-selector');
    const selectedDueDate = document.querySelector('#dueDate-selector');
    const arrayLoggingActivity = [];
    //
    //
    //
    //
    //
    //
    let todoTable,
        draggingElement;
    todoTable = document.getElementById("list-all-tasks");
    // document
    //     .getElementById("todoTable")
    //     .addEventListener("click", onTableClicked, false);
    todoTable.addEventListener("dragstart", onDragstart, false);
    todoTable.addEventListener("drop", onDrop, false);
    todoTable.addEventListener("dragover", onDragOver, false);
    function onDragstart(event) {
        draggingElement = event.target; //trElem
    }
    function onDrop(event) {
        if (event.target.matches("table")) return;
        let beforeTarget = event.target;

        while (!beforeTarget.matches("tr")) beforeTarget = beforeTarget.parentNode;

        //prevent when tr is first row
        if (beforeTarget.matches(":first-child")) return;

        //handling array

        let tempIndex;
        //find the index of one to be taken out
        todos.forEach((todo, index) => {
            if (todo.id == draggingElement.dataset.id) tempIndex = index;
        });
        //pop the element
        let [toInsertObj] = todos.splice(tempIndex, 1);

        //find the  one  to be inserted before
        todos.forEach((todo, index) => {
            if (todo.id == beforeTarget.dataset.id) tempIndex = index;
        });
        //insert the temp
        todos.splice(tempIndex, 0, toInsertObj);
        todoTable.insertBefore(draggingElement, beforeTarget);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    function onDragOver(event) {
        event.preventDefault();
    }




    let activityLogs = [];
    let showActivityLogBtn,
        activityLog;
    // backlogsbtn;
    loadActivityLogs();
    activityLog = document.getElementById("activityLog");
    showActivityLogBtn = document.getElementById("showActivityLogBtn");
    // backlogsbtn = document.getElementById("backlogsbtn");
    showActivityLogBtn.addEventListener(
        "click",
        function () {
            // Call the updateActivityLog function immediately to display the logs
            updateActivityLog();

            setTimeout(clearActivityLog, 3000);
        },
        false
    ); //
    // backlogsbtn.addEventListener("click", renderBacklogs, false);
    function clearActivityLog() {
        activityLog.innerHTML = ""; // Assuming "activityLog" is the container for the logs
    }

    //log Activity

    function logActivity(activity) {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        activityLogs.unshift(`[${formattedDate}] ${activity}`);

        //save activity logs to local storage
        saveActivityLogs();
    }

    /// add event listener when button is clicked then only this runs

    function updateActivityLog() {
        // Clear the previous logs
        activityLog.innerHTML = "";

        const headingElement = document.createElement("h3");
        headingElement.innerText = "Activity Logs";

        // Append the heading to the activityLog container
        activityLog.appendChild(headingElement);
        activityLogs.forEach((log) => {
            const li = document.createElement("li");
            li.innerText = log;
            activityLog.appendChild(li);
        });

        //save activity logs to local storage
        saveActivityLogs();
    }
    function saveActivityLogs() {
        let stringifiedLogs = JSON.stringify(activityLogs);
        localStorage.setItem("activityLogs", stringifiedLogs);
    }
    function loadActivityLogs() {
        let retrievedLogs = localStorage.getItem("activityLogs");
        activityLogs = JSON.parse(retrievedLogs);
        if (activityLogs === null) {
            activityLogs = [];
        }
    }



    //
    //
    //
    //
    //
    //

    // function updateActivityLog() {
    //     const activityLog = document.querySelector("#activityDiv");
    //     activityLog.innerHTML = "";
    //     console.log(arrayLoggingActivity);
    //     arrayLoggingActivity.forEach((index) => {
    //         console.log(arrayLoggingActivity[index]);
    //         const li = document.createElement("li");
    //         li.innerText = `
    //             ${arrayLoggingActivity[index]}
    //         `
    //         activityLog.appendChild(li);
    //     });
    // }
    const tags = document.getElementById('tags');
    const inputTag = document.getElementById('input-tag');

    let tagsArr = [];
    // Add an event listener for keydown on the input element
    inputTag.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const tagContent = inputTag.value.trim();
            const tagIsDuplicate = tagsArr.some((tagObj) => tagObj.title.toUpperCase() === tagContent.toUpperCase());
            if (tagIsDuplicate) {
                alert("Tag already exists! Please enter different tag name.");
                return;
            }
            if (tagContent === '') {
                alert("A tag cannot be empty! Please enter tag name.")
                return;
            } else {
                const tagObj = {
                    title: tagContent,
                }
                tagsArr.push(tagObj);
                const tag = document.createElement('li');
                tag.innerText = tagContent;
                tag.innerHTML += '<button class="delete-button">X</button>';
                tags.appendChild(tag);
                inputTag.value = '';
            }
        }
    });
    tags.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-button')) {
            event.target.parentNode.remove();
        }
    });

    const subtasks = document.getElementById('subtasks');
    const inputSubtask = document.getElementById('input-subtask');
    let subtasksArr = [];
    inputSubtask.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const subtaskContent = inputSubtask.value.trim();
            const subtaskIsDuplicate = subtasksArr.some((subtaskObj) => subtaskObj.title.toUpperCase() === subtaskContent.toUpperCase());
            if (subtaskIsDuplicate) {
                alert("Subtask already exists! Please enter different subtask.");
                return;
            }
            if (subtaskContent === '') {
                alert("A subtask cannot be empty! Please enter subtask.")
                return;
            } else {
                const subtaskObj = {
                    title: subtaskContent,
                    checked: false,
                }
                subtasksArr.push(subtaskObj);
                const subtask = document.createElement('li');
                subtask.innerText = subtaskContent;
                subtask.innerHTML += '<button class="delete-button">X</button>';
                subtasks.appendChild(subtask);
                inputSubtask.value = '';
            }
        }
    });
    subtasks.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-button')) {
            event.target.parentNode.remove();
        }
    });
    const todoListEle = document.querySelector('#list-all-tasks');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos();
    let editTodoId = -1;
    formData.addEventListener("submit", (e) => {
        e.preventDefault();
        const task_text = inputTaskData.value;
        const task_category = selectedCategory.value;
        const task_priority = selectedPriority.value;
        const task_dueDate = selectedDueDate.value;
        if (!task_text || !task_category || !task_priority) {
            alert("A task cannot be empty. Please fill your task details.");
            return;
        }
        const isDuplicate = todos.some((todo) => todo.title.toUpperCase() === task_text.toUpperCase());
        if (isDuplicate) {
            alert("Task already exists. This task has already been added to your todo list.");
            return;
        }
        saveTodo();
        console.log("task logging: ");

        logActivity(`Task "${inputTaskData.value}" added`);
        // console.log("Todo added successfully!");
        renderTodos();
        // console.log("TodoList rendered successfully!");
        localStorage.setItem('todos', JSON.stringify(todos));
        // console.log("TodoList stored in local storage successfully!");
        inputTaskData.value = "";
        selectedCategory.value = "";
        selectedPriority.value = "";
        selectedDueDate.value = "";
        inputTag.value = "";
        inputSubtask.value = "";
        // tags.remove();
        // subtasks.remove();
    });
    function extractDueDate(todoText) {
        console.log("extractDueDate");
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        const tomorrowPattern = /(?:^|\W)tomorrow(?:$|\W)/i;
        const datePattern = /(\d{1,2}(?:st|nd|rd|th)?\s+\w+\s+\d{4})/i;
        const timePattern = /(\d{1,2}(?::\d{2})?\s*[ap]m)/i;

        if (tomorrowPattern.test(todoText)) {
            return tomorrow;
        }
        // else {
        //     const dateMatch = todoText.match(datePattern);
        //     const timeMatch = todoText.match(timePattern);
        //     if (dateMatch) {
        //         const dateString = dateMatch[1];
        //         const timeString = timeMatch ? timeMatch[1] : '12:00 am';
        //         const dateTimeString = `${dateString} ${timeString}`;
        //         console.log("dateString");
        //         console.log(dateString);
        //         console.log("timeString");
        //         console.log(timeString);
        //         console.log("dateTimeString");
        //         console.log(dateTimeString);
        //         return new Date(dateTimeString);
        //     }
        // }

        return null;
    }
    function saveTodo() {
        const todoValue = inputTaskData.value;
        const catValue = selectedCategory.value;
        const prioValue = selectedPriority.value;
        const dueDateValue = selectedDueDate.value;
        const dueDateText = extractDueDate(todoValue);
        if (dueDateText === null && !dueDateValue) {
            alert("A task cannot be added without a due date. Please fill your task details.");
            return;
        }
        if (editTodoId >= 0) {
            todos = todos.map((todo, index) => {
                return {
                    ...todo,
                    title: index === editTodoId ? todoValue : todo.title,
                    category: index === editTodoId ? catValue : todo.category,
                    priority: index === editTodoId ? prioValue : todo.priority,
                    dueDate: index === editTodoId ? dueDateValue : todo.dueDate,
                }
            })
            editTodoId = -1;
        } else {
            // if(prioValue === "High"){
            //     prioValue = 3;
            // }else if(prioValue === "Medium"){
            //     prioValue = 2;
            // }else if(prioValue === "Low"){
            //     prioValue = 1;
            // }
            const todo = {
                title: todoValue,
                checked: false,
                category: catValue,
                priority: prioValue,
                tag: tagsArr,
                dueDate: dueDateValue,
                subtodo: subtasksArr,
            }
            todos.push(todo);
        }
    }

    const filterTitle = document.querySelector("#filterByTitle");
    filterTitle.addEventListener("input", (e) => {
        e.preventDefault();
        const filterTitleValue = filterTitle.value;
        if (filterTitleValue === "") {
            renderAllTodos();
            return;
        }
        let filteredTodos = todos.filter((todo) => {
            const titleMatch = todo.title.toLowerCase().includes(filterTitleValue);
            return titleMatch;
        })
        renderFilteredTodos(filteredTodos);
    });

    const filterPriority = document.querySelector("#filterByPriority");
    filterPriority.addEventListener("change", (e) => {
        const filterPriorityValue = filterPriority.value;
        if (filterPriorityValue === "All") {
            renderAllTodos();
            return;
        }
        let filteredTodos = todos.filter((todo) => {
            const priorityMatch = todo.priority === filterPriorityValue;
            return priorityMatch;
        })
        renderFilteredTodos(filteredTodos);
    });

    const filterDueDate = document.querySelector("#filterByDueDate");
    filterDueDate.addEventListener("change", (e) => {
        const filterDueDateValue = filterDueDate.value;
        if (filterDueDateValue === "") {
            renderAllTodos();
            return;
        }
        let filteredTodos = todos.filter((todo) => {
            const dueDateMatch = todo.dueDate === filterDueDateValue;
            return dueDateMatch;
        })
        renderFilteredTodos(filteredTodos);
    });

    const filterCategory = document.querySelector("#filterByCategory");
    filterCategory.addEventListener("input", (e) => {
        e.preventDefault();
        const filterCategoryValue = filterCategory.value;
        if (filterCategoryValue === "") {
            renderAllTodos();
            return;
        }
        let filteredTodos = todos.filter((todo) => {
            const categoryMatch = todo.category.toLowerCase().includes(filterCategoryValue);
            return categoryMatch;
        })
        renderFilteredTodos(filteredTodos);
    });

    const filterTag = document.querySelector("#filterByTag");
    filterTag.addEventListener("input", (e) => {
        e.preventDefault();
        const filterTagValue = filterTag.value;
        if (filterTagValue === "") {
            renderAllTodos();
            return;
        }
        const filteredTodos = todos.filter(todo => {
            const tagMatch = todo.tag.some(tagItem => tagItem.title.toLowerCase().includes(filterTagValue));
            return tagMatch;
        });
        renderFilteredTodos(filteredTodos);
    });

    const filterSubtask = document.querySelector("#filterBySubtask");
    filterSubtask.addEventListener("input", (e) => {
        e.preventDefault();
        const filterSubtaskValue = filterSubtask.value;
        if (filterSubtaskValue === "") {
            renderAllTodos();
            return;
        }
        const filteredTodos = todos.filter(todo => {
            const subtaskMatch = todo.subtodo.some(subtaskItem => subtaskItem.title.toLowerCase().includes(filterSubtaskValue));
            return subtaskMatch;
        });
        renderFilteredTodos(filteredTodos);
    });

    const filterPending = document.querySelector('#filterPendComp');
    filterPending.addEventListener("click", (e) => {
        e.preventDefault();
        const filterPendingValue = filterPending.value;
        if (filterPendingValue === "All") {
            renderAllTodos();
            return;
        }
        let filteredTodos = todos.filter((todo) => {
            const pendingMatch = todo.checked.toString() === filterPendingValue;
            return pendingMatch;
        })
        renderFilteredTodos(filteredTodos);
    })

    const sortingBy = document.querySelector('#sortingBy');
    sortingBy.addEventListener('change', (e) => {
        const sortingByValue = sortingBy.value;
        if (sortingByValue === "Sort By: Default") {
            renderAllTodos();
            return;
        }
        let sortedTodos = [];
        switch (sortingByValue) {
            case "sortDefault":
                renderAllTodos();
                return;
            case "sortPrioHtoL":
                sortedTodos = todos.sort((a, b) => a.priority.localeCompare(b.priority));
                renderFilteredTodos(sortedTodos);
                return;
            case "sortPrioLtoH":
                sortedTodos = todos.sort((b, a) => a.priority.localeCompare(b.priority));
                renderFilteredTodos(sortedTodos);
                return
            case "sortCat":
                sortedTodos = todos.sort((a, b) => a.category.localeCompare(b.category));
                renderFilteredTodos(sortedTodos);
                return
            case "sortDueDate":
                sortedTodos = todos.sort((a, b) => new Date(a.date) - new Date(b.date));
                renderFilteredTodos(sortedTodos);
                return
            default:
                renderAllTodos();
                return;
        }
    })

    function renderFilteredTodos(filteredTodos) {
        // updateActivityLog();
        todoListEle.innerHTML = "";
        // trElem.draggable = "true";
        let table = document.getElementById("todoTable");
        filteredTodos.forEach((todo, index) => {

            todoListEle.innerHTML += `
                <tr class="indvl-task" id="${index}" draggable="true">
                    <!-- checkbox -->
                    <td>
                        <i class="bi ${todo.checked ? 'bi-check-square-fill' : 'bi-square'}" style="color: #ffffff" data-action="check"></i>
                    </td>
                    <!-- title -->
                    <td class ="task-text ${todo.checked ? 'checked' : ''}" type="text" id="inp${index}" data-action="check">
                            ${todo.title}
                    </td>
                    <!-- due date -->
                    <td class ="task-text ${todo.checked ? 'checked' : ''} data-action="check">
                        ${todo.dueDate}
                    </td>
                    <!-- category -->
                    <td class ="task-text ${todo.checked ? 'checked' : ''} data-action="check">
                            ${todo.category}
                    </td>
                    <!-- priority -->
                    <td class ="task-text ${todo.checked ? 'checked' : ''} data-action="check">
                            ${todo.priority}
                    </td>
                    <!-- tags -->
                    <td class ="task-text ${todo.checked ? 'checked' : ''} data-action="check">
                        <ul id="listAllTags${index}">
                        </ul>
                    </td>
                    <!-- subtasks -->
                    <td class ="task-text ${todo.checked ? 'checked' : ''} data-action="check">
                        <ul id="listAllSubtasks${index}">
                        </ul>
                    </td>
                    <!-- edit button -->
                    <td>
                        <!-- Edit Button -->
                        <button data-action="edit" class="task-edit-button">
                            EDIT
                        </button>
                    </td>
                    <!-- delete button -->
                    <td>
                        <!-- Delete task Button -->
                        <button data-action="delete" class="task-delete-button">
                            DELETE
                        </button>
                    </td>
                </tr>
                <!-- <div class="indvl-task" id="${index}">
                    <i class="bi ${todo.checked ? 'bi-check-square-fill' : 'bi-square'}" style="color: #ffffff" data-action="check"></i>
                    <p class ="task-text ${todo.checked ? 'checked' : ''}" type="text" id="inp${index}" data-action="check">
                        ${todo.title}
                    </p>
                    <p>
                        <span id='date-time'>${todo.dueDate}</span>
                    </p>
                    <p>
                        ${todo.category}
                    </p>
                    <p>
                        ${todo.priority}
                    </p>
                    <div id="listAllTags${index}">
                    </div>
                    <div id="listAllSubtasks${index}">
                    </div>
                    <button data-action="edit" class="task-edit-button">
                        EDIT
                    </button>
                    <button data-action="delete" class="task-delete-button">
                        DELETE
                    </button>
                </div> -->
            `
            const tagsListDiv = document.querySelector(`#listAllTags${index}`);
            todo.tag.forEach(tag => {
                tagsListDiv.innerHTML += `
                <li id="tagsListItem">
                    ${tag.title}
                </li>`
            });
            console.log("rendered tags, now rendering subtasks");
            const subtasksListDiv = document.querySelector(`#listAllSubtasks${index}`);
            todo.subtodo.forEach(subtask => {
                subtasksListDiv.innerHTML += `
                <li id="subtaskListItem">
                    ${subtask.title}
                </li>`
            });
        });
        // updateActivityLog();
    }

    function renderTodos() {
        // updateActivityLog();
        // trElem.draggable = "true";  
        let table = document.getElementById("todoTable");
        if (todos.length === 0) {
            console.log("task logging: ");

            todoListEle.innerHTML = `<center>No todos have been added yet.</center>`;
            return;
        }
        renderAllTodos();
        // updateActivityLog();
    }

    function renderAllTodos() {
        // updateActivityLog();
        // trElem.draggable = "true";
        let table = document.getElementById("todoTable");
        todoListEle.innerHTML = "";
        todos.forEach((todo, index) => {

            todoListEle.innerHTML += `
            <tr class="indvl-task" id="${index}" draggable="true">
                <!-- checkbox -->
                <td style="width:2%" class="checkbox" data-action="check">
                    <i data-action="check" class="bi ${todo.checked ? 'bi-check-square-fill' : 'bi-square'}" style="color: #ffffff"></i>
                </td>
                <!-- title -->
                <td class ="task-text ${todo.checked ? 'checked' : ''}" type="text" id="inp${index}" data-action="check">
                        ${todo.title}
                </td>
                <!-- due date -->
                <td class ="task-text ${todo.checked ? 'checked' : ''}" data-action="check">
                    ${todo.dueDate}
                </td>
                <!-- category -->
                <td class ="task-text ${todo.checked ? 'checked' : ''}" data-action="check">
                        ${todo.category}
                </td>
                <!-- priority -->
                <td class ="task-text ${todo.checked ? 'checked' : ''}" data-action="check">
                        ${todo.priority}
                </td>
                <!-- tags -->
                <td class ="tags ${todo.checked ? 'checked' : ''}" data-action="check">
                    <ul id="listAllTags${index}">
                    </ul>
                </td>
                <!-- subtasks -->
                <td class ="sub-tasks ${todo.checked ? 'checked' : ''}" data-action="check">
                    <ul id="listAllSubtasks${index}">
                    </ul>
                </td>
                <!-- edit button -->
                <td class="edit-button" data-action="edit" >
                    <button data-action="edit" class="task-edit-button">
                        EDIT
                    </button>
                </td>
                <!-- delete button -->
                <td class="delete-button" data-action="delete">
                    <button data-action="delete" class="task-delete-button">
                        DELETE
                    </button>
                </td>
            </tr>
            <!-- <div class="indvl-task" id="${index}">
                <i class="bi ${todo.checked ? 'bi-check-square-fill' : 'bi-square'}" style="color: #ffffff" data-action="check"></i>
                <p class ="task-text ${todo.checked ? 'checked' : ''}" type="text" id="inp${index}" data-action="check">
                    ${todo.title}
                </p>
                <p>
                    <span id='date-time'>${todo.dueDate}</span>
                </p>
                <p>
                    ${todo.category}
                </p>
                <p>
                    ${todo.priority}
                </p>
                <div id="listAllTags${index}">
                </div>
                <div id="listAllSubtasks${index}">
                </div>
                <button data-action="edit" class="task-edit-button">
                    EDIT
                </button>
                <button data-action="delete" class="task-delete-button">
                    DELETE
                </button>
            </div> -->
            `
            const tagsListDiv = document.querySelector(`#listAllTags${index}`);
            todo.tag.forEach(tag => {
                tagsListDiv.innerHTML += `
                <li id="tagsListItem">
                    ${tag.title}
                </li>
                `
            });
            console.log("rendered tags, now rendering subtasks");
            const subtasksListDiv = document.querySelector(`#listAllSubtasks${index}`);
            todo.subtodo.forEach(subtask => {
                subtasksListDiv.innerHTML += `
                <li id="subtaskListItem">
                    <!-- <i data-action="check" class="bi ${todo.checked ? 'bi-check-square-fill' : 'bi-square'}" style="color: #ffffff"></i> -->
                    ${subtask.title}
                </li>`
            });
        });
        // updateActivityLog();
    }

    todoListEle.addEventListener('click', (e) => {
        const target = e.target;
        const parentEle = target.parentNode;
        if (parentEle.className !== 'indvl-task') return;
        const todo = parentEle;
        const todoId = Number(todo.id);
        const action = target.dataset.action;
        action === "edit" && editTodo(todoId);
        action === "delete" && deleteTodo(todoId);
        action === "check" && checkTodo(todoId);
    });

    function checkTodo(todoId) {
        console.log("starting edit")
        todos = todos.map((todo, index) => {
            if (index === todoId) {
                return {
                    ...todo,
                    checked: !todo.checked,
                }
            } else {
                return {
                    ...todo,
                    checked: todo.checked,
                }
            }
        })
        console.log("task logging: ");

        logActivity(`Task "${todos[todoId].title}" checked/unchecked`);
        // updateActivityLog();
        renderTodos();
    }

    function editTodo(todoId) {
        const inputField = document.getElementById("input-task-field");
        inputField.focus();
        inputTaskData.value = todos[todoId].title;
        selectedCategory.value = todos[todoId].category;
        selectedPriority.value = todos[todoId].priority;
        selectedDueDate.value = todos[todoId].dueDate;
        editTodoId = todoId;
        // updateActivityLog();
        renderTodos();
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log("task logging: ");

        logActivity(
            `Task " "${todos[todoId].title}" edited `
        );
        // updateActivityLog();
    }

    function deleteTodo(todoId) {
        logActivity(`Task "${todos[todoId].title}" deleted`);
        todos = todos.filter((todo, index) =>
            index !== todoId
        )
        editTodoId = -1;
        updateActivityLog();
        renderTodos();
        localStorage.setItem('todos', JSON.stringify(todos));
        updateActivityLog();
        console.log("task logging: ");


    }

    // function logActivity(type, activity, todoId, todo, message) {
    //     const timestamp = new Date().toISOString();
    //     const stringTime = timestamp.toLocaleString();
    //     arrayLoggingActivity.push({ stringTime, type, activity, todoId, todo, message });
    // }
});
