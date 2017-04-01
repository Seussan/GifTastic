// Initial array of giphy buttons.
var giphys = [ "Ferret", "Giraffe", "Hedgehog", "Rabbit", "Kitten", "Puppy"];

// displayGiphyInfo function updates HTML content to display the giphy images.
function displayGiphyInfo() {

  // Use the button's name to create variable for use in search. 
  var giphy = $(this).attr("data-name");

  // Actual search URL to be submitted for result set of giphys.
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0"; 

  // Creating an AJAX call for the specific giphy button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    // console.log(response);

    // Creating a div to hold the group of giphys
    var giphyDiv = $("<div class='giphyInfo'>");

    // Loop through the entire list to create the corresponding html.
    for (var i = 0; i < response.data.length; i++) {

      // Process this specific row of the record set.
      var giphyResult = response.data[i];

      // Assign the URLs for this giphy: still and gif
      var imgStillURL = giphyResult.images.fixed_height_still.url;
      var imgURL = giphyResult.images.fixed_height.url;

      // Shortcut variable for start of html element using jQuery.
      var imageInfo = $("<img>");

      // Default image to display.
      imageInfo.attr("src", imgStillURL);

      // Store both types of images in a data object.
      imageInfo.attr("data-still", imgStillURL);
      imageInfo.attr("data-giphy", imgURL);

      // Create class for this image so we capture a click on it later.
      imageInfo.addClass("giphyImage");

      // Assign the rating for the image.
      giphyDiv.append($("<p>").text("Rating: " + giphyResult.rating));

      // Append the images to current html layout.
      giphyDiv.append(imageInfo);

      // Place this giphy above the previous giphys.
      $("#giphys-view").prepend(giphyDiv);
    }

  });

}

// Function for displaying Animal giphy buttons.
function renderButtons() {

  // Deleting the giphys prior to adding new giphys
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of giphys
  for (var i = 0; i < giphys.length; i++) {

    // Then dynamicaly generating buttons for each giphy in the array
    // This code $("<button>") is all jQuery needs to create the beginning
    // and end tag. (<button></button>)
    var btn = $("<button>");
    // Adding a class of giphy to our button
    btn.addClass("giphy");

    // Add Bootstrap color
    btn.addClass("btn-primary");

    // Adding a data-attribute
    btn.attr("data-name", giphys[i]);

    // Providing the initial button text
    btn.text(giphys[i]);

    // Adding the button to the buttons-view div
    $("#buttons-view").append(btn);
  }
}

// This function handles events where a button is clicked
$("#add-giphy").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox and removes all surrounding white space.
  var giphy = $("#giphy-input").val().trim();

  if (giphy > "") {
  // Adding giphy from the textbox to our array
  giphys.push(giphy);

    // Calling renderButtons which handles the processing of our giphy array
  renderButtons();

  $("#giphy-input").val("");

  }
});

// This function handles events where a giphy is clicked
$(document).on("click", ".giphyImage", function() {

  var giphyClicked = $(this);
  //console.log(giphyClicked);

  // If the current image is a still image...
  if (giphyClicked.attr("src") == giphyClicked.attr("data-still")) {

    // Change image to a moving image.
    giphyClicked.attr("src", giphyClicked.attr("data-giphy"));
  }
  else {  // Image is moving...

    // So change it back to a still image.
    giphyClicked.attr("src", giphyClicked.attr("data-still"));
  }

  // Replace image where it is.
  giphyClicked.append(giphyClicked);

});

// Click event listener for all button elements with a class of "giphy"
$(document).on("click", ".giphy", displayGiphyInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();