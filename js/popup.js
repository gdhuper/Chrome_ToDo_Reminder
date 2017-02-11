var popup = function(){


	//var ds = require('datastructures-js');
	//var pQueue = ds.priorityQueue();

	/*Index page variables*/
	var index = {
		idxHeading: $('#topTitle'),
		createTask: $('#createTask'),
		front: $('#frontPanel'),
		addTask: $('#addTask'),
	};

	var addTaskPage = {
		taskName: $('#inputTaskName'),
		inputDueTime: $('#inputDueTime'),
		url: $('#basic-url'),
		taskNotes: $('#taskNotes'),
		priority: $('dropdown-menu'),
		notify: $('#notifyCheckBox'),
		notifyUrl: $('#notifyUrlCheckBox'),

	};

//cancel.addEventListener('click', cancelSaving);
calIcon.addEventListener('click', popCal);
createTask.addEventListener('click', addTaskToList);

function cancelSaving()
{
	console.log("callign cancelSaving")
	$('#frontPanel').remove('hidden');
	$('#topTitle').remove('hidden');

	$('#addTask').addClass('hidden');


}

function addTaskToList()
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



	//
	$('.dropdown-menu').on('click', 'a', function() {
		console.log("changing button text");

		var text = $(this).html();
		var option = text + ' <span class="caret"></span>';
		$(this).closest('.btn-group').find('.dropdown-toggle').html(option);


	});

}


var pop =  new popup();
pop();