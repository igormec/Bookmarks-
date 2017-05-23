



//Shows all bookmarks as a list of links
function showAll(){
	var allNodes = chrome.bookmarks.getTree(function(allNodes){
		$("#bm-list").append(parseNodes(allNodes));
	});
}

//Goes through the list returned by chrome.bookmarks.getTree()
function parseNodes(nodeList){
	//var list = $("<ul>");

	/*for(var i = 0;i < Math.ceil(nodeList.length/4);i++){

		var row = $("<tr>");
		for(var j = 0; j < 4;j++){
			row.append(showNode(nodeList[i]));
	}
	return list;*/
}

//Extracts the data from each individual bookmarkNode
function showNode(node){
	if(node.title){
		/*var anc = $("<a>");
		anc.attr("href", node.url
		anc.text(node.title);
		var span = $("<span>");
		span.append(anc).append(" - " +new Date(node.dateAdded));*/

		var span = $("<span>");
		var td = $("<td>");
		td.text(node.title);

	}
	//var li = $(node.title ? "<li>" : "<div>").append(span);
	
	//For folders, recurse into parseNodes to read the childrenNodeTree
	if (node.children && node.children.length > 0){
		li.append(parseNodes(node.children));
	}
	return li;
}

document.addEventListener('DOMContentLoaded', function () {
  	showAll();

  	$(".mainListItem").hover(
		function() {
			
			//$(this).animate({"opacity":0}, 1000);
			$(this).animate({"backgroundColor":"#252525"}, 100);
		},
		function() {
			$(this).animate({"backgroundColor":"#494949"}, 100);
		}
	);
	

})