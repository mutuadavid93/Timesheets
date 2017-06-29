$(document).ready(function () {
  
   // Prevent user form typing on any date's text fields
    $("input[type=date]").on("focus", function (event) {
        ($(event.target).hasClass("performDate")) ?

        $(this).blur()
        :
        console.warn("You can't blur on this textfield!!");
    });

    //validate dates
    $(".dateto, .datefrom,.reviewdate").datepicker();

    //current date
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

    var $today = mm + '/' + dd + '/' + yyyy;
    var $tDOAY = dd + '/' + mm + '/' + yyyy;
    $('.TodayDate').val($today);
    $('.gettdotay').val($today);
    $('.today').val($tDOAY);
   
    $('.datefrom').change(function () {

     var $todayDate = $('.gettdotay').val();   
     var   $startDate = $('.datefrom').val();

     if (Date.parse($startDate) < Date.parse($today)) {
            alert("start date should  be greater than today");
            //empty the start day
            $('.datefrom').val("");
     }
 
     $('.totaldays').val("");
     $('.dateto').val("");
    });
    $(".dateto").change(function () {

        var $todayDate1 = $('.gettdotay').val();
        var $startDate1 = $('.datefrom').val();
        var $endDate = $('.dateto').val();

        if (Date.parse($endDate) < Date.parse($startDate1) ) {
            alert("End date  should be greater than the start date");
          //  empty the  end day
            $('.dateto').val("");
        } else if (Date.parse($endDate) < Date.parse($todayDate1))
        {
            alert("End date should  be greater than today ");
            //  empty the  end day
            $('.dateto').val("");
        }
        var Totald= daydiff(parseDate($('#datefrom').val()), parseDate($('#dateto').val()));
        console.log(Totald);

        $('.totaldays').val(Totald);
    });

    //do the calculation below here(enddate-startdate)
    function parseDate(str) {
        var mdy = str.split('/')
        return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    }

    function daydiff(first, second) {
        return (second - first) / (1000 * 60 * 60 * 24)
    }
    
});