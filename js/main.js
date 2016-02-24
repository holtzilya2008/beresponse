/* Main Javascript file - Loads the miniforms into the main page
 */ 

 	var questions_num = 20;
 	var link = document.querySelector('link[rel="import"]');
    var content = link.import;

   	// Get #questions column
   	var questions_col document.getElementById("questions");
    // Grab DOM from miniforms.html's document.
	var qmini = content.querySelector('.question-mini');

   	for (var i = 0; i < questions_num; i++) {
   		//create bootstrap row
  		var row = document.createElement('div');
  		row.setAttribute("class","row");
  		// append questions-mini
  		row.appendChild(qmini.cloneNode(true));
  		// Get it inside Questions column
  		questions_col.appendChild(row);
  	}
