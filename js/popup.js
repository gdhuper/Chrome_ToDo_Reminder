

var d = document,
createTask = d.getElementById('createTask');



createTask.addEventListener('click', createNewTab);
	

function createNewTab()
{
var createProperties = {
    active: true,
    index: 1,
    url: "https://www.google.com/"
  };
	chrome.tabs.create(createProperties, function(response)
	{
		if(response)
		{
			console.log("new window created");
		}
	});
}





