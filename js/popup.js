

var d = document,
createTask = d.getElementById('createTask');



createTask.addEventListener('click', createNewTab);
	

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





