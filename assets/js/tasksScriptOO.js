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

    /*let task 

    [
        {
            "id": id,
            "name": name,
            "startTime": 0,
            "endTime": 0,
            "breaks": 0,
            "axed": 0
        }
    ]*/

    //let taskList = localStorage.setItem()

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


    const $newTaskButton = $('#newTaskButton');
    const $newTaskForm = $('#newTaskForm');
    const $addTask = $('#addTask')
    const $nameInput = $('input:text');

    const $emptyName = $('#emptyNamePrompt');
    const $taskItems = $('#taskItems');

    // Beginning setup of the task form
    $newTaskForm.show();
    $newTaskButton.hide();

    // Variables
    let $taskLIST; 
    let id;

    // get task item from the localStorage
    //let data = localStorage.getItem("TASKS");

    // before entering anything new - check the state of the localStorage
    // if there is a list already existing, render it to the tasks display ($taskItems)
    //if(data) {
    //taskLIST = JSON.parse(data); // translate the JSON back to code
    //id = Date.now().toString();
    //loadTasks(taskLIST, id); // load the tasks to the display
    // } else {
    // taskLIST = []; // if no tasks, set taskLIST to an empty array
    // id = Date.now().toString();
    //  }


    $newTaskForm.on('submit', (e) => {
        e.preventDefault();
        var task = $nameInput.val();
        task = jQuery.trim(task);
        console.log(task)
        console.log(task.length)
        if (task === null || task == "" || task.length === 0) {
            emptyNamePrompt();
        } else {
            task = task.charAt(0).toUpperCase() + task.slice(1);
            id = Date.now().toString();

            console.log(task);
            id = Date.now().toString();
            addToTasks(task, id, false, 0, 0, 0, 0, false);

            taskLIST.push({ // List object to push each task to taskLIST
                name: task,
                id: id,
                axed: false,
                start: 0,
                end: 0,
                elapsed: 0,
                defaults: false
            });

                //try now
            const $item = ( //sets the task item on tasks display
                '<form id="' + id + '">' +
                '<li class="taskItem justify-content-between">' +
                '<p class="taskName">' + task +
                '</p>' +
                '<button type="submit" class="btn btn-default remove task-button" data-toggle="tooltip"  title="Remove task" id="' + id +'">' +
                '<i class="fa fa-minus-circle task-icon">' +
                '</i>' +
                '</button>' +
                '</li>' +
                '</form>'); 
            

            $taskItems.after($item);
            
            console.log($item)
            $newTaskForm.hide();
            $newTaskButton.show();
            $nameInput.val('');
        
        }
    });







    $('#showTasks').on('click', () => {
        $newTaskButton.hide();
        $newTaskForm.show();
    });


    /* Removing Tasks 

    $("#removeTask").on('submit', (e) => {
        e.preventDefault();
        $(this).remove(".task");
    });*/


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
        $emptyName.on('click', () => {
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






});