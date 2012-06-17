(function(win, $, undefined){

	var c;
	
	for(var i = 0; i < 12; i++){
		c = new Cal(i);
		c.generate('body');	
	}

	if(!win.location.hash){
		win.location = win.location + "#cal" + new Date().getMonth();
	}


})(window, jQuery);