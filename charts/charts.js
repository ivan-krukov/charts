function main(){
	//define some constant because we are lazy
	var size = 500;
	var padding = 30;
	//some application state
	var data;
	var colors;
	
	//Get handles on the elements
	var barchartContainer = document.getElementById('barchart');
	var piechartContainer = document.getElementById('piechart');
	var linechartContainer = document.getElementById('linechart');
	var input = document.getElementById('input');

	//Create new image
	var barchart = SVG(barchartContainer).size(size,size);
	var piechart = SVG(piechartContainer).size(size,size);
	var linechart = SVG(linechartContainer).size(size,size);
	//How to get input data
	function parseNumbers() {
		var numbers = input.value.split(/,/);
		return numbers.map(parseFloat);
	}

	function randomColor() {
		return "#"+(Math.random().toString(16) + '000000').slice(2, 8);
	}
	
	function makeTooltip(plot,data,x,y) {
		tooltip = plot.group().translate(x-15, y-24);
		frame = plot.polygon('0,0 0,20 12,20 15,24 18,20 30,20 30,0')
			.opacity(0.8);
		caption = plot.text(data)
			.center(15,10)
			.font({
				size: 16
			})
			.fill('#CCC');
		
		tooltip
			.add(frame)
			.add(caption);
		return tooltip;
	}
	
	//How to draw a barchart
	function drawBarchart(numbers){
		var largest = Math.max.apply(null,numbers);
		var verticalScale = (size-padding)/largest;
		var width = (size- (2 * padding))/(numbers.length);

		for (var i = 0; i < numbers.length; i++) {
			var n = numbers[i];
			var r = barchart.rect(width, (n * verticalScale))
				.move(width * i + padding, (size - n * verticalScale))
				.fill(colors[i])
				.stroke('gray')			
				.on('mouseenter',function(){
					this.fill('orange');
					this.tip.front().show();
				})
				.on('mouseleave',function(){
					this.fill(this.color);
					this.tip.hide();
				});
			
			r.tip = makeTooltip(barchart,
								n.toString(),
								(width * i) + (width / 2) + padding,
								size - (n * verticalScale));
			r.tip.hide();
			r.color = colors[i];
		}
	}


	
	function drawPiechart(numbers) {

		function polarToCartesian(theta) {
			var radians = theta * 2 *Math.PI;
			return {x: center + radius * Math.cos(radians),
					y: center + radius * Math.sin(radians)};
		}

		function arc(start, finish) {
			// var arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
			var d = [
				'M', center, center,
				'L', start.x, start.y,
				'A', radius, radius, 0, 0, 1, finish.x, finish.y,
				'Z'
			].join(' ');
			
			return d; 
		}
		
		var center = size/2;
		var radius = 220;
		
		var total = numbers.reduce(function(a,b){
			return a+b;
		});

		var runningTotal = 0;
		for(var i = 0; i < numbers.length; i++) {
			var n = numbers[i];
			var start = polarToCartesian( runningTotal / total );
			var finish = polarToCartesian( (runningTotal + n) / total );
			var s = piechart.path( arc(start, finish))
				.fill(colors[i])
				.stroke('gray')
				.on('mouseenter',function(){
					this.fill('orange');
					this.tip.front().show();
				})
				.on('mouseleave',function(){
					this.fill(this.color);
					this.tip.hide();
				});


			s.tip = makeTooltip(piechart,
								n.toString(),
								start.x,
								start.y);
			s.tip.hide();
			s.color = colors[i];
			
			runningTotal += n;
		}
		
	}

	//How to draw a linechart
	function drawLinechart(numbers){
		var largest = Math.max.apply(null,numbers);
		var radius = 10;
		var verticalScale = (size-padding)/largest;
		var width = (size - (2 * padding))/(numbers.length);

		for (var i = 0; i < numbers.length; i++) {
			var n = numbers[i];

			var horizontalOffset = width/2+padding;
			
			var r = linechart.circle(radius)
				.center((width*i) + horizontalOffset, (size-n*verticalScale))
				.fill(colors[i])
				.stroke('gray')
				.on('mouseenter',function(){
					this.fill('orange');
					this.tip.front().show();
				})
				.on('mouseleave',function(){
					this.fill(this.color);
					this.tip.hide();
				});
			if (i > 0) {
				var prev = numbers[i-1];
				var l = linechart.line(width*(i-1) + horizontalOffset,
									   size-prev*verticalScale,
									   (width*i) + horizontalOffset,
									   size-n*verticalScale)
					.stroke('gray')
					.back();
			}

			
			r.tip = makeTooltip(linechart,
								n.toString(),
								(width*i) + horizontalOffset,
								size-(n*verticalScale)-(radius/2));
			r.tip.hide();
			r.color = colors[i];
		}
	}

	//Update to start
	data = parseNumbers();
	colors = data.map(randomColor);
	drawBarchart(data);
	drawPiechart(data);
	drawLinechart(data);
	

	input.addEventListener('input', function(){

		barchart.clear();
		piechart.clear();
		linechart.clear();
		
		data = parseNumbers();
		colors = data.map(randomColor);
		
		drawBarchart(data);
		drawPiechart(data);
		drawLinechart(data);
	});
	//And update every time 'input' happens

	
}

