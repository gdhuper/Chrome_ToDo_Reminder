var popup = function() {
    "use strict"

    //defining global variables
    var tId = 0,
        tName = null,
        tDueDate = null,
        tUrl = null,
        tNotes = null,
        tPriority = null,
        tNotify = false,
        tNotifyUrl = false;

    var p = null; //to save priority from dropdown button


    //var ds = require('datastructures-js');
    //var pQueue = ds.priorityQueue();


    /*Index page variables*/
    var index = document,
        tasks = [],
        id = 0,
        idxHeading = index.getElementById('topTitle'),
        createTask = index.getElementById('createTask'),
        front = index.getElementById('frontPanel'),
        taskList = index.getElementById('taskList'),
        addTask = index.getElementById('addTask');

    /*add task variables*/
    var taskName = index.getElementById('inputTaskName'),
        inputDueTime = index.getElementById('inputDueTime'),
        url = index.getElementById('basic-url'),
        taskNotes = index.getElementById('taskNotes'),
        priority = index.getElementById('pButton'),
        notify = index.getElementById('notifyCheckBox'),
        notifyUrl = index.getElementById('notifyUrlCheckBox'),
        calIcon = index.getElementById('calIcon'),
        cancelButton = index.getElementById('cancelSave'),
        saveButtton = index.getElementById('saveTask');


    // creating task object (constructor)
    function createTaskObj(Id, name, dueDate, url, notes, priority, notify, notifyUrl) {
        console.log("creating task object");
        this.tId = Id;
        this.tName = name;
        this.tDueDate = dueDate;
        this.tUrl = url;
        this.tNotes = notes;
        this.tPriority = priority;
        this.tNotify = notify;
        this.tNotifyUrl = notifyUrl;



    }




    //Adding event listeners
    createTask.addEventListener('click', createNewTask);
    calIcon.addEventListener('click', popCal);
    cancelButton.addEventListener('click', displayTasks);
    saveButtton.addEventListener('click', saveTask);

    // drop down button text update 
    $('.dropdown-menu').on('click', 'a', function() {
        console.log("changing button text");

        var text = $(this).html();
        console.log(text);
        p = text;
        var option = text + ' <span class="caret"></span>';
        $(this).closest('.btn-group').find('.dropdown-toggle').html(option);


    });

    function saveTask() {
        console.log("calling save task");

        id += 1;
        var name = taskName.value;
        var dueDate = inputDueTime.value;
        var UrlToOpen = url.value;
        var notes = taskNotes.value;
        var pty = p;
        var nfy = (function() {

            if ($('#notifyCheckBox').is(':checked')) {
                return true;
            } else {
                return false;
            }

        })();
        var nfyUrl = (function() {
            if ($('#notifyUrlCheckBox').is(':checked')) {
                return true;
            } else {
                return false;
            }
        })();

        var task = new createTaskObj(id, name, dueDate, UrlToOpen, notes, pty, nfy, nfyUrl);

        //if(validateTask)
        //{
        //validateTask(task);
        addTaskToList(task);
        addTaskToArray(task);
        displayTasks();
        var str = JSON.stringify(task);

        console.log("printing task details :" + str);
        //	}

    }

    function validateTask(task) {
        if (isEmpty(task)) {
            console.log("Empty Fields! Please input a task")
        } else {
            console.log("Non empty")
        }
    }


    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    function resetFormFields() {
        console.log("reseting form");

        //Reseting form input fields
        document.getElementById("taskForm").reset();

        //Reseting checkboxes
        $('#notifyCheckBox').attr('checked', false);
        $('#notifyUrlCheckBox').attr('checked', false);

        //Reseting priority button value to None
        var option = 'None' + ' <span class="caret"></span>';
        $('.dropdown-menu').closest('.btn-group').find('.dropdown-toggle').html(option);


    }



    function addTaskToList(task) {
        $('#hiddenTaskList').addClass('hidden');
        $('#taskList').append("<tr id='" + task.tId + "'>" +
            "<td><a href='#'>" + task.tName + "</a></td>" +
            "<td>" + task.tDueDate + "</td>" +
            "<td>" + p + "</td>" +
            "<td>" +
            "<a href='#' class='edit'>Edit </a>" +
            "<a href='#' class='del'>Delete</a>" +
            "</td>" +
            "</tr>");
        id++;

        resetFormFields();

        console.log(p);
        console.log("printing checked " + task.tNotify);

    }

    function getCheckBoxValue(id) {
        if ($('#' + id).is(':checked')) {
            console.log("true");

            return true;
        } else {
            console.log("false");

            return false;
        }
    }


    function addTaskToArray(task) {
        for (t in tasks) {

            console.log("pushing task to array list");
            tasks.push(task);

        }
    }

    function displayTasks() {
        console.log("calling displayTasks")

        $('#frontPanel').removeClass('hidden');
        $('#topTitle').removeClass('hidden');
        $('#addTask').addClass('hidden');
    }

    function createNewTask() {
        console.log("calling create task");
        $('#frontPanel').addClass('hidden');
        $('#topTitle').addClass('hidden');
        $('#addTask').removeClass('hidden');

    }



    //$('#calIcon').addEventListener('click', popCal);
    function popCal() {
        console.log("picking time");
        $('#dueDateTime').datetimepicker({
            format: 'YYYY/MM/DD hh:mm A'
        });
    }

    //createTask.addEventListener('click', createNewTab);


    //var name = "time to pay bill";

    var alarmInfo = {
        when: Date.now() + 1000
    };


    function setAlarm() {
        // body...
        alert("setting up alarm");
        chrome.alarms.create(name, alarmInfo);
        alert("alarm went off")

    }




    function createNewTab() {
        var createProperties = {
            active: true,
            index: 1,
            //url: "https://www.google.com/",
            url: "http://singhgurpreet.us/"
        };
        chrome.tabs.create(createProperties, function(response) {
            if (response) {
                setAlarm();
                console.log("new window created");
            }
        });
    }


    function loadTaskList(tasks) {
        for (t in tasks) {
            addTaskToList(t);
        }
        displayTasks();
    }

    function Init() {
        loadTaskList();
    }
    return Init();


}

document.addEventListener('DOMContentLoaded', function() {
    popup();

});