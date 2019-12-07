$(document).ready(function setProject() {

    /* --------------------------- task.html page --------------------------- */
    /* STYLES */

    /*Styles*/
    // save project button
    $("#save-tasks").css({
        "background-color": "rgb(5, 199, 5, .3",
        "border-style": "none",
        "box-shadow": "none",
        "cursor": "default"
    });

    $('#nameInput').css({
        "font-size": "1.2rem",
        "font-weight": "200",
        "padding": "0 0 0 .5rem",
        "box-shadow": "none"
    });

    /* SETUP PROJECT TITLE FOR ADD TASKS */
    // get the project name title
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


    // setting the start project button activation function

    function activateStartRecordingButton() {
        $("#toRecord").attr("href", "recordO.html");
        $('#save-tasks').css({
            "cursor": "pointer",
            "background-color": "var(--clr-green)",
            "border-color": "rgb(30,126,52)"
        });
       //$('#save-tasks').on('click', () => {
            //setupRecord();
        //});
    };

    function deactivateStartRecordingButton() {
        $("#toRecord").removeAttr("href");
        $('#save-tasks').css({
            "cursor": "default",
            "background-color": "rgb(5, 199, 5, .3",
            "border-color": "var(--clr-green)"
        });
        $('#save-tasks').off('click');
    };

    //--------------------------------------------------------------------------------//
    //--------------------------------------------------------------------------------//
    //--------------------------------------------------------------------------------//

    //debug help - exit sign empties the local storage
    const $emptyLoc = $('#emptyLocal');

    $emptyLoc.on('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        let localState = localStorage;
        console.log(localState)
    });


    // Dynamic list with local storage - https://www.taniarascia.com/how-to-use-local-storage-with-javascript/
    // Selected elements

    const $newTaskButton = $('#newTaskButton'); // Initiates a new task entry
    const $newTaskForm = $('#newTaskForm'); // Form containing tasks input and add button
    const $nameInput = $('input:text'); // IS var task

    const $emptyName = $('#emptyNamePrompt'); // Prompt message when task input field is empty 
    const $dupleName = $('#duplicateNamePrompt'); // Prompt message when task name already exists in a list 
    const $taskItems = $('#taskItems'); // <ul> element to display list of new tasks - taskLIST



    // Beginning setup of the task form
    $newTaskForm.show();
    $newTaskButton.hide();

    // Variables
    var id, added, task;
    var time = Date();

    // get task item from the localStorage
    var data = localStorage.getItem("TASKS");
    var taskLIST = JSON.parse(data);



    // before entering anything new - check the state of the localStorage
    // if there is a list already existing, render it to the tasks display ($taskItems)

    (function () {
        time = Date();
        var initTasks = time.toLocaleString();
        if (!taskLIST) {
            console.log(initTasks);
            console.log('No entries have been submitted to the task list yet');
        } else if (taskLIST.length === 0) {
            console.log('Task list is empty');
            deactivateStartRecordingButton();
        } else {
            added = time.toLocaleString();
            console.log('At ' + added);
            console.log('Following task item entries were added to the task list from local storage');
            console.table(taskLIST);
            activateStartRecordingButton();
        };
    })();

    // before entering anything new - check the state of the localStorage
    // if there is a list already existing, render it to the tasks display ($taskItems)
    if (data) {
        id = Date.now().toString();
        added = time.toLocaleString();
        loadTasks(taskLIST, id); // load the tasks to the display
        console.log(data);
    } else {
        taskLIST = []; // if no tasks, set taskLIST to an empty array
        id = Date.now().toString();
        added = time.toLocaleString();
    };


    // load tasks saved to the local storage to the tasks display -> add items and execute addToTask function
    function loadTasks(array) {
        array.forEach((item) => {
            //addToTasks(item.name, item.id, item.added, item.axed, item.start, item.end, item.elapsed, item.breaks, item.defaults);
            addToTasks(item.name, item.id, item.added, item.start, item.end, item.elapsed, item.breaks, item.defaults);
        });
    };

    // function to add tasks to the task list - taskLIST
    function addToTasks(task, id) {


        function notify() { // notify if 'submit' event occurs and log the element id and class
            console.log('Submit event occurred and a form', (event.target), 'was activated')
        };
        const $item = $( //sets the task item on tasks display
            '<form class="deleteForm" id="' + id + '">' +
            '<li class="taskItem justify-content-between">' +
            '<p class="taskName">' + task +
            '</p>' +
            '<button type="submit" class="btn btn-default remove task-button" data-toggle="tooltip"  title="Remove task">' +
            '<i class="fa fa-minus-circle task-icon">' +
            '</i>' +
            '</button>' +
            '</li>' +
            '</form>').on('submit', (e) => {
            e.preventDefault();
            notify();
            const storageKey = event.target.getAttribute('id');
            $(event.target).remove();
            const targetTask = taskLIST.find(xitem => xitem.id === storageKey);

            const location = taskLIST.indexOf(targetTask);
            console.log('Confirming the activated element id ' + storageKey + ' is the localStorage key for the task entry ' + targetTask.name);
            console.log('Confirming entry name ' + targetTask.name + ' with entry id ' + targetTask.id + ' at index location ' + location + ' was removed!');
            console.log(targetTask);
            // Removed code block was used to test the target
            //targetTask['axed'] = true; 
            //console.table(taskLIST);


            taskLIST.splice(location, 1);
            localStorage.setItem("TASKS", JSON.stringify(taskLIST));
            if (taskLIST.length === 0) {
                console.log('Tasks list is currently empty.');
                deactivateStartRecordingButton();

            } else {
                console.log('Current task items saved to the local storage after task item was removed.');
                console.table(taskLIST);
            };
        });
        $taskItems.before($item);
        activateStartRecordingButton();

    };


    //};


    $newTaskForm.on('submit', (e) => {
        e.preventDefault();
        task = $nameInput.val();
        task = jQuery.trim(task); // trims white space from front and back of the new name
        task = task.charAt(0).toUpperCase() + task.slice(1); // Capitalizes the first letter

                // validation of the provided entry - null or empty string/ duplicate name

        if (task === null || task == "" || task.length === 0) {
            emptyNamePrompt();
            console.log('Name was not valid: name was empty string or no name was provided.');
        } else if (isNameDuplicate() === true) {
            nameIsDuplicatePrompt();
            console.log('Name was not valid: name "' + task + '" already exists.');
        } else {

            function notify() { // notify if 'submit' event occurs and log the element id and class
                console.log('New task entry ' + task + ' was submitted to the task list via ', (event.target))
            };

            notify();

            id = Date.now().toString();
            time = new Date();
            added = time.toLocaleString();
            //console.log(added);

            //addToTasks(task, id, 0, false, 0, 0, 0, 0, false);
            addToTasks(task, id, 0, 0, 0, 0, 0, false);

            taskLIST.push({ // List object to push each task to taskLIST
                name: task,
                id: id,
                added: added,
                //axed: false,
                start: '00:00',
                end: '00:00',
                elapsed: '00:00',
                breaks: '00:00',
                defaults: false
            });

            localStorage.setItem("TASKS", JSON.stringify(taskLIST));
            $newTaskForm.hide();
            $newTaskButton.show();
            $nameInput.val('');

            //console.log('Current task items saved to the local storage after add event.');
            console.table(taskLIST);
        };
    });

    // display the new task button after submitting a task item to the list

    $('#showTasks').on('click', (e) => {
        e.preventDefault();
        $newTaskButton.hide();
        $newTaskForm.show();
    });

    /* Is new task name a duplicate test */
    // the test is referenced from https://www.tutorialrepublic.com/faq/how-to-check-if-an-array-includes-an-object-in-javascript.php

    function isNameDuplicate() {

        if (taskLIST.some(taskLIST => taskLIST.name === task)) {
            return true;
        } else {
            return false;
        }
    };


    /* Empty Name Prompt */


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

    /* Duplicate name prompt */

    function nameIsDuplicatePrompt() {
        $dupleName.css({
            "display": "block"
        });
        $('#nameInput').css({
            "color": "red",
            "border-style": "none",
            "border-color": "none",
            "background-color": "transparent"
        });
        $('#nameInput').prop("disabled", true);
        $dupleName.on('click', function () {
            $dupleName.css({
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
});