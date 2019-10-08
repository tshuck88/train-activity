$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyDvRnhfG2jP1G5jUsC0VQn3Oz7K94PNTX8",
        authDomain: "countdown-counter-6c029.firebaseapp.com",
        databaseURL: "https://countdown-counter-6c029.firebaseio.com",
        projectId: "countdown-counter-6c029",
        storageBucket: "",
        messagingSenderId: "113550255455",
        appId: "1:113550255455:web:a5df3fc3bdefcf253802ea"
    };
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    $("#submitButton").on("click", function(event){
        event.preventDefault();
        var trainName = $("#trainNameInput").val().trim();
        var trainDestination = $("#destinationInput").val().trim();
        var firstTrainTime = $("#firstTrainTimeInput").val().trim();
        var trainFrequency = $("#frequencyInput").val().trim();
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            start: firstTrainTime,
            frequency: trainFrequency
        };
        database.ref().push(newTrain);
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#firstTrainTimeInput").val("");
        $("#frequencyInput").val("");
    });

});