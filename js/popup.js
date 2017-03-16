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


    var view_task_name = index.getElementById("view-task-name"),
        view_task_dueDate = index.getElementById("view-task-dueDate"),
        view_task_url = index.getElementById("view-task-url"),
        view_task_notes = index.getElementById("view-task-notes"),
        view_priority = index.getElementById("view-priority"),
        notifyCheckBox = index.getElementById("view_notifyCheckBox"),
        notifyUrlCheckBox = index.getElementById("view_notifyUrlCheckBox"),
        edit_Task_btn = index.getElementById("edit-task"),
        cancel_view = index.getElementById("cancel-view");




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
        $('#taskList').append("<tr t-id='" + task.tId + "'>" +
            "<td>" + task.tId + "</td>" +
            "<td><a href='#' class='view'>" + task.tName + "</a></td>" +
            "<td>" + task.tDueDate + "</td>" +
            "<td>" + task.tPriority + "</td>" +
            "<td>" +
            "<a href='#'  class='edit'>Edit </a>" +
            "<a href='#'  class='del'>Delete</a>" +
            "</td>" +
            "</tr>");



        //binding events to viewTask
        $('.view').off("click");
        $('.view').on("click", viewTask);

        //  bindEventsToEditDel(task.tId);
        $('.edit').off("click");
        $('.edit').on("click", editTask);

        //bind events to delete button
        $('.del').off("click");
        $('.del').on("click", deleteTask);

        //reset form after appending task to list
        resetFormFields();

        //debugging message
        console.log("printing checked " + task.tNotify);

    }

    function viewTask(e)
    {
        console.log("in viewTask");
        e.preventDefault();
        var _this = this;
        curId = $(_this).parents('tr').attr('t-id');
        console.log("viewing task id: " + curId);
        var tempTask;
        for(i = 0;i < tasks.length; i++)
        {
            if(tasks[i].tId == curId)
            {
                tempTask = tasks[i];
            }
        }

        if(tempTask)
        {  
        view_task_name.innerText = tempTask.tName;
        view_task_dueDate.innerText = tempTask.tDueDate;
        view_task_url.innerText = tempTask.tUrl;
        view_task_notes.innerText = tempTask.tNotes;
        view_priority = tempTask.tPriority;
        if(tempTask.tNotify == true)
        {
            console.log("in true");
         $("#view_notifyCheckBox").prop("checked", true);

        
        }
        if(tempTask.tNotifyUrl == true)
        {
        $("#view_notifyUrlCheckBox").prop("checked", true);
        }
    
        edit_Task_btn.addEventListener('click', function()
            {
                editTask(tempTask.tId);
            });
        cancel_view.addEventListener('click', cancelViewTask);
           //display task 
            viewTaskDetails();
        }

    }

    function cancelViewTask()
    {
        view_task_name.innerText = "";
        view_task_dueDate.innerText = "";
        view_task_url.innerText = "";
        view_task_notes.innerText = "";
        view_priority = "";
        $('#task-view').addClass('hidden');
        $('#frontPanel').removeClass('hidden');
        $('#topTitle').removeClass('hidden');
    }

    function viewTaskDetails()
    {
        $('#task-view').removeClass('hidden');
        $('#frontPanel').addClass('hidden');
        $('#topTitle').addClass('hidden');
    }


    //deletes a task from table and array 
    function  deleteTask(e) {
        e.preventDefault();
        var _this = this;

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
                if (result) {
                    curId = $(_this).parents('tr').attr('t-id');
                    console.log('in del temp: id : ' + curId);
                    $(_this).parents('tr').remove();
                    for (i = 0; i < tasks.length; i++) {
                        if (tasks[i].tId == curId) {
                            tasks.splice(i, 1);
                            break;
                        }
                    }
                    saveTaskList(tasks);

                    if (tasks.length == 0) {
                        id = 0;
                        $('#hiddenTaskList').removeClass('hidden');
                        saveTaskList(tasks);
                        return;
                    }
                } else console.log("dont delete task"); //debugging 
            }
        });
    }




    //show edit form
    function editTask(id) {
        console.log("Calling showEditForm task Id =" + id);

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
        //clearStorage();

    }
    return Init();


}

document.addEventListener('DOMContentLoaded', function() {
    popup();

});