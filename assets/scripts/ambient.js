//https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function modal(present) {
  console.log("Modal Called");
  var modal = document.getElementById("myModal");
  if (present == true) {
    modal.style.display = "block";
    console.log("Modal: Block");
  } else {
    modal.style.display = "none";
    console.log("Modal: None");
  }
}

function toggleTheme() { //https://www.geeksforgeeks.org/how-to-switch-between-multiple-css-stylesheets-using-javascript/
  var theme = document.getElementById("theme");
  if (theme.getAttribute('href') == 'light.css') {
    theme.setAttribute('href', 'assets/styles/dark.css');
  } else {
    theme.setAttribute('href', 'assets/styles/light.css');
  }
}

function defaultTheme() { //https://stackoverflow.com/questions/18031410/javascript-if-time-is-between-7pm-and-7am-do-this
  console.log("Welcome to the cool kids club i guess");
  console.log("Enjoy some cool ascii art.");
  console.log("");
  console.log("");
  console.log("██████╗░░█████╗░██╗░░██╗██╗███████╗██╗░░░██╗");
  console.log("██╔══██╗██╔══██╗██║░██╔╝██║██╔════╝╚██╗░██╔╝");
  console.log("██████╦╝███████║█████═╝░██║█████╗░░░╚████╔╝░");
  console.log("██╔══██╗██╔══██║██╔═██╗░██║██╔══╝░░░░╚██╔╝░░");
  console.log("██████╦╝██║░░██║██║░╚██╗██║██║░░░░░░░░██║░░░");
  console.log("╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═╝░░░░░░░░╚═╝░░░");
  console.log("Written by Makai Pindell");
  console.log("");
  
  var theme = document.getElementById("theme");
  var hour = new Date().getHours();
  if (hour >= 18 || hour <= 7) {
    theme.setAttribute('href', 'assets/styles/dark.css');
  } else {
    theme.setAttribute('href', 'assets/styles/light.css');
  }
}