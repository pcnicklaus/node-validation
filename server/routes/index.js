var express = require('express');
var router = express.Router();
var puppyArray = [];
var peopleArray = [];

// route handler for handling a GET request to '/'
router.get('/', function(req, res, next) {
  // sends a response to the user in the form of  a template called index.html
  res.render('index');
});


// rout handle for handling a POST request to
// '/submit'
router.post('/submit', function(req,res, next) {

  var puppyInputName = req.body.puppyName;
  var puppyInputID = req.body.puppyID;

  var errors = validationCheck(puppyInputName, puppyInputID);

  if (errors.length > 0) {
    res.render('index', {
      errors: errors
    });
  } else {
    puppyArray.push({
      name: puppyInputName,
      id: puppyInputID
    });
    // sends a response to the user in the form of  dog.html
    // while also passing in the puppyArray
    res.render('result', {
      puppies: puppyArray,
      success: "Your item was saved successfully!",
      people: peopleArray,
    });
  }
});

function validationCheck(input1, input2) {

  var errorArray = [];
  var input1Trimmed = input1.trim();
  var input2Trimmed = input2.trim();

  // puppy name validations
  if(input1Trimmed === '') {
    errorArray.push("Please enter a name.");
  }

  // puppy ID validations
  if(input2Trimmed === '') {
    errorArray.push('The Id or Hobby cannot be left blank.');
  } else if (input2Trimmed.length < 3) {
    errorArray.push('The Id or Hobby must be at least 3 characters long.');
  }

  return errorArray;

}

// router.post('/person', function(req, res, next) {
//   var personInputName = req.body.personName;
//   var personHobby = req.body.hobby;
//   console.log(personInputName);
//   console.log(personHobby);
//   res.send('yo');
// });

router.post('/person', function(req,res, next) {

  var personInputName = req.body.personName;
  var personHobby = req.body.hobby;

  var errors = validationCheck(personInputName, personHobby);

  if (errors.length > 0) {
    res.render('index', {
      errors: errors
    });
  } else {
    peopleArray.push({
      name: personInputName,
      hobby: personHobby
    });
    // sends a response to the user in the form of  dog.html
    // while also passing in the puppyArray
    res.render('result', {
      people: peopleArray,
      puppies: puppyArray,
      success: "Your item was saved successfully!"
    });
  }
});


module.exports = router;
