

function getMainSubTree() {
	var tree = chrome.bookmarks.getTree(
		function(tree){
			tree = tree.children;
		});

	return tree;
}

//Shows all bookmarks as a list of links
/*function showAll(){
	var allNodes = chrome.bookmarks.getTree(function(allNodes){
		$("#bm-list").append(parseNodes(allNodes));
	});
}*/


function makeTable(nodeList) {
	
	
	var $table = $("#bmTable");
	$table.remove();
	//nuclear option
	//$table.html("");
	console.log(nodeList.length);

	for(var i = 0;i < (nodeList.length);i++){

		var node = nodeList[i];

		if(i % 4 == 0){
			var $row = $("<tr>");	
		}
		
		//Make a td
		//make the mainListItem div inside td

		var $td = $("<td>");

		if (node.title){
			$td.append(makeLinkDiv(node));
			console.log(node.title);
		}else{
			console.log("Group");
			$td.append(makeGroupDiv);
		}
	}
}

//Goes through the list returned by chrome.bookmarks.getTree()
function parseNodes(nodeList){
	var $table = $("#bmTable");

	for(var i = 0;i < Math.ceil(nodeList.length/4);i++){

		var $row = $("<tr>");
		for(var j = 0; j < 4;j++){
			$row.append(showNode(nodeList[i]));
		}
	}
	return list;
}

//Extracts the data from each individual bookmarkNode
function showNode(node){
	if(node.title){
		/*var anc = $("<a>");
		anc.attr("href", node.url
		anc.text(node.title);
		var span = $("<span>");
		span.append(anc).append(" - " +new Date(node.dateAdded));*/

		var $listDiv = $("<div>", {"class":"mainListItem"});
		$listDiv.append(node.title);
		var $td = $("<td>");
		$td.append($listDiv);

	}
	//var li = $(node.title ? "<li>" : "<div>").append(span);
	
	//For folders, recurse into parseNodes to read the childrenNodeTree
	if (node.children && node.children.length > 0){
		li.append(parseNodes(node.children));
	}
	return li;
}

document.addEventListener('DOMContentLoaded', function () {
  	//showAll();

  	var tree = chrome.bookmarks.getTree(
  		function(tree){
  			makeTable(tree)	
  		}
	);
  	


  	$(".mainListItem").hover(
		function() {
			$(this).animate({"backgroundColor":"#252525"}, 100);
		},
		function() {
			$(this).animate({"backgroundColor":"#494949"}, 100);
		}
	);

	$(".mainListItem").click(
		function() {
			$(this).append("You clicked!");		
			
		}
	);
	

});