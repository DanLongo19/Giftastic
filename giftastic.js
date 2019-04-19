let topics = ["soccer", "hockey", "baseball", "basketball", "football"];

function makeButtons (){
  $("#buttonSpace").empty()
  for (let i = 0; i < topics.length; i++){
  let button = $("<button>")
    .addClass("topicButton")
    .text(topics[i])
    .attr("data-type", topics[i]);
    $("#buttonSpace").append(button);
  } 
}
makeButtons()

$(document).on("click", ".topicButton", function(){
  let type = $(this).data('type');
  console.log(type);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        type + "&api_key=wPflYfEU0Wdut2iOW1BMYDVAlLNcLqPD&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
          let searchDiv = $('<div class="search-item">');
          let rating = response.data[i].rating;
          let p = $('<p>').text('Rating: '+rating);
          let animated = response.data[i].images.fixed_height.url;
          let still = response.data[i].images.fixed_height_still.url;
          let image = $('<img>');
          image.attr('src', still);
          image.attr('data-still', still);
          image.attr('data-animated', animated);
          image.attr('data-state', 'still');
          image.addClass('searchImage');
          searchDiv.append(p);
          searchDiv.append(image);
          $('#buttonSpace').append(searchDiv);
      }

});  

})
$(document).on('click', '.searchImage', function(){
    let state = $(this).attr('data-state');
    if (state == 'still'){
        $(this).attr('src', $(this).data('animated'))
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'))
        $(this).attr('data-state', 'still');
    }
})

$('#submit').on('click', function(){
    let newTopic = $("#search-input").val().trim()
    topics.push(newTopic);
    makeButtons();
    return false
})