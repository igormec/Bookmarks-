

//Shows all bookmarks as a list of links
function showAll(){
	var allNodes = chrome.bookmarks.getTree(function(allNodes){
		$("#bm-list").append(parseNodes(allNodes));
	});
}

//Goes through the list returned by chrome.bookmarks.getTree()
function parseNodes(nodeList){
	var list = $("<ul>");
	for(var i = 0;i < nodeList.length;i++){
		list.append(showNode(nodeList[i]));
	}
	return list;
}

//Exxtracts the data from each individual bookmarkNode
function showNode(node){
	if(node.title){
		var anc = $("<a>");
		anc.attr("href", node.url);
		anc.text(node.title);
		var span = $("<span>");
		span.append(anc).append(" - " +new Date(node.dateAdded));
	}
	var li = $(node.title ? "<li>" : "<div>").append(span);
	
	//For folders, recurse into parseNodes to read the childrenNodeTree
	if (node.children && node.children.length > 0){
		li.append(parseNodes(node.children));
	}
	return li;
}

document.addEventListener('DOMContentLoaded', function () {
  showAll();
});