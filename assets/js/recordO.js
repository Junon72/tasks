$(document).ready(function setProject() {


    //STYLE
    $('.btn-success').css ({
        "background-color": "var(--clr-green)",
        "border-style": "none",
        "box-shadow": "none"
    });
    
    $('.btn-success:hover').css ({
        "background-color": "rgb(5, 199, 5, .3)",
        "border-style": "none",
        "box-shadow": "none"
    });

    // Variables
    var id, added;
    var time = Date();

    /* GET LOCAL STORAGE OBJECTS */
    var project = localStorage.getItem('project');

    // tasks

    var data = localStorage.getItem("TASKS");
    var taskLIST = JSON.parse(data);

    // default tasks

    var defData = localStorage.getItem("DEFAULTS");
    var defaults = JSON.parse(defData);
    console.log(defData);
    console.log(defaults)

    /* ---------------------------- Setup Recording ------------ */

    // Check if tasks were added 

    if (!taskLIST || taskLIST === null || taskLIST.length === 0) {
        console.log('There are no tasks added');
    } else {
        console.table(taskLIST);
        console.log('Tasks will be added to time recorder');
    };

    if (defData) { // if defaults have been already saved to local storage - load
        id = Date.now().toString();
        added = time.toLocaleString();
        loadDefaults(defaults, id);
        console.table(defaults);
        if (defaults.length !== 0) {
            console.log('Defaults were loaded successfully');
        } else {
            console.log('Error has ocurred: default tasks are missing');
        };
    } else { // if no defaults were saved before - save  
        time = new Date();
        added = time.toLocaleString();
        defaults = [{
                name: 'Project',
                id: id,
                added: added,
                start: 0,
                end: 0,
                elapsed: 0,
                breaks: 0,
                defaults: true
            },
            {
                name: 'Break',
                id: id,
                added: added,
                start: 0,
                end: 0,
                elapsed: 0,
                breaks: 0,
                defaults: true
            },
            {
                name: 'Lunch',
                id: id,
                added: added,
                start: 0,
                end: 0,
                elapsed: 0,
                breaks: 0,
                defaults: true
            }
        ];
        setDefaultsToLocal();
        console.table(defaults);
        if (defaults.length !== 0) {
            console.log('Defaults were loaded successfully');
        } else {
            console.log('Error has ocurred: default tasks are missing');
        };
    };

    function setDefaultsToLocal() {
        localStorage.setItem("DEFAULTS", JSON.stringify(defaults));
    };

    // load already saved defaults 
    function loadDefaults(array) {
        array.forEach((item) => {
            //addToTasks(item.name, item.id, item.added, item.axed, item.start, item.end, item.elapsed, item.breaks, item.defaults);
            setDefaultsToLocal(item.name, item.id, item.added, item.start, item.end, item.elapsed, item.counter, item.defaults);
        });
    };

    /* RENDER TASKS ON SCREEN */

    // new tasks - https://medium.com/@pearlmcphee/build-a-dynamic-app-using-javascript-html-and-css-f0dfc136007a

    const renderTasks = recorder => {

        function notify() { // notify if 'submit' event occurs and log the element id and class
            console.log('click event occurred on task', (event.target));
        };

        name = recorder.name;
        id = recorder.id;
        start = recorder.start;
        elapsed = recorder.elapsed;
        const $item = $(
            '<li class="col-12 d-flex recTask">' +
            '<button type="click" class="btn btn-success col-6" id="' + id + '">' + name +
            '</button>' +
            '<p class="startTaskTime taskTime col-3 pl-10" id="' + id + '">' + start +
            '</p>' +
            '<p class="elapsedTaskTime taskTime col-3 pl-10" id="' + id + '">' + elapsed +
            '</p>' +
            '</li>' +
            '<hr></hr>').on('click', (e) => {
            e.preventDefault();
            $('.recTaskButton').prop("disabled", false);
            $('.recTaskButton').removeClass('recTaskButton').addClass('btn-success');
        

            $(event.target).prop("disabled", true);
            $(event.target).removeClass('btn-success').addClass('recTaskButton');
           
            const storageKey = event.target.getAttribute('id');
            console.log(storageKey);
            notify();
        });
        $('#recordTasks').after($item);
    };
    taskLIST.forEach(recorder => renderTasks(recorder));


});