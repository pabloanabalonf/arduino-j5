var five = require("johnny-five");
var board = new five.Board();

var loop = true;

var demoSequence = [
	{
		method: "pulse",
		args: [1000],
		duration: 5000
	},
	{
		method: "strobe",
		args: [500],
		duration: 3000
	},
	{
		method: "fadeIn",
		args: [
			2000, 
			function (){
				console.log("fadeIn complete!");
			}
		],
		duration: 2500
	},
	{
		method: "fadeOut",
		args: [
			5000,
			function (){
				console.log("fadeOut complete!");
			}
		],
		duration: 5000
	},
	{
		method: "brightness",
		args: [10],
		duration: 3000
	},
	{
		method: "off"
	}
];

function execute(step){
	var method = demoSequence[step].method;
	var args = demoSequence[step].args;
	var duration = demoSequence[step].duration || 3000;

	console.log("led." + method + "(" + (args ? args.join() : "") + ")");

	five.Led.prototype[method].apply(led, args);

	step++;

	if(step === demoSequence.length){
		if(loop){
			step = 0;
		}else{
			process.exit(0);
		}
	}

	board.wait(duration, function (){
		execute(step);
	});
}

board.on("ready", function (){
	console.log("board ready!");
	led = new five.Led(process.argv[2] || 11);

	execute(0);
});