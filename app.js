var URLHead = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&origin=*&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
var userSearch, response, result, template;

var invocation = new XMLHttpRequest();

function getSearchResults() {
	if(invocation) {    
		invocation.open('GET', URLHead + userSearch, true);    
		invocation.send();
		invocation.onreadystatechange = function() {
			if(invocation.readyState === 4 && invocation.status === 200){
	    		response = JSON.parse(invocation.response);
	    		if(response.query !== undefined){
	    			response = response.query.pages;
	    			for (var key in response) {
	    				template = '<a href="https://en.wikipedia.org/wiki/{{title}}" class="tile" target="_blank"><h4>{{title}}</h4><p>{{extract}}</p></a>'; 
	    				result = Mark.up(template, response[key]);
	    				$(".results").append(result);
	    			}
	    		}else {
	    			$(".results").empty();
	    			showAlert("File Not Found. Please try again.");
	    		}
	    	}
	    };
	}
}

var showAlert = function(warning) {
	$(".alert").text(warning);
	$(".alert").prepend('<i class="fa fa-warning"></i>');
	$(".alert").slideDown(300);
};

$(document).ready(function() {
	$("#searchBtn").click(function(){
		if($("#search").val().length > 0){
			userSearch = $("#search").val();
			getSearchResults();
		}else {
			showAlert("Please insert a value before searching.");
		}
	});

	$("#search").keydown(function(){
		if($(".alert").is(':visible')){
			$(".alert").slideUp(300);
		}
	});

	$("#search").keydown(function(e){
		if(e.keyCode == 13){
			$("#searchBtn").click();
		}
	});
});