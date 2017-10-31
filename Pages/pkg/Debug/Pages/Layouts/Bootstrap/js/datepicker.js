jQuery(document).ready(function ($) {

    // Prevent user form typing on any date's text fields
    $("input[type=date]").on("focus", function (event) {
        ($(event.target).hasClass("performDate")) ?
                $(this).blur()
                :
                alert("You can't blur on this textfield!!");
    });
   

    $("#reviewdate").datepicker();
    $("#reviewdate").change(function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        var gettoday = mm + '/' + dd + '/' + yyyy;


       
        var selectedDate = $("#reviewdate").val();

        if (Date.parse(selectedDate) < Date.parse(gettoday)) {
            alert(" Date of Review cannot be less than today");
            //empty the start day
            $("#reviewdate").val("");
        }
       
    });
});