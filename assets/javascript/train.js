//firebase initialization
var config = {
	apiKey: "AIzaSyDDE2LoLwvDmpU0Q7KLGBShfjeNAi8k_NE",
	authDomain: "train-dbd9f.firebaseapp.com",
	databaseURL: "https://train-dbd9f.firebaseio.com",
	projectId: "train-dbd9f",
	storageBucket: "train-dbd9f.appspot.com",
	messagingSenderId: "623407849784",
	appId: "1:623407849784:web:00f4f83f298ece20"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// -----------------------------

//button to add new trains
$('#newTrainBtn').on('click', function(){

  var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destInput').val().trim();
	var firstTrain = $('#firstTrainInput').val().trim();
	var frequency = $('#freqInput').val().trim();

  // Creates local "temporary" object for holding train data
	var newTrain = {
		name: trainName,
		dest: destination,
		first: firstTrain,
		freq: frequency
	}

  //Uploads employee data to the database
	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.dest);
	console.log(newTrain.first);
  console.log(newTrain.freq);
  
  // Clears all of the text-boxes
	$('#trainNameInput').val("");
	$('#destInput').val("");
	$('#firstTrainInput').val("");
	$('#freqInput').val("");

return false;
})

// Creates a Firebase event for adding trains to the database and a row in the html
database.ref().on("child_added", function(childSnapshot){
	console.log(childSnapshot.val());

	// Store everything into a variable
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().dest;
	var firstTrain = childSnapshot.val().first;
	var frequency = childSnapshot.val().freq;

	// Train info
	console.log(trainName);
	console.log(destination);
	console.log(firstTrain);
	console.log(frequency);

	//First time
	var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// Current time
	var currentTime = moment();
	console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));

	// Difference between times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % frequency;
	console.log(tRemainder);

	// Mins until train
	var tMinutesTillTrain = frequency - tRemainder;
	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination  + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
