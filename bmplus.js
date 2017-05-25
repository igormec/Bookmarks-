

/*function getMainSubTree() {
	var tree = chrome.bookmarks.getTree(
		function(tree){
			tree = tree.getChildren();
		});

	return tree;
}*/

//Shows all bookmarks as a list of links
/*function showAll(){
	var allNodes = chrome.bookmarks.getTree(function(allNodes){
		$("#bm-list").append(parseNodes(allNodes));
	});
}*/


function makeTable(nodeList) {
	var $table = $("#bmTable");
	$table.remove();
	$("body").append($("<table>", {"id":"bmTable"}))
	$table = $("#bmTable");
	$tbody = $("<tbody>");
	$table.append($tbody);
	//nuclear option
	//$table.html("");
	console.log(nodeList.length);

	for(var i = 0;i < (nodeList.length);i++){
		var node = nodeList[i];
		//Add a new row every 5 columns
		if(i % 5 == 0){
			var $row = $("<tr>");
			$tbody.append($row);
		}
		//Make a td
		//make the mainListItem div inside td
		var $td = $("<td>");

		if (node.title){
			console.log(node.title);
			$td.append(makeLinkDiv(node));
			
		}else{
			console.log("Group");
			$td.append(makeGroupDiv(node));
		}

		$row.append($td);
	}
	addEvents();
}



function makeLinkDiv(node){
	var $listDiv = $("<div>", {"class":"mainListItem", "id":node.id});
	var $span = $("<p>", {"class":"listItemLink"}).append(node.title);
	$listDiv.append($span);
	return $listDiv;
}

function makeGroupDiv(node){
	var $listDiv = $("<div>", {"class":"mainListItem", "id":node.id});
	$listDiv.append("Group");
	console.log($listDiv);
	return $listDiv;
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


function addEvents(){

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
			var node = chrome.bookmarks.getSubTree(this.id,
				function(node){
					console.log(node);
					node = node[0];
					//console.log(node.children);

					if (node.children){
						makeTable(node.children);
						//console.log("Has childs");
					}else{
						chrome.tabs.create({url: node.url});
					}
				});
			$(this).append("You clicked!");		
			
		}
	);
}

document.addEventListener('DOMContentLoaded', function () {
  	var tree = chrome.bookmarks.getTree(
  		//on load, tree is 0th/top node given in an array of length 1
  		//take children of tree[0] to get Bookmarks Bar and Other bookmarks
  		function(tree){
  			var mainBookmarksArray = tree[0].children;
  			makeTable(mainBookmarksArray);  				
  		}
	);
});