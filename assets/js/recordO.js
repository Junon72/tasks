$(document).ready(function setProject() {

    /* PAGE SETUP */

    /* STYLE */

    /* DATE */

    const date = () => $('#date').text(moment().format('ll'));
    date();



    /* DAY & TIME */
    let clock = () => $('#dayTime').text(moment().format('ddd HH:mm A'));

    setInterval(clock, 1000);


    /* SETUP PROJECT TITLE FOR RECORD TASKS */
    // get the project name title
    let project = localStorage.getItem('project');

    $("#rec-project-title").text(project);

    var id, added;
    var time = Date();

    /* GET LOCAL STORAGE OBJECTS */

    // tasks

    var data = localStorage.getItem("TASKS");
    var taskLIST = JSON.parse(data);

    // default tasks

    var defData = localStorage.getItem("DEFAULTS");
    var defaults = JSON.parse(defData);
    console.log('Tasks are ready to be loaded')
    //console.log(defData);
    //console.log(defaults)

    /* ---------------------------- Setup Recording ------------ */

    // Check if tasks were added 

    if (!taskLIST || taskLIST === null || taskLIST.length === 0) {
        console.log('There are no tasks added');
        
    } else {
        console.table(taskLIST);
        console.log('Tasks are added to time recorder');
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
                start: "00:00",
                end: "00:00",
                elapsed: "00:00",
                breaks: 0,
                defaults: true
            },
            {
                name: 'Break',
                id: id,
                added: added,
                start: "00:00",
                end: "00:00",
                elapsed: "00:00",
                breaks: 0,
                defaults: true
            },
            {
                name: 'Lunch',
                id: id,
                added: added,
                start: "00:00",
                end: "00:00",
                elapsed: "00:00",
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
    function notify() { // notify if 'submit' event occurs and log the element id and class
        console.log('Click event occurred on task', (event.target));
    };

    const renderTasks = recorder => {


        name = recorder.name;
        id = recorder.id;
        const startId = id + 1;
        const elapsedId = id + 2;
        start = recorder.start;
        elapsed = recorder.elapsed;
        var $item = $(
            '<li class="col-12 d-flex recTask">' +
            '<button type="click" class="btn btn-success col-6" id="' + id + '">' + name +
            '</button>' +
            '<p class="startTaskTime taskTime col-3 pl-10" id="' + startId + '">' + start +
            '</p>' +
            '<p class="elapsedTaskTime taskTime col-3 pl-10" id="' + elapsedId + '">' + elapsed +
            '</p>' +
            '</li>' +
            '<hr></hr>').on('click', (e) => {
            e.preventDefault();
            $('.recTaskButton').prop("disabled", false);
            $('.recTaskButton').removeClass('recTaskButton').addClass('btn-success');
            $('.taskTime').removeClass('timeColor');

            $(event.target).prop("disabled", true);
            $(event.target).removeClass('btn-success').addClass('recTaskButton');
            $(event.target).siblings('.taskTime').addClass('timeColor');


            const storageKeyButton = event.target.getAttribute('id');
            console.log('This object ID is ' + storageKeyButton);
            const startElement = $(event.target).siblings('.startTaskTime');
            console.log(startElement);
            const elapsedElement = $(event.target).siblings('.elapsedTaskTime');
            console.log(elapsedElement);
            notify(startElement, elapsedElement);
        });
        $('#recordTasks').after($item);
    };
    taskLIST.forEach(recorder => renderTasks(recorder));
    renderDefaults();


    /*SET THE DEFAULTS*/
    //const renderDefaults = defaultsRecorder


    function renderStart() {

    }

    function renderDefaults() {

        const startProject = defaults[0]["start"];
        const elapsedProject = defaults[0]["elapsed"];
        const startLunch = defaults[1]["start"];
        const elapsedLunch = defaults[1]["elapsed"];
        const startBreak = defaults[2]["start"];
        const elapsedBreak = defaults[2]["elapsed"];

        $("#startProject").text(startProject)
        $("#elapsedProject").text(elapsedProject)
        $("#startLunch").text(startLunch)
        $("#elapsedLunch").text(elapsedLunch)
        $("#startBreak").text(startBreak)
        $("#elapsedBreak").text(elapsedBreak)

    };


    $('h5.tasksHeader').on('click', (e) => {
        e.preventDefault();
        $('.defaults-container-bottom').toggleClass('showDefaults');
    })

    $('#recLunch').on('click', (e) => {
        e.preventDefault();
        $('.recTaskButton').prop("disabled", false);
        $('.recTaskButton').removeClass('recTaskButton').addClass('btn-success');
        $('.taskTime').removeClass('timeColor');

        $('#recLunch').prop("disabled", true);
        $('#recLunch').removeClass('btn-success').addClass('recTaskButton');
        $('#recLunch').siblings('.taskTime').addClass('timeColor');
        notify();
    });

    $('#recBreak').on('click', (e) => {
        e.preventDefault();
        $('.recTaskButton').prop("disabled", false);
        $('.recTaskButton').removeClass('recTaskButton').addClass('btn-success');
        $('.taskTime').removeClass('timeColor');

        $('#recBreak').prop("disabled", true);
        $('#recBreak').removeClass('btn-success').addClass('recTaskButton');
        $('#recBreak').siblings('.taskTime').addClass('timeColor');
        notify();
    });
});

