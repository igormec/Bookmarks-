

function showAll(){
	var allNodes = chrome.bookmarks.getTree(function(){
		$("#bm-list").append(allNodes);
		//console.log(allNodes);
	});

	/*var list = $('<ul>');

	for(var i = 0; i < allNodes.length; i++){
		list.append()
	}*/
}


/*function getAllNodes(){}*/



document.addEventListener('DOMContentLoaded', function () {
  showAll();
});