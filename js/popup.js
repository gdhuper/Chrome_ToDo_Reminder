var popup = function() {
    //  "use strict"

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

    var id = 0;
    /*Index page variables*/
    var index = document,
        tasks = [],
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

    //creates and saves a task in the storage 
    function saveTask() {
        console.log("calling save task");

        id += 1;
        var name = taskName.value;
        var dueDate = inputDueTime.value;
        var UrlToOpen = url.value;
        var notes = taskNotes.value;
        var pty;
        if (p == null) {
            pty = 'None';
        } else pty = p;

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

        if (validateTask(task)) {
            printTask(task);
            validateTask(task);
            addTaskToHTML(task);
            addTaskToArray(task);
            displayTasks();

            //printing contents of task objects
            var str = JSON.stringify(task);

            console.log("printing task details :" + str);
        }

    }


    function validateTask(task) {
        if (task == null) {
            console.log("Empty Fields! Please input a task");
            return false;
        } else {
            if (validName(task.tName) && validDueDate(task.tDueDate) && validUrl(task.tUrl)) {
                console.log("all fields validated");
                return true;
            }
            console.log("Non empty fields"); // for debugging 
        }
    }

    //check if name != empty
    function validName(name) {
        console.log("Calling validName");
        return true;

    }
    //check if date and time format is valid 
    function validDueDate(dueTime) {
        console.log("Calling validDueDate");
        return true;


    }

    //to validate url format 
    function validUrl(url) {
        console.log("Calling validUrl");
        return true;

    }

    //Test method to print task details 
    function printTask(task) {
        var tmp = JSON.stringify(task);
        console.log("printing task method \n" + tmp);
    }


    //adds task to index page
    function addTaskToHTML(task) {
        $('#hiddenTaskList').addClass('hidden');
        $('#taskList').append("<tr id='task" + task.tId + "'>" +
            "<td>" + task.tId + "</td>" +
            "<td><a href='#'>" + task.tName + "</a></td>" +
            "<td>" + task.tDueDate + "</td>" +
            "<td>" + task.tPriority + "</td>" +
            "<td>" +
            "<a href='#' id='" + "edit-" + task.tId + "' class='edit'>Edit </a>" +
            "<a href='#' id='" + "del-" + task.tId + "' class='del'>Delete</a>" +
            "</td>" +
            "</tr>");


        bindEventsToEditDel(task.tId);

        //reset form after appending task to list
        resetFormFields();

        //debugging message
        console.log("printing checked " + task.tNotify);

    }

    function bindEventsToEditDel(id) {
        var editBtn = document.getElementById("edit-" + id);
        editBtn.addEventListener("click", function() {
            showEditForm(id)
        });

        var delBtn = document.getElementById("del-" + id);
        delBtn.addEventListener("click", function() {
            bootbox.confirm({
                message: "Delete Task ?",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-danger'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-success'
                    }
                },
                callback: function(result) {
                    if (result)
                        deleteTask(id);
                    else console.log("dont delete task"); //debugging 
                }
            });

        });

    }

    //show edit form
    function showEditForm(id) {
        console.log("Calling showEditForm task Id =" + id);

    }

    //delete task and updates id (maybe)
    function deleteTask(id) {
        console.log("calling del task id=" + id);
        var task = getTaskFromList(id);
        console.log("deleting task=" + task);
        //deleteTaskfromList(task); //delete task from array
        deleteTaskfromHTML(task.tId); //delete task from HTML page
        //updateStorage(); //

    }

    function deleteTaskfromHTML(taskId) {
        console.log("removing task from table");
        var parent = document.getElementById("taskList");
        var child = document.getElementById("task" + taskId);
        var tempId = "#task" + taskId;
        $(tempId).remove();
        // console.log("deleting task " +tasks[i] + " from list");
        deleteandReorderTasks(taskId);


    }

    //Gets a task from list with a given id
    function getTaskFromList(id) {

        var tempTask;
        for (i = 0; i < tasks.length; i++) {
            if (tasks[i].tId == id) {
                tempTask = tasks[i];
                return tempTask;


            }
        }

    }

    function deleteandReorderTasks(index) {
        console.log("deleting and reordering")
        tasks.splice((index - 1), 1);
        for (i = 0; i < tasks.length; i++) {
            var tempId = tasks[i].tId;
            document.getElementById('task' + tempId).setAttribute('id', 'task' + (i + 1));
            tasks[i].tId = i + 1;
        }
        saveTaskList(tasks);
    }




    //adds task to array list 
    function addTaskToArray(task) {


        console.log("pushing task to array list");
        tasks.push(task);
        saveTaskList(tasks);

    }

    //toggle index page with task list
    function displayTasks() {
        console.log("calling displayTasks")

        $('#frontPanel').removeClass('hidden');
        $('#topTitle').removeClass('hidden');
        $('#addTask').addClass('hidden');

        //reset form fields if create task is cancelled  
        resetFormFields();

    }




    //saves task list in chrome storage
    function saveTaskList(tasksList) {
        // Get a value saved in a form.

        // Check that there's some code there.
        if (!taskList) {
            message('Error: No value specified');
            return;
        }
        // Save it using the Chrome extension storage API.
        chrome.storage.local.set({
            "list": tasksList
        }, function() {
            // Notify that we saved.
            console.log('tasks saved in storage');
        });
    }

    // load tasks from chrome storage
    function loadData() {
        console.log("loading data");
        var jsonData;
        chrome.storage.local.get("list", function(result) {
            //console.log(" printing result fron load data" +result);
            //tasks = result;
            jsonData = JSON.stringify(result);
            getTaskObject(jsonData);
            console.log("printing objs in loadData " + jsonData);
            //  tempList = result;
        });
        //return task objects as json data


    }


    //get task object from json object
    function getTaskObject(jsonObject) {

        console.log("printint tasks from gettask " + jsonObject);
        var array = JSON.parse(jsonObject);
        if (array.list != undefined) {
            for (var i = 0; i < array.list.length; i++) {
                var task = array.list[i];
                var tid = task.tId;
                var name = task.tName;
                var dueDate = task.tDueDate;
                var url = task.tUrl;
                var notes = task.tNotes;
                var priority = task.tPriority;
                var notify = task.tNotify;
                var notifyUrl = task.tNotifyUrl;

                var taskobj = new createTaskObj(tid, name, dueDate, url, notes, priority, notify, notifyUrl);

                addTaskToHTML(taskobj);
                addTaskToArray(taskobj);
                displayTasks();

                id += 1;


            }

        } else {
            console.log("No tasks to load!");
            return;
        }

    }

    //get values from check boxes 
    function getCheckBoxValue(id) {
        if ($('#' + id).is(':checked')) {
            console.log("true");

            return true;
        } else {
            console.log("false");

            return false;
        }
    }




    //reset all form fields after task is saved or cancelled 
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


    //toggle create task form 
    function createNewTask() {
        console.log("calling create task");
        $('#frontPanel').addClass('hidden');
        $('#topTitle').addClass('hidden');
        $('#addTask').removeClass('hidden');

    }


    //calling datetimepicker api
    function popCal() {
        console.log("picking time");
        $('#dueDateTime').datetimepicker({
            format: "MM/DD/'YY  hh:mm A"
        });
    }

    //var name = "time to pay bill";
    /*
    var alarmInfo = {
        when: Date.now() + 1000
    };

    function setAlarm() {
        // body...
        alert("setting up alarm");
        chrome.alarms.create(name, alarmInfo);
        alert("alarm went off")

    }*/

    /*function createNewTab() {
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
    }*/
    //test method to clear chrome storage 
    function clearStorage() {
        console.log("clearing storage data");
        chrome.storage.local.clear(function() {
            console.log("Storage cleared!");

        });
    }

    function Init() {
        loadData();
        // clearStorage();
    }
    return Init();

}

document.addEventListener('DOMContentLoaded', function() {
    popup();

});ter