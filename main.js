
var containerElt = document.getElementById("container");
var tilesElts = document.getElementsByClassName("tile");
var rowsElts = document.getElementsByClassName("row");

var activity;

var currentTileX;
var currentTileY;

var blackedTilesArray = [];


var inp = document.getElementsByTagName('input');
for (var i = inp.length-1; i>=0; i--) {
if ('radio'===inp[i].type) inp[i].checked = false;
}
var compteur = 0;

function fillContainerWithTiles() {
	var activityInputElmts = document.getElementsByClassName("activity");
	for(cpt = 0; cpt < activityInputElmts.length; cpt++) {
		if(activityInputElmts[cpt].checked) {
			activity = activityInputElmts[cpt].value;
		}

	}

	var sizeInputElts = document.getElementsByClassName("size");
	for(cpt = 0; cpt < sizeInputElts.length; cpt++) {
		if(sizeInputElts[cpt].checked) {
			var tilesNumberPerRow = sizeInputElts[cpt].value;
		}

	}

	compteur++;
	console.log(compteur);
	var tileSize = parseInt(window.innerWidth/tilesNumberPerRow)+1;
	var rowNumber = parseInt(window.innerHeight/tileSize)+1;
	// console.log(tileSize, rowNumber, (window.innerHeight/rowNumber),tilesNumberPerRow);

	containerElt.innerHTML ="";
	for (cpt = 0; cpt < rowNumber; cpt++) {
		let newRow = document.createElement("div");
		newRow.style.height = tileSize + "px";
		newRow.classList.add("row");
		containerElt.appendChild(newRow);

		for (cpt2 = 0; cpt2 < tilesNumberPerRow; cpt2++) {
			var newTile = document.createElement("div");
			newTile.style.width = tileSize + "px";
			newTile.dataset.y = cpt;
			newTile.dataset.x = cpt2;
			newTile.id = "x" + cpt2 + "y" + cpt;
			// console.log(newTile.id);
			newTile.classList.add("tile");
			newRow.appendChild(newTile);
			switch(activity) {
				case "PinkVelvet":
					newTile.classList.add("tile1");
					newTile.addEventListener("mouseover", onmouseoverTile);
					newTile.addEventListener("mouseout", onmouseoverTile);
					break;
				case "BigArrow":
					newTile.classList.add("tile2");
					newTile.addEventListener("click", onclickTile);
					newTile.addEventListener("mouseover", onmouseoverTile2);
					// blackedTilesArray = [];
					break;
				case "Paint":
					newTile.classList.add("tile4");
					// newTile.addEventListener("click", onclickTile);
					newTile.addEventListener("mouseover", onmouseoverTile3);
					// blackedTilesArray = [];
					break;
				case "slidingPanel":
					newTile.classList.add("tile2");
					newTile.addEventListener("mouseenter", onmouseoverTile2);
					var overlay = document.createElement("div");
					overlay.id = newTile.id + "Ol";
					overlay.classList.add("overlay");
					newTile.appendChild(overlay);
				break;
				default:
					// code block
			}
			
		}
	}
	if (activity == "Paint") {
		setPaletteTile(cpt, cpt2);
		bgCol ='';
	}
}

function onmouseoverTile(event) {
	// console.log(directionX, directionY);
	event.target.classList.toggle("hover");
	currentTileX = parseInt(event.target.dataset.x);
	currentTileY = parseInt(event.target.dataset.y);

	for (cpt = 0; cpt < tilesElts.length; cpt++) {
		if (
			tilesElts[cpt].dataset.y == currentTileY && (tilesElts[cpt].dataset.x == currentTileX - 1 || tilesElts[cpt].dataset.x == currentTileX + 1)
			||
			tilesElts[cpt].dataset.x == currentTileX && (tilesElts[cpt].dataset.y == currentTileY - 1 || tilesElts[cpt].dataset.y == currentTileY + 1)
			||
			(tilesElts[cpt].dataset.x == currentTileX - 1 || tilesElts[cpt].dataset.x == currentTileX + 1) && (tilesElts[cpt].dataset.y == currentTileY - 1 || tilesElts[cpt].dataset.y == currentTileY + 1)
		) 

		{
			// console.log(tilesElts[cpt].dataset.y, tilesElts[cpt].dataset.x, currentTileY, currentTileX)
			tilesElts[cpt].classList.toggle("hover2");
		}
		if (
			tilesElts[cpt].dataset.y == currentTileY && (tilesElts[cpt].dataset.x == currentTileX - 2 || tilesElts[cpt].dataset.x == currentTileX + 2)
			||
			tilesElts[cpt].dataset.x == currentTileX && (tilesElts[cpt].dataset.y == currentTileY - 2 || tilesElts[cpt].dataset.y == currentTileY + 2)
			||
			(tilesElts[cpt].dataset.x == currentTileX - 1 || tilesElts[cpt].dataset.x == currentTileX + 1) && (tilesElts[cpt].dataset.y == currentTileY - 2 || tilesElts[cpt].dataset.y == currentTileY + 2)
			||
			(tilesElts[cpt].dataset.x == currentTileX - 2 || tilesElts[cpt].dataset.x == currentTileX + 2) && (tilesElts[cpt].dataset.y == currentTileY - 1 || tilesElts[cpt].dataset.y == currentTileY + 1)
		) 

		{
			// console.log(tilesElts[cpt].dataset.y, tilesElts[cpt].dataset.x, currentTileY, currentTileX)
			tilesElts[cpt].classList.toggle("hover3");
		}
	}
}

var mouseX = 0;
var mouseY = 0;
var directionX;
var directionY;
var tilesOverNumber = 0;

function onmousemoveCont(event) {
}

var prevTile;
var prevPrevTile;

function onmouseoverTile2(event) {

	tilesOverNumber++;
	if (tilesOverNumber % 2 == 0 && activity == "BigArrow") {
		return;
	}
	var prevMouseX = parseInt(mouseX);
	var prevMouseY = parseInt(mouseY);
	mouseX = parseInt(event.target.dataset.x);
	mouseY = parseInt(event.target.dataset.y);
	directionX = "dx";
	directionY = "dy";
	
	var mainDirection;
	
	if(mouseX > prevMouseX) {
		directionX = "right";
	} 
	else if(mouseX < prevMouseX) {
		directionX = "left";
	}
	if(mouseY > prevMouseY) {
		directionY = "down";
	} 
	else if(mouseY < prevMouseY) {
		directionY = "up";
	}

	if(directionY == "dy") {
		mainDirection = directionX;
	}
	else if(directionX == "dx") {
		mainDirection = directionY;
	}
	else {
		mainDirection = directionX + directionY;
	}


	// console.log(mainDirection);
	if (activity == "BigArrow") {
		showArrow(mainDirection);
		return;
	}
	if (activity == "slidingPanel") {

		console.log(prevTile, event.target);

		var overlayId = event.target.id +"Ol";
		var overlayUpId = "x"+ event.target.dataset.x +"y"+(event.target.dataset.y -1)+"Ol";
		var overlayDownId = "x"+ event.target.dataset.x +"y"+(parseInt(event.target.dataset.y) +1)+"Ol";
		var overlayLeftId = "x"+ (event.target.dataset.x-1) +"y"+event.target.dataset.y+"Ol";
		var overlayRightId = "x"+ (parseInt(event.target.dataset.x)+1) +"y"+event.target.dataset.y+"Ol";
		// console.log(overlayId, overlayUpId, overlayDownId, overlayLeftId, overlayRightId);
		document.getElementById(overlayUpId).classList.add("overlayUp");
		document.getElementById(overlayDownId).classList.add("overlayDown");
		document.getElementById(overlayLeftId).classList.add("overlayLeft");
		document.getElementById(overlayRightId).classList.add("overlayRight");
		// console.log("ok", overlayId);
		switch(mainDirection) {
			case "up":
				document.getElementById(overlayId).classList.add("overlayOverUp");

				break;
			case "down":
				document.getElementById(overlayId).classList.add("overlayOverDown");

				break;
			case "left":
				document.getElementById(overlayId).classList.add("overlayOverLeft");

				break;
			case "right":
				document.getElementById(overlayId).classList.add("overlayOverRight");

				break;
		}

		if(prevTile) {
			var prevTileUpId = "x"+ prevTile.dataset.x +"y"+(prevTile.dataset.y -1)+"Ol";
			var prevTileDownId = "x"+ prevTile.dataset.x +"y"+(parseInt(prevTile.dataset.y) +1)+"Ol";
			var prevTileLeftId = "x"+ (prevTile.dataset.x-1) +"y"+prevTile.dataset.y+"Ol";
			var prevTileRightId = "x"+ (parseInt(prevTile.dataset.x)+1) +"y"+prevTile.dataset.y+"Ol";
			console.log(prevTile, prevTileUpId, prevTileDownId, prevTileLeftId, prevTileRightId);
			console.log(document.getElementById(prevTileUpId));


			if(prevTileUpId != event.target.id) {
				document.getElementById(prevTileUpId).classList.remove("overlayUp");
			}
			if(prevTileDownId != event.target.id) {
				document.getElementById(prevTileDownId).classList.remove("overlayDown");
			}
			if(prevTileLeftId != event.target.id) {
				document.getElementById(prevTileLeftId).classList.remove("overlayLeft");
			}
			if(prevTileRightId != event.target.id) {
				document.getElementById(prevTileRightId).classList.remove("overlayRight");			
			}

			// prevTileOlId = event.target.id +"Ol";
			// setTimeout(function(){ 
			// 	document.getElementById('prevTileOlId').classname = 'overlay';
			//  }, 500);
		}
		prevTile = event.target;
		// console.log(document.getElementById(overlayId));
	}

}

var bgCol;

function onmouseoverTile3(event) {
	if (event.target.dataset.bgCol) {
		bgCol = event.target.dataset.bgCol;
	}
	event.target.style.backgroundColor = bgCol;
}

function setPaletteTile(maxY, maxX) {
	console.log(maxY, maxX);
	for (var cpt = 0; cpt < 9; cpt++) {
		var x = Math.floor(Math.random() * maxX); 
		var y = Math.floor(Math.random() * maxY); 
		var id = 'x'+ x + 'y' + y;
		var bgCol = getRandomColor();
		document.getElementById(id).style.backgroundColor = bgCol;
		document.getElementById(id).dataset.bgCol = bgCol;
	}
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

function onclickTile(event) {
	event.target.classList.toggle("blacked");
}

function getBlackedTiles() {
	var blackTiles = [];
	var tiles = document.getElementsByClassName("tile2");
	for(var cpt=0; cpt<tiles.length; cpt++) {
		var arrayc = [];
		if(tiles[cpt].classList.contains("blacked")) {
			arrayc.push(tiles[cpt].dataset.x);
			arrayc.push(tiles[cpt].dataset.y);
			blackTiles.push(arrayc);
		}
	}

	console.log(blackTiles);
}


var rightArrow0 = ["x35y10", "x35y11", "x36y11", "x36y12","x37y12","x37y13","x38y13","x27y14","x28y14","x29y14","x30y14","x31y14","x32y14","x33y14","x34y14","x35y14","x36y14","x37y14","x38y14","x39y14","x27y15","x28y15","x29y15","x30y15","x31y15","x32y15","x33y15","x34y15","x35y15","x36y15","x37y15","x38y15","x39y15","x37y16","x38y16","x36y17","x37y17","x35y18","x36y18","x35y19"];
var regArrow = [[-3,1],[-2,2],[-1,3],[0,-4],[0,-3],[0,-2],[0,-1],[0,0],[0,1],[0,2],[0,4],[3,1],[2,2],[1,3]];
var diagArrow = [[-1,-3],[0,-3],[1,-3],[2,-3],[3,-3],[3,-2],[1,-1],[3,-1],[0,0],[3,0],[-1,1],[3,1],[-2,2],[-3,3]];

function showArrow(mainDirection) {
	console.log(blackedTilesArray);
	for(var cpt=0; cpt<blackedTilesArray.length; cpt++) {
		document.getElementById(blackedTilesArray[cpt].id).classList.remove("blacked");
	}
	blackedTilesArray = [];

	var centerTile = getCenterTile();
	if(mainDirection == "up" || mainDirection == "down" || mainDirection == "left" ||mainDirection == "right") {
		var arr = regArrow;
	} else {
		var arr = diagArrow;
	}
	// console.log(arr)
	for(var cpt=0; cpt<arr.length; cpt++) {
		var currentIndex = arr[cpt];
		
		switch(mainDirection) {
			case "down":
				var currentId = "x"+(parseInt(centerTile.dataset.x) + parseInt(currentIndex[0])) + "y"+(parseInt(centerTile.dataset.y) + parseInt(currentIndex[1]));

				break;
			case "right":
				var currentId = "x"+(parseInt(centerTile.dataset.x) + parseInt(currentIndex[1])) + "y"+(parseInt(centerTile.dataset.y) + parseInt(currentIndex[0]));

				break;
			case "left":
				var currentId = "x"+(parseInt(centerTile.dataset.x) + (0-parseInt(currentIndex[1]))) + "y"+(parseInt(centerTile.dataset.y) + parseInt(currentIndex[0]));

				break;
			case "up":
				var currentId = "x"+(parseInt(centerTile.dataset.x) + parseInt(currentIndex[0])) + "y"+(parseInt(centerTile.dataset.y) + (0-parseInt(currentIndex[1])));

				break;
			case "rightdown":
				var currentId = "x"+(parseInt(centerTile.dataset.x) + parseInt(currentIndex[0])) + "y"+(parseInt(centerTile.dataset.y) + (0-parseInt(currentIndex[1])));

				break;
			case "leftdown":
				var currentId = "x"+(parseInt(centerTile.dataset.x) + parseInt(currentIndex[1])) + "y"+(parseInt(centerTile.dataset.y) + parseInt(currentIndex[0]));

				break;
			case "rightup":
				var currentId = "x"+(parseInt(centerTile.dataset.x) + parseInt(currentIndex[0])) + "y"+(parseInt(centerTile.dataset.y) + parseInt(currentIndex[1]));
				
				break;
			case "leftup":
				var currentId = "x"+(parseInt(centerTile.dataset.x) + (0-parseInt(currentIndex[0]))) + "y"+(parseInt(centerTile.dataset.y) + parseInt(currentIndex[1]));

				break;
		}
		// console.log(currentId, document.getElementById(currentId));
		document.getElementById(currentId).classList.add("blacked");
		blackedTilesArray.push(document.getElementById(currentId));

	}
}

function getCenterTile() {
	var lastTile = tilesElts[(tilesElts.length-1)];
	var centerX = parseInt(lastTile.dataset.x / 2);
	var centerY = parseInt(lastTile.dataset.y / 2);
	var centerId = "x" + centerX + "y" + centerY;
	var centerTile = document.getElementById(centerId);
	// console.log(centerTile);
	return centerTile;
}

