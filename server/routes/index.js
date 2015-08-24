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

  var errors = puppyValidationCheck(puppyInputName, puppyInputID);

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

function puppyValidationCheck(puppyName, puppyId) {

  var errorArray = [];
  var puppyNameTrimmed = puppyName.trim();
  var puppyIdTrimmed = puppyId.trim();

  // puppy name validations
  if(puppyNameTrimmed === '') {
    errorArray.push("Name cannot be blank.");
  }

  // puppy ID validations
  if(puppyIdTrimmed === '') {
    errorArray.push('Id cannot be blank.');
  } else if (puppyIdTrimmed.length < 3) {
    errorArray.push('A Id must be at least 3 characters long.');
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

  var errors = puppyValidationCheck(personInputName, personHobby);

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
