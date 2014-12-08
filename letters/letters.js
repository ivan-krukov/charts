function main(){
	//define some constant because we are lazy
	var height = 400;
	var width = 800;
	
	//Get handles on the elements
	var plot = document.getElementById('plot');
	var inputField = document.getElementById('inputField');

	//Create new image
	var drawing = SVG(plot).size(width,height);
	var background = drawing.image('science.png');

	//How to update drawing
	function clipText() {
		var text = drawing.text(inputField.value)
			.font({
				family: 'Source Sans Pro',
				size: 180,
				weight: 'bold'
			});
		background.clipWith(text);
	}

	//Update to start
	clipText();

	//And update every time 'input' happens
	inputField.addEventListener('input', clipText);
	
}

