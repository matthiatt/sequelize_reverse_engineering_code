$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });
});
// Didn't think we had to explain things here. since not much is needed to be said to much about it, other than what's already been added to this.