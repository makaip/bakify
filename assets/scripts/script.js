function begin() { // Working
	//stat();
	//setTimeout(stat, 0);
	document.getElementById("bake").style.display = "none";
	document.getElementById("recalc").style.display = "inline";
	bake();
}

/*
function stat() {
	modal(true);
	const div = document.getElementById('status');
	var paragraph = document.getElementById('text').textContent;
	let i = 0;
	let interval = setInterval(() => {
		div.innerHTML = (Math.round((i/100)*100) + "%");
		i++;
		if (i == 100) {
		  clearInterval(interval);
		  bake();
		}
	  }, paragraph.length/35);
} // Working
*/

// https://stackoverflow.com/questions/32389568/search-for-a-string-from-a-textbox-in-a-textarea
function bake() {
	console.log('Called callSuggestion');
	displayBox(true);
	searchResults.length = 0;
	searchReplacements.length = 0;
	var paragraph = document.getElementById('text').textContent; // Get plain text for detection
	document.getElementById('improvements').replaceChildren([]);
	
	// First, detect all the never words
	for (i = 0; i < neverWords.length; i++) {
		// Check if the array structure exists to prevent errors
		if (!neverWords[i] || !neverWords[i][0] || !neverWords[i][0][0]) {
			console.log('Skipping invalid entry at index:', i);
			continue;
		}
		
		let searchWord = neverWords[i][0][0]; // Get the word from nested array
		console.log('Bake Iteration: ' + searchWord + " at index " + i);
		
		// Remove leading/trailing spaces and create word boundary regex
		let cleanWord = searchWord.trim();
		if (cleanWord === '') continue; // Skip empty words
		
		let wordPattern = new RegExp('\\b' + cleanWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
		
		if (wordPattern.test(paragraph)) {
			console.log('Found neverword: ' + cleanWord);
			searchResults.push(cleanWord); // Store the clean word for highlighting
			
			// Get replacement suggestions
			let replacements = neverWords[i][1];
			if (replacements && replacements.length > 0) {
				let r = random(0, replacements.length - 1);
				searchReplacements.push(replacements[r]);
				suggestTab(searchWord, replacements[r], i);
			}
		}
	}
	
	console.log('Words found for highlighting:', searchResults);
	
	// Now apply highlighting - start with plain text and build HTML
	var highlightedText = paragraph;
	
	// Apply highlighting for each found word
	for (i = 0; i < searchResults.length; i++) {
		let cleanWord = searchResults[i];
		let wordPattern = new RegExp('\\b' + cleanWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
		console.log('Highlighting word: ' + cleanWord);
		
		// Replace each occurrence with highlighted version
		highlightedText = highlightedText.replace(wordPattern, function(match) {
			console.log('Replacing match:', match);
			return '<span class="word">' + match + '</span>';
		});
	}
	
	// Wrap the entire text in the 'other' span and set innerHTML
	document.getElementById('text').innerHTML = '<span class="other">' + highlightedText + '</span>';
	
	console.log('Final highlighted HTML:', document.getElementById('text').innerHTML);
	console.log('Final array: ' + searchResults);
	console.log('Final solutions: ' + searchReplacements);
	
	if (searchResults.length == 0) { //Handle No Neverwords
		const thing = document.createElement('div');
		thing.innerHTML = `<div class=\"suggestion\"><h2>All Good!</h2><p>We didn't find any errors :) </p><br></div>`;
		document.getElementById('improvements').appendChild(thing);
	}
	modal(false);
} // Working

function recalculate() {
	console.log('Recalculating');
	const recalculatedResults = [];
	paragraph = document.getElementById('text').textContent; // Get plain text
	
	// Find all never words in the current text
	for (i = 0; i < neverWords.length; i++) {
		// Check if the array structure exists
		if (!neverWords[i] || !neverWords[i][0] || !neverWords[i][0][0]) {
			continue;
		}
		
		let searchWord = neverWords[i][0][0];
		let cleanWord = searchWord.trim();
		if (cleanWord === '') continue;
		
		let wordPattern = new RegExp('\\b' + cleanWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
		
		if (wordPattern.test(paragraph)) {
			recalculatedResults.push(cleanWord);
		}
	}
	
	// Apply highlighting
	var highlightedText = paragraph;
	for (i = 0; i < recalculatedResults.length; i++) {
		let cleanWord = recalculatedResults[i];
		let wordPattern = new RegExp('\\b' + cleanWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
		highlightedText = highlightedText.replace(wordPattern, function(match) {
			return '<span class="word">' + match + '</span>';
		});
	}
	
	// Set the highlighted HTML
	document.getElementById('text').innerHTML = '<span class="other">' + highlightedText + '</span>';
}

function suggestTab(word, suggest, location) {
	const title = word;
	const paragraph = suggest;
	const position = location;
	const thing = document.createElement('div');
	thing.innerHTML = `<div class=\"suggestion\"><h2>${title}</h2><p>${paragraph}</p><br><button style="display: inline;" onclick='this.parentNode.remove(this); acceptEdit("${title}", "${paragraph}", ${position}); recalculate();'>Accept</button><button style="display: inline;" onclick='this.parentNode.remove(this)'>Reject</button></div>`;
	document.getElementById('improvements').appendChild(thing);
} // Working (Sort of)

function acceptEdit(word, suggest, location) {
	console.log('Called acceptEdit()');
	const paragraph = document.getElementById('text').textContent; // Get plain text
	let cleanWord = word.trim();
	let wordPattern = new RegExp('\\b' + cleanWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
	console.log("Word Pattern: " + wordPattern);
	
	var fixed;
	if (suggest == ' REMOVE ') {
		fixed = paragraph.replace(wordPattern, '');
	} else {
		fixed = paragraph.replace(wordPattern, suggest.trim());
	}
	
	// Set the plain text first, then let recalculate handle the highlighting
	document.getElementById('text').innerHTML = '<span class=\'other\'>' + fixed + '</span>';
} // Working

/*
function suggestAd(){
	const thing = document.createElement('div');
	thing.innerHTML = `
	<div id="adsuggestion" class='suggestion' style='text-align: left'>
  	<button style="display: inline;" onclick='this.parentNode.remove(this);'>X</button>
	<p style="display: inline; float: right;">Ad</p>
	<script data-cfasync='false' type='text/javascript' src='//p456148.clksite.com/adServe/banners?tid=456148_892140_0'></script>
	</div>
	`;
	document.getElementById('improvements').appendChild(thing);
}
*/

//<script type='text/javascript' src='//p456148.clksite.com/adServe/banners?tid=456148_892140_0'></script>