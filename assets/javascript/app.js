// Initial array of giphys
var giphys = [ "Ferret", "Giraffe", "Hedgehog", "Rabbit", "Kittens", "Puppies"];
var firstTime = true;

// displaygiphyInfo function re-renders the HTML to display the appropriate content
function displaygiphyInfo() {


if (!firstTime) {

  // console.log($(this).attr(img));
  // $("<img>").attr("src", imgStillURL);

}

  var giphy = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0"; 

  firstTime = false;

  // Creating an AJAX call for the specific giphy button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    // console.log(response);

    // Creating a div to hold the giphy
    var giphyDiv = $("<div class='giphy'>");

    for (var i = 0; i < response.data.length; i++) {

      var giphyResult = response.data[i];

      // Displaying the rating
      giphyDiv.append($("<p>").text("Rating: " + giphyResult.rating));

      // Retrieving the URL for the images: still and gif
      var imgURL = giphyResult.images.fixed_height.url;
      var imgStillURL = giphyResult.images.fixed_height_still.url;

      // Creating variables to hold the images
      var image = $("<img>").attr("src", imgURL);
      var stillImage = $("<img>").attr("src", imgStillURL); 

      // Appending the images
      giphyDiv.append(stillImage);
      giphyDiv.append(image);

      // Putting the entire giphy above the previous giphys
      $("#giphys-view").prepend(giphyDiv);

    }
  });

}

// Function for displaying giphy data
function renderButtons() {

  // Deleting the giphys prior to adding new giphys
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of giphys
  for (var i = 0; i < giphys.length; i++) {

    // Then dynamicaly generating buttons for each giphy in the array
    // This code $("<button>") is all jQuery needs to create the beginning
    // and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of giphy to our button
    a.addClass("giphy");
    // Adding a data-attribute
    a.attr("data-name", giphys[i]);
    // Providing the initial button text
    a.text(giphys[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);

  }
}

// This function handles events where a giphy button is clicked
$("#add-giphy").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox and removes all surrounding white space.
  var giphy = $("#giphy-input").val().trim();

  // Adding giphy from the textbox to our array
  giphys.push(giphy);

  // Calling renderButtons which handles the processing of our giphy array
  renderButtons();

  $("#giphy-input").val("");
});

// Adding a click event listener to all elements with a class of "giphy"
$(document).on("click", ".giphy", displaygiphyInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();