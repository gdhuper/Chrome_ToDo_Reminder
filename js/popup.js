var popup = function(){


	//var ds = require('datastructures-js');
	//var pQueue = ds.priorityQueue();
	var p = null;

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
	var addTaskPage = 
		taskName = index.getElementById('inputTaskName'),
		inputDueTime = index.getElementById('inputDueTime'),
		url = index.getElementById('basic-url'),
		taskNotes = index.getElementById('taskNotes'),
		priority = index.getElementById('pButton'),
		notify = index.getElementById('notifyCheckBox'),
		notifyUrl = index.getElementById('notifyUrlCheckBox'),
		calIcon = index.getElementById('calIcon'),
		cancelButton = index.getElementById('cancelSave'),
		saveButtton = index.getElementById('saveTask');

	// task object
	var task = {
		tId: 0,
		tName: "",
		tDueDate: "",
		tUrl: "",
		tNotes: "",
		tPriority: "None",
		tNotify: false,
		tNotifyUrl: false
	};


//
createTask.addEventListener('click', createNewTask);
calIcon.addEventListener('click', popCal);
cancelButton.addEventListener('click', cancelSaving);
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

function saveTask()
{
	console.log("calling save task");
	
	task.tId = id + 1;
	task.tName = taskName.value;
	task.tDueDate = inputDueTime.value;
	task.tUrl = url.value;
	task.tNotes = taskNotes.value;
	tPriority = p;
	tNotify = notify.value;
	tNotifyUrl = notifyUrl.value;

	addTaskToList(task);
	cancelSaving();

	
}



function addTaskToList(task){
		//var lineThrough = task.isRunned ? 'text-decoration: line-through;':'';
		$('#hiddenTaskList').addClass('hidden');
		$('#taskList').append("<tr id='" + task.tId + "'>" +
							"<td><a href='#'>" + task.tName + "</a></td>" +
							"<td>" + task.tDueDate + "</td>" +
						"</tr>");
		id++;

		console.log(p);
	}
function cancelSaving()
{
	console.log("callign cancelSaving")

	$('#frontPanel').removeClass('hidden');
	$('#topTitle').removeClass('hidden');
	$('#addTask').addClass('hidden');

	//url.value = "";




}

function createNewTask()
{
	console.log("calling create task");
	$('#frontPanel').addClass('hidden');
	$('#topTitle').addClass('hidden');
	$('#addTask').removeClass('hidden');
	
}



	//$('#calIcon').addEventListener('click', popCal);
	function popCal()
	{
		console.log("picking time");
		$('#dueDateTime').datetimepicker({
			format: 'YYYY/MM/DD hh:mm A'
		});
	}

	//createTask.addEventListener('click', createNewTab);


	var name = "time to pay bill";

	var alarmInfo = {
		when: Date.now() + 1000
	};


	function setAlarm() {
		// body...
		alert("setting up alarm");
		chrome.alarms.create(name, alarmInfo);
		alert("alarm went off")

	}

	


	function createNewTab()
	{
		var createProperties = {
			active: true,
			index: 1,
	    //url: "https://www.google.com/",
	    url: "http://singhgurpreet.us/"
	};
	chrome.tabs.create(createProperties, function(response)
	{
		if(response)
		{
			setAlarm();
			console.log("new window created");
		}
	});
}



	
}


popup();
