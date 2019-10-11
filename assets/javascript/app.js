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

    $("#submitButton").on("click", function (event) {
        event.preventDefault();
        if ($("#trainNameInput").val() !== "" && $("#destinationInput").val() !== "" && $("#firstTrainTimeInput").val() !== "" && $("#frequencyInput").val() !== "") {
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
        }
    });

    database.ref().on("child_added", function (snapshot) {
        var trainName = snapshot.val().name;
        var trainDestination = snapshot.val().destination;
        var firstTrainTime = snapshot.val().start;
        var trainFrequency = snapshot.val().frequency;
        var convertedFirstTrain = moment(firstTrainTime, "HH:mm").subtract(1, "years");
        var timeDiff = moment().diff(moment(convertedFirstTrain), "minutes");
        var timeRemainder = timeDiff % trainFrequency;
        var minutesAway = trainFrequency - timeRemainder;
        var nextTrain = moment().add(minutesAway, "minutes").format("HH:mm");
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesAway),
        );
        $("#currentTrainsTable").append(newRow);
    });
});