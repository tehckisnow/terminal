//todo:
//login
//command parser
//filesystem(object?)
//fs parser
//check for programs in path
//programs


//computer
let root = {
	bin: {
    help: function(){
      return "time, cls, pwd, ls";
    },
		cls: function(){dom.textDiv.innerHTML = ""; return ""},
    time: function(){
      let date1 = new Date();
      return "The current time is " + date1;
    },
    pwd: function(){if(global.currentDir === "~"){return "/home/" + global.currentUser + "/"}else{return global.currentDir}},
    ls: function(){
      let dir = global.currentDir;
      if(dir === "~"){dir = "/home/" + global.currentUser};
      for(i in [dir]){out([dir][i])};
      return " ";
    },
	},
	dev: {},
	home: {
    user1: {
      config: {
        name: "paul",
        PATH: ["root.bin"]
      },
    },
  },
	mnt: {},
	root: {},
	sys: {},
	tmp: {},
	usr: {},
};

//global
let global = {
	currentUser: "user1",
	currentDir: "~",
	bootText: "Type 'help' for assistance",
	fontSize: "14px",
	lines: 5,
  color: "#01C2FE",
  backgroundColor: "black",
  font: "Droid Sans",
  fontSize: "16px",
};

//create terminal
let dom = {
	console: document.createElement("div"),
	textDiv: document.createElement("div"),
	text: document.createTextNode(global.bootText),
	input: document.createElement("input"),
	prompt: document.createTextNode("[" + global.currentUser + " " + global.currentDir + " ]$ ",
	),
};

dom.console.appendChild(dom.textDiv);
dom.textDiv.appendChild(dom.text);
document.body.appendChild(dom.console);
dom.textDiv.innerHTML += "<br/>";
dom.console.appendChild(dom.prompt);
dom.console.appendChild(dom.input);

//style terminal
function styleTerm(){
  dom.console.style.border = "solid " + global.color;
  dom.console.style.margin = "auto";
  dom.console.style.padding = "10px";
  dom.console.style.height = "90%";
  dom.console.style.width = "90%";
  dom.console.style.overflow = "hidden";
  dom.console.style.backgroundColor = global.backgroundColor;

  dom.textDiv.style.border = "0";
  dom.textDiv.style.padding = "0";
  document.body.style.fontFamily = global.font;
  document.body.style.margin = "auto";
  document.body.style.backgroundColor = "black";
  document.body.style.color = global.color;
  document.body.style.padding = "10px";
  document.body.style.fontSize = global.fontSize;
  dom.input.style.backgroundColor = global.backgroundColor;
  dom.input.style.color = global.color;
  dom.input.style.width = "80%";
  dom.input.style.display = "inline";
  dom.input.style.border = "black";
  dom.input.style.outline = "black";
  dom.input.style.fontSize = global.fontSize;
  dom.input.style.border = "1px";
  dom.input.style.padding = "0px";
};
styleTerm();

//output
function out(text){
	dom.textDiv.innerHTML += text + "<br/>";
	dom.input.value = "";
};

//input
document.body.onkeydown = function(){pressEnter(event)};
dom.input.autofocus = true;

function pressEnter(event){
	if(event.keyCode == 13){
		history.reset();
		enter();
	}else if(event.keyCode === 38){
		history.up();
	}else if(event.keyCode === 40){
		history.down();
	}
};

let history = {
	historyLength: 10,
	count: -1,
	slots: [],
	reset: function(){
		history.count = -1;
	},
	update: function(input){
		history.slots.unshift(input);
		if(history.slots.length > history.historyLength){
			history.slots.pop();
		}
	},
	up: function(){
		if(history.count < history.slots.length -1){
			history.count++;
			dom.input.value = history.slots[history.count];
		}
	},
	down: function(){
		if(history.count > 0){
			history.count--;
			dom.input.value = history.slots[history.count];
		}
	}
};

function enter(){
	let input = dom.input.value.toLowerCase();
	history.update(input);
	out("[" + global.currentUser + " " + global.currentDir + " ]$ " + input);
	out(command(input));
	dom.input.value = "";
	window.scrollBy(0, 200);
};

function command(input){
  let cmd = input.split(" ");
  //let path = [root.home[global.currentUser].config.PATH];
  //[path[0][0]];
  //
  return root.bin[cmd[0]]();
};
