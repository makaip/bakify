// https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(milliseconds) {							/*
	Note: I edited this so it would support fractions of milliseconds by
 	using the performance object instead of the Date object.
  		- George							*/
	const start = performance.now();
	let current = null;
	do {
		current = performance.now();
	} while (current - start < milliseconds);
}

function modal(present) {
	console.log('Modal Called');
	const modal = document.getElementById('myModal');
	const ad = document.getElementById("adoverlay");
	if (present) {
		modal.style.display = 'block';
		ad.style.display = 'block';
		console.log('Modal: Block');
	} else {
		modal.style.display = 'none';
		console.log('Modal: None');
	}
}

function info(present) {
	console.log("Info Called");
	const info = document.getElementById('info');
	if (present) {
		info.style.display = "block";
		console.log("Info Displayed");
	} else {
		info.style.display = "none";
		console.log("Info Hidden");
	}
}

function displayBox(present) {
	console.log('Modal Called');
	const suggestionsBox = document.getElementById('improvements');
	if (present) {
		suggestionsBox.style.display = 'block';
		console.log('Suggestions: Block');
	} else {
		suggestionsBox.style.display = 'none';
		console.log('Suggestions: None');
	}
}

// https://www.geeksforgeeks.org/how-to-switch-between-multiple-css-stylesheets-using-javascript/
let cookiesDisabled = false;
function toggleTheme() {
	const theme = document.getElementById('theme');
	if(!(localStorage.cookies || cookiesDisabled)) {
		if(confirm("Would you like us to use cookies to remember your choice?")) {
			localStorage.cookies = "allowed";
		} else {
			cookiesDisabled = true;
		}
	}
	if (theme.getAttribute("href") == 'assets/styles/light.css') {
		selectedTheme = "dark";
		if(!cookiesDisabled) {localStorage.theme = "dark"};
	} else {
		selectedTheme = "light";
		if(!cookiesDisabled) {localStorage.theme = "light"};
	}
}


function defaultTheme() { 
	console.log(` 
Welcome to the cool kids club i guess
Enjoy some cool ascii art.


██████╗░░█████╗░██╗░░██╗██╗███████╗██╗░░░██╗
██╔══██╗██╔══██╗██║░██╔╝██║██╔════╝╚██╗░██╔╝
██████╦╝███████║█████═╝░██║█████╗░░░╚████╔╝░
██╔══██╗██╔══██║██╔═██╗░██║██╔══╝░░░░╚██╔╝░░
██████╦╝██║░░██║██║░╚██╗██║██║░░░░░░░░██║░░░
╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═╝░░░░░░░░╚═╝░░░
 `);

	const theme = document.getElementById('theme');
	const hour = new Date().getHours();
	window.selectedTheme = localStorage.theme ? localStorage.theme : "default";

	setInterval(() => {
		// https://stackoverflow.com/questions/18031410/javascript-if-time-is-between-7pm-and-7am-do-this
		if(selectedTheme == "default") {
			
		} else if (selectedTheme == "light") {
			theme.href = "assets/styles/light.css";
		} else {
			theme.href = "assets/styles/dark.css";
		}
	}, 10);
}

function random(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}

// https://plainenglish.io/blog/how-to-copy-paste-text-into-clipboard-using-javascript
document.onload = () => {
	let pasteButton = document.getElementById("paste");
	pasteButton.onclick = () => {
		navigator.clipboard
			.readText()
			.then(
				cliptext =>
					(document.getElementById('text').innerText = cliptext),
				err => console.error("Clipboard Error:\n\n" + err)
			);
	}
};
