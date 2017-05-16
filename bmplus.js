

function showAll(){
	var allNodes = chrome.bookmarks.getTree();
	var list = $('<ul>');

	for(var i = 0; i < allNodes.length; i++){
		list.append()
	}
}



document.addEventListener('DOMContentLoaded', function () {
  showAll();
});