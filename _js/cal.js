/**
 * Cal object to generate calendars in javascript
 * Generate new calendars by adding:
 * 
 * var c = new Cal(month);
 * 		c.generateCalendar('#id');
 *
 * Where month is optional and 
 * #id is where it will be appended
 *
 * requires jQuery
 *
 * 
 *===================================
 * Author : Kyle Ouellette
 * Email : kyle@kyleouellette.com
 * URL : http://kyleouellette.com
 * ==================================
 */

(function(win, $, undefined){
	var days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
		months = [
			'January', 	'February', 'March', 	'April',
			'May',		'June', 	'July', 	'August',
			'September', 'October',	'November', 'December'
		];

	/**
	 * Calendar is an object that generates calendars based on the month specified (or current if null)
	 * 
	 * @param {int || null} mon  Month to generate
	 * @param {int || null} year Year to use
	 * @return {object} returns cal object
	 */
	var Cal = function(mon, year){
		if(this === win){
			return new Cal(mon);
		}
		this.date = new Date();

		if(mon != null || mon != undefined){
			this.month = mon;
		}else{
			this.month = this.date.getMonth();
		}

		this.init();
		return this;
	};

	/**
	 * initializer for calendar
	 * @return {object} returns cal object
	 */
	Cal.prototype.init = function() {
		this.contraints = this.generateConstraints();
		return this;
	};

	/**
	 * Generates the calendar constraints
	 * @return {object} returns cal object
	 */
	Cal.prototype.generateConstraints = function() {
		var now = new Date(),
			data = {
				month : {
					index : this.month,
					name : months[this.month]
				}
			};

		// get data for first of the month
		now.setMonth(this.month);
		now.setDate(1);
		data.first = {
			date : now.getDate(),
			index : now.getDay(),
			day : days[now.getDay()]
		};

		// set the month to be what was
		// specified or current
		now.setMonth(this.month+1);
		now.setDate(0);
		data.last = {
			date : now.getDate(),
			index : now.getDay(),
			day : days[now.getDay()]
		};

		return data;
	};

	/**
	 * Creates a div containing information pertaining to the month 
	 * @param  {string} id string representation of the element to append the calendar to
	 * @return {object}    returns cal object
	 */
	Cal.prototype.generate = function(id) {
		var $container, 
			to_append;

		// create the cal container
		$container = $('<div />')
						.attr({
							id : 'cal' + this.month
						})
						.addClass('cal')
						.append("<h2 class='month_name'>" +months[this.month]+ "</h2>");

		for(var i = 0; i < days.length; i++){
			to_append = $('<div />')
							.addClass('day void dayName')
							.html(days[i]);
			$container.append(to_append);
		}

		for(var i = 0; i < this.contraints.first.index; i++){
			to_append = $('<div />')
							.addClass('day void')
							.html("&nbsp;");
			$container.append(to_append);
		}

		for(i = 1; i < this.contraints.last.date+1; i++){

			to_append = $('<div />')
							.addClass('day active')
							.html("<span class='num'>"+i+"</span>");
			$container.append(to_append);
		}

		$(id).append($container);
		
	};

	win.Cal = Cal;

})(window, jQuery);