var buttonVal = "";
var newButton = "";
var petArray = ["cat", "dog", "doge", "raccoon", "fox", "ferret", "otter", "pig", "chinchilla", "cow", "capybara"];
var pet = "";
var imgURL = "";
var simgURL = "";

function originalButtons() {

    for (var i = 0; i < this.petArray.length; i++) {

        this.buttonVal = this.petArray[i];
        this.newButton = $('<input type="button" />');
        

        this.newButton.attr("data-pet", this.buttonVal);
        
        this.newButton.attr("type", "button");
        this.newButton.attr("value", this.buttonVal);
        this.newButton.attr("class", "btn btn-primary gifGenerate");
        this.newButton.attr("style", "margin-right: 10px; margin-top: 10px");

        $("#gif-buttons").append(this.newButton);


    }

};

originalButtons();


$("#submitBtn").on("click", function() {
    event.preventDefault();

    this.buttonVal = $("#addButton").val().trim();
    this.newButton = $('<input type="button" />');
    

    this.newButton.attr("data-pet", this.buttonVal);
 
    this.newButton.attr("type", "button");
    this.newButton.attr("value", this.buttonVal);
    this.newButton.attr("class", "btn btn-primary gifGenerate");
    this.newButton.attr("style", "margin-right: 10px; margin-top: 10px");

    $("#gif-buttons").append(this.newButton);

    $("#theForm").trigger("reset");


});


$(document).on("click", ".gifGenerate",  function() {

    var pet = $(this).attr("data-pet");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        pet + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function(response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var petDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                var petImage = $("<img>");

                petImage.attr("src", results[i].images.fixed_height_small_still.url);
                petImage.attr("class", "gif");
                petImage.attr("data-state", "still");
                petImage.attr("data-still", results[i].images.fixed_height_small_still.url );
                petImage.attr("data-animate", results[i].images.fixed_height_small.url);
                petDiv.attr("style", "float: left; margin-right: 15px");

                petDiv.append(p);
                petDiv.append(petImage);

                $("#gifs-appear-here").prepend(petDiv);
            }
        });
});

$("body").on("click", "img", function()  {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


