// Runs code when the DOM has loaded
$(document).ready(function() {


var currentMinutes, minutes, seconds, interval; 
var audio = $("#soundclip")[0];

	// Function for countdown
	function countdown() {
		interval = setInterval(function() {
		    var timer = $('#timer').html(); 
		    timer = timer.split(':');
		    var minutes = parseInt(timer[0], 10);
		    var seconds = parseInt(timer[1], 10);

		    // Decrement seconds by 1 while clock isn't 00:00
		    if ($('#timer').html() !== "00:00") {
		    	seconds -= 1;
		    }


		    if (minutes < 10 && minutes.length != 2) {
		    	minutes = '0' + minutes;
		    }

		    if (minutes >=1 && seconds < 0) {
		        minutes -= 1;
		        seconds = 59;
		    }
		    else if (seconds < 10) 
		    	seconds = '0' + seconds;
		    	$('#timer').html(minutes + ':' + seconds);

			    // Stops countdown when both minutes and seconds are at 0. 
			    if (minutes === 0 && seconds === 0) 
			        clearInterval(interval);

				// When timer displays "00:00" (This has to be inside countdown function)
			    if ($("#timer").html() === "00:00") {
			    	$("body").css("background-color", "#C05746"); // red
			    	$("body").css("color", "#595959");
			    	$("h1").css("color", "white");
			    	$(".btn").css("background-color", "white");
			    	$(".fa").css("color", "#C05746"); // red
			    	audio.play();
				}


		}, 1000);
	}


	// When play button is clicked, start the countdown
	$("#start").click(function(e) {
		e.preventDefault();
		countdown(); 
		$('#preferences').hide();
		$("body").css("background-color", "#C6DD99");
		$(".fa").css("color", "#595959");
		$("h1").css("color", "white");
		$(".btn").css("background-color", "white");

	});	

	// When pause button is clicked, pause the timer and audio
	$("#pause").click(function(e) {
		e.preventDefault();
		clearInterval(interval);
		$("h1").css("color", "#C05746");
		$("body").css("background-color", "#F7E8A0");
		$("body").css("color", "#595959");
		$(".btn").css("background-color", "#C05746");
		$(".fa").css("color", "#F7E8A0");

		if ($("#timer").html() === "00:00") {
			audio.pause(); 	
		}

	});	


	// Hide settings by default 
	$('#preferences').hide();

	// When 'gear' is clicked, show settings
	$("#settings").click(function() {
		clearInterval(interval);
		$("body").css("background-color", "white");
		$(".btn").css("background-color", "#595959");
		$(".fa").css("color", "white");
		$('#preferences').toggle("fade"); 
	});

	// Session Settings
	$("#decrease").click(function() {
		currentMinutes = $("#minute-settings").val();
		if (currentMinutes > 1 && currentMinutes < 60) {
			var decreasedMinutes = currentMinutes - 1; 
			$("#minute-settings").val(decreasedMinutes);
			$("#timer").html(decreasedMinutes + ":00");
		}
	});

	$("#increase").click(function() {
		currentMinutes = $("#minute-settings").val();
		if (currentMinutes > 1 && currentMinutes <= 58) {
			var increasedMinutes = parseInt(currentMinutes) + 1; 
			$("#minute-settings").val(increasedMinutes);
			$("#timer").html(increasedMinutes + ":00");
		}
	});		

	// When # of minutes is manually entered and enter key is pressed
	$('#minute-settings').keypress(function(e) {
		if ( e.which == 13 ) {
		e.preventDefault(); 

		if ($('#minute-settings').val().length === 1) {
			$("#timer").html("0" + $("#minute-settings").val() + ":00");
		} 
		else {
			$("#timer").html($("#minute-settings").val() + ":00");
		}
	
		$('#preferences').hide();
		};
	}); 

	// Reset clock 
	$("#reset").click(function() {
		clearInterval(interval);
		currentMinutes = $("#minute-settings").val();
		$("#timer").html(currentMinutes + ":00");
		$("body").css("background-color", "white");
		$(".btn").css("color", "#C05746");
		$(".fa").css("color", "white");
	});						
				


});







