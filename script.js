function begin() { //Working
  modal(true);
  status();
  //setTimeout(callSuggestions, 0);
}
function status() {
  var div = document.getElementById('status');
  let i = 0;
  bake();
} //Working

function bake() { //https://stackoverflow.com/questions/32389568/search-for-a-string-from-a-textbox-in-a-textarea
  console.log("Called callSuggestion");
  paragraph = document.getElementById("text").textContent; // <--- Global Variable ????
  console.log(paragraph);
  document.getElementById("improvements").replaceChildren([]);
  for (i = 0; i < neverWords.length; i++) {
    if (neverWords.length > 0 && paragraph.indexOf(neverWords[i]) > -1) {
      searchResults.push(neverWords[i]);
      searchReplacements.push(neverWordReplacemnts[i]);
      suggestTab(neverWords[i], neverWordReplacemnts[i], i);
    }
  }
  for (i = 0; i < searchResults.length; i++) {
    subjectGlobalized = new RegExp(searchResults[i], "gi");
    console.log(subjectGlobalized + " " + searchResults[i] + " : " + paragraph);
    var highlighted = paragraph.replace(subjectGlobalized, "</span><span class='word'>" + searchResults[i] + "</span><span class='other'>");
    var paragraph = highlighted;
  }
  document.getElementById("text").innerHTML = paragraph;
  console.log("Final array: " + searchResults);
  console.log("Final solutions: " + searchReplacements);
  modal(false);
}  //Working

function recalculate(test) {
  console.log("Recalculating");
  console.log("Called from: " + test);
  var recalculatedResults = [];
  paragraph = document.getElementById("text").textContent;
  for (i = 0; i < neverWords.length; i++) {
    if (neverWords.length > 0 && paragraph.indexOf(neverWords[i]) > -1) {
      recalculatedResults.push(neverWords[i]);
    }
  }
  for (i = 0; i < recalculatedResults.length; i++) {
    subjectGlobalized = new RegExp(recalculatedResults[i], "gi");
    var highlighted = paragraph.replace(subjectGlobalized, "</span><span class='word'>" + recalculatedResults[i] + "</span><span class='other'>");
    var paragraph = highlighted;
  }
  console.log(paragraph);
  document.getElementById("text").innerHTML = paragraph;
}

function highlight(subject) {
  subjectGlobalized = new RegExp(subject, "gi");
  console.log(subjectGlobalized + " " + subject + " : " + paragraph);
  var highlighted = paragraph.replace(subjectGlobalized, "</span><span class='word'>" + subject + "</span><span class='other'>");
  var paragraph = highlighted;
  document.getElementById("text").innerHTML = paragraph;
} //Completely Broken

function suggestTab(word, suggest, location) { 
  var title = word;
  var paragraph = suggest;
  var position = location;
  let thing = document.createElement('div');
  thing.innerHTML = `<div class=\"suggestion\"><h2>${title}</h2><p>${paragraph}</p><br><button style="display: inline;" onclick='this.parentNode.remove(this); acceptEdit("${title}", "${paragraph}", ${position}); recalculate("button");'>Accept</button><button style="display: inline;" onclick='this.parentNode.remove(this)'>Reject</button></div>`
  document.getElementById("improvements").appendChild(thing);
} //Working (Sort of)

function acceptEdit(word, suggest, location) {
  console.log("Called acceptEdit()");
  var paragraph = document.getElementById("text").textContent;
  console.log(word + " " + suggest + " " + location);
  wordGlobalized = new RegExp(word, "gi");
  console.log(new RegExp(word, "gi"));
  if (suggest == " REMOVE ") {
    var fixed = paragraph.replace(wordGlobalized, " ");
  } else {
    var fixed = paragraph.replace(wordGlobalized, suggest);
  }
  document.getElementById("text").innerHTML = fixed;
  
} //Working
