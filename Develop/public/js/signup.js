// calling ajax to a document with a 'ready()' method that's in a function that wraps the variables next.
$(document).ready(function() {
  var signUpForm = $("form.signup"); // Telling ajax to call to the form tag in the signup.html
  var emailInput = $("input#email-input"); // Telling ajax to call to the input tag with the id="email-input"
  var passwordInput = $("input#password-input"); // Telling ajax to call to the input tag with the id="password-input"

  // Calling the variable 'signUpForm' (line 3) connected to the 'on()' method, which has a function with the perameters '(event)'.
  // Next, call the perameter that's nested in the function.  Then, use the 'prevantDefault()' method.
  // This is becuase if the event isn't handled in the right fashion or rightful order, then its default action shouldn't be taken as it usually would be handeled.
  // Next, the variable, 'userData' will be an object that has email and password validation methods to make sure they are not left blank.  This is by using the 'val()' and 'trim()' methods.
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
      // Uses an expression to show that the user fields in one, or the other can make this return happen.
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    //Calling the 'signUpUser function (line 12), with the perameters 'userData.email', and 'userData.password'.  This is just basicly saying that the user needs to complete both these fields to become a member.
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(function(data) { // Create a promise 'then()' to a function that encases the window.location
        window.location.replace("/members"); // this is done becuase I want specific information about a current location about a document. In this cerumstance "members" is what I want more about.
        
      })
      .catch(handleLoginErr); // Catching the function 'handleLoginErr'
  }

  // function 'handleLoginErr' that has the parameters '(err)' which is an object that has ajax telling it to show an alert message by via text which will be the responseJSON 
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
