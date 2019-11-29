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
            "startTime": null,
            "endTime": null,
            "breaks": 0
        }
    ]*/

    //let taskList = localStorage.setItem()

    const $newTaskButton = $('#newTaskButton');
    const $newTaskForm = $('#newTaskForm');
    const $addTask = $('#addTask')
    const $nameInput = $('input:text');

    const $emptyName = $('#emptyNamePrompt');
    const $taskItems = $('#taskItems');

    $newTaskForm.show();
    $newTaskButton.hide();

    $newTaskForm.on('submit', (e) => {
        e.preventDefault();
        var newName = $nameInput.val();
        newName = jQuery.trim(newName);
        console.log(newName)
        console.log(newName.length) 
        if (newName === null || newName == "" || newName.length === 0) {
            emptyNamePrompt();
            console.log(typeof (newName));
        } else {
            newName = newName.charAt(0).toUpperCase() + newName.slice(1);
            $taskItems.after( //sets the task item on tasks display
                '<form>' +
                '<li class="task" id="${id}">' + newName +
                '<button type="submit" class="btn btn-default remove task-button" data-toggle="tooltip"  title="Remove task" id="${id} job="delete"><i class="fa fa-minus-circle task-icon"></i></button>' +
                '</li>' + '</form>');

            $newTaskForm.hide();
            $newTaskButton.show();
            $nameInput.val('');
        }
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






});