$(document).ready(function setProject() {

    /*Styles*/
    // save project button
    $("#save-tasks").css({
        "background-color": "rgb(5, 199, 5, .3",
        "border-style": "none",
        "box-shadow": "none"
    });

    $('#nameInput').css({
        "font-size": "1.2rem",
        "font-weight": "200",
        "padding": "0 0 0 .5rem",
        "box-shadow": "none"
    });


    // setting the project name title
    let project;
    if (localStorage.getItem('project')) {
        project = localStorage.getItem('project')
    } else {
        if (confirm('You forgot to give your project a name and "Create" it. Would you like to do it now?')) {
            location.href = 'index.html';
        } else {
            project = ('Unnamed project');
            localStorage.setItem('project', project);
        }
    }

    $(".project-title").text(project);

    //--------------------------------------------------------------------------------//
    //--------------------------------------------------------------------------------//
    //--------------------------------------------------------------------------------//
    
    //debug help
    const $emptyLoc = $('#emptyLocal');

    $emptyLoc.on('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        let localState = localStorage;
        console.log(localState)
    })



    // Selected elements



    const $newTaskButton = $('#newTaskButton'); // Initiates a new task entry
    const $newTaskForm = $('#newTaskForm'); // Form containing tasks input and add button
    const $addTask = $('#addTask') // BUTTON (+) TO SAVE THE TASK ON LOCAL
    const $nameInput = $('input:text'); // IS var task

    const $emptyName = $('#emptyNamePrompt'); // Prompt message when task input field is empty 
    const $taskItems = $('#taskItems'); // ul ELEMENT DISPLAYING THE taskLIST OF NEW TASKS
    const $removeTaskItem = $('.taskItem');

    // Beginning setup of the task form
    $newTaskForm.show();
    $newTaskButton.hide();

    // Variables
    let taskLIST, id;

    // get task item from the localStorage
    let data = localStorage.getItem("TASKS");

    // before entering anything new - check the state of the localStorage
    // if there is a list already existing, render it to the tasks display ($taskItems)
    if(data) {
        taskLIST = JSON.parse(data); // translate the JSON back to code
        id = Date.now().toString();
        loadTasks(taskLIST, id); // load the tasks to the display
    } else {
        taskLIST = []; // if no tasks, set taskLIST to an empty array
        id = Date.now().toString();
    }

    // load the tasks to the tasks display
    function loadTasks(array) {
        array.forEach((item) => {
            addToTasks(item.name, item.id, item.axed, item.start, item.end, item.elapsed, item.defaults);
        });
    };

    function addToTasks(task, id, axed) {

        if(axed){
        return;
        } else {

        const item = `<form class="removeForm"><li class="taskItem justify-content-between" id="${id}">
        <p class="taskName"> ${task} </p>
        <button type"submit" class="btn btn-default task-button remove" job="delete" id="${id}"><i class="fa fa-minus-circle task-icon remove"></i>
        </li></form>
        `;

        $taskItems.before(item);
        console.log(item);

        }
    };

    $newTaskForm.on('submit', (e) => {
        e.preventDefault();
        var task = $nameInput.val();
        task = jQuery.trim(task);
        if (task === null || task == "" || task.length === 0) {
            emptyNamePrompt();
            console.log('Name was not valid: name was empty string or no name was provided.');
        } else {
            task = task.charAt(0).toUpperCase() + task.slice(1);
          
            console.log(task);
            addToTasks(task, id, false, 0, 0, 0, false);
        
            taskLIST.push({ // List object to push each task to taskLIST
                name: task,
                id: Date.now().toString(),
                axed: false,
                start: 0,
                end: 0,
                elapsed: 0,
                defaults: false
            });
        
            localStorage.setItem("TASKS", JSON.stringify(taskLIST));
            $newTaskForm.hide();
            $newTaskButton.show();
            $nameInput.val('');
        }
    });
    
    function removeTask(element) {
        element.parentNode.parentNode.removeChild(element.parenNode);

        taskLIST[element.id].axed = true;
    }


    $removeTaskItem.on('submit', (e) => {
        e.preventDefault();
        alert ('submitted');
        const element = e.target;
        const elementJob = element.attributes.job.value;

        if(elementJob === 'delete') {
            removeTask(element);
        }

        localStorage.setItem("TASK", JSON.stringify(taskLIST));
    });


    $('#showTasks').on('click', () => {
        $newTaskButton.hide();
        $newTaskForm.show();
        $('.newTasks').scrollTop($('.newTasks')[0].scrollHeight);
    });


    /* Removing Tasks */

    $("#removeTask").on('submit', (e) => {
        e.preventDefault();
        $(this).remove(".task");
    });


    /* enable/ able */


    function emptyNamePrompt() {
        $emptyName.css({
            "display": "block"
        });

        $('#nameInput').css({
            "color": "red",
            "border-style": "none",
            "border-color": "none",
            "background-color": "transparent"
        });
        $('#nameInput').prop("disabled", true);
        $emptyName.on('click', function () {
            $emptyName.css({
                "display": "none"
            })
            $('input').css({
                "color": "rgb(33, 37, 41)",
                "border-style": "",
                "border-color": "",
                "background-color": ""
            });
            $('#nameInput').prop("disabled", false);
            $nameInput.val('');
        });
    };
console.table(taskLIST);

});