jQuery(document).ready(function ($) {
    
    // ### START retrieveItem() REGION
    var startWk = moment().startOf("isoweek").toDate();
    var begin = new Date(1970, 0, 1);
    var btwn = (startWk.getTime() - begin.getTime());
    var curDisName = $('.genRef_ID').val();
    var TimeSheetRef_id = curDisName.replace(/\s/g, '') + "_" + parseFloat(btwn);

    console.log("This Week's Ref_id for You is: "+TimeSheetRef_id);

    retrieveItem(TimeSheetRef_id); //Invoke retrieveItem()

    function retrieveItem(TimeSheetRef_id) {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();
        var list = web.get_lists().getByTitle("IPPFTimesheet");

        var items = "";
        var ienum = "";

        var query = new SP.CamlQuery();
        //query.set_viewXml("<View><Query><Where><Eq><FieldRef Name='TaskName' /><Value Type='Text'>" + taskNamedHere + "</Value></Eq></Where></Query></View>");
        query.set_viewXml(`<View><Query><Where><Geq><FieldRef Name='Ref_id' /><Value Type='Text'>` + TimeSheetRef_id + `</Value></Geq></Where></Query></View>`);

        items = list.getItems(query);
        context.load(items, "Include(Status, ReviewDate, Approver, DayVal, WorkType, Employee, ProjectName, Activity, Challenges, Task, StartDate, EndDate, WorkedHours, Comments, SUN,MON,TUE,WED,THUR,FRI,SAT,TOTAL)"); /*, */
        context.executeQueryAsync(MasterPiece, fail);

        function MasterPiece() {
            ienum = items.getEnumerator();
            callSuccess();
        }

        function callSuccess() {
            //alert("Inside success");
            var totalDays = 0;


            while (ienum.moveNext()) {
                var listObj = ienum.get_current();

                var work = listObj.get_item("WorkType");
                var proj = listObj.get_item("ProjectName");
                var activity = listObj.get_item("Activity");
                var emp = listObj.get_item("Employee");
                var chal = listObj.get_item("Challenges");
                var task = listObj.get_item("Task");
                //var day = listObj.get_item("DayVal");
                var workedHrs = listObj.get_item("WorkedHours");
                var startDate = listObj.get_item("StartDate");
                var endate = listObj.get_item("EndDate");

                var sun = listObj.get_item("SUN");
                var mon = listObj.get_item("MON");
                var tue = listObj.get_item("TUE");
                var wed = listObj.get_item("WED");
                var thur = listObj.get_item("THUR");
                var fri = listObj.get_item("FRI");
                var sat = listObj.get_item("SAT");
                var totalRekt = listObj.get_item("TOTAL");

                var reviewedBy = listObj.get_item("Approver");
                var reviewDate = listObj.get_item("ReviewDate");
                var reviewStatus = listObj.get_item("Status");
                var comments = listObj.get_item("Comments");
                

                // The Upper Textfields
                //$('.myEMPloyee').val(emp).attr('readonly', 'readonly');
                $('.myEMPloyee').html(emp);
                properDate(startDate);
                formatDate(endate);
                
                // General and Project Grids
                var totaTues = 0;
                switch (work) {
                    case "Project":
                        console.log(work);
                        var myRow = `<tr>
                                        <td><span>`+ proj + `</span></td>

                                        <td><!-- <textarea class="form-control"></textarea> --><span>`+ activity + `</span></td>

                                        <td><!-- <textarea class ="form-control">< /textarea> --><span>`+ chal + `</span></td>

                                        <td><span> `+ task + ` </span></td>

                                        <td class ="rowDataSd" name="bothGrided"> `+ sun + ` </td>
                                        <td class ="rowDataSd" name="bothGrided"> `+ mon + ` </td>
                                        <td class ="rowDataSd" name="bothGrided"> `+ tue + ` </td>
                                        <td class ="rowDataSd" name="bothGrided"> `+ wed + ` </td>
                                        <td class ="rowDataSd" name="bothGrided"> `+ thur + ` </td>
                                        <td class ="rowDataSd" name="bothGrided"> `+ fri + ` </td>
                                        <td class ="rowDataSd" name="bothGrided"> `+ sat + ` </td>
                                        <td class ="rowDataSd" name="bothGrided"><strong> `+ totalRekt.toFixed(2) + ` </strong></td>
                                        <td>
                                            <button role="button" class ="btn btn-xs btn-warning">
                                                <span class ="glyphicon glyphicon-pencil"></span>
                                            </button>
                                        </td>
                                    </tr>`;
                        

                        $("#approverTbody").append(myRow);

                        // Add all row cells down each column
                        for (var z = 0; z < $('#approvedTbl tr:eq(0) th:nth-child(4) ~ th').length; z++) {
                            var totAll = 0;

                            $('td.rowDataSd:eq(' + z + ')', 'tr').each(function (z) {
                                totAll = totAll + parseInt($(this).text());
                            });

                            $('#approvedTbl tr:last td:nth-child(4) ~ td').eq(z).text(totAll.toFixed(2));

                            $('#approvedTbl tr:last td:nth-child(4) ~ td').css("font-weight", "bold");
                            $('#approvedTbl tr:last td:last').css({ "color": "red", "font-size": "1.1em" });
                        } // for Loop
                        break;

                    case "General":
                        console.log(work);
                        var myStaff = `<tr>
                                        <td><span>`+ proj + `</span></td>

                                        <td><!-- <textarea class="form-control"></textarea> --><span>`+ activity + `</span></td>

                                        <td><!-- <textarea class ="form-control">< /textarea> --><span>`+ chal + `</span></td>

                                        <td><span> `+ task + ` </span></td>

                                        <td class ="generalHRS" name="bothGrided"> `+ sun + ` </td>
                                        <td class ="generalHRS" name="bothGrided"> `+ mon + ` </td>
                                        <td class ="generalHRS" name="bothGrided"> `+ tue + ` </td>
                                        <td class ="generalHRS" name="bothGrided"> `+ wed + ` </td>
                                        <td class ="generalHRS" name="bothGrided"> `+ thur + ` </td>
                                        <td class ="generalHRS" name="bothGrided"> `+ fri + ` </td>
                                        <td class ="generalHRS" name="bothGrided"> `+ sat + ` </td>
                                        <td class ="generalHRS" name="bothGrided"><strong> `+ totalRekt.toFixed(2) + ` </strong></td>

                                        <td>
                                            <button role="button" class ="btn btn-xs btn-warning">
                                                <span class ="glyphicon glyphicon-pencil"></span>
                                            </button>
                                        </td>
                                    </tr>`;
                        $("#generalBody").append(myStaff);

                        // Add all row cells down each column
                        for (var y = 0; y < $('#generaliZed tr:eq(0) th:nth-child(4) ~ th').length; y++) {
                            var myAll = 0;

                            $('td.generalHRS:eq(' + y + ')', 'tr').each(function (y) {
                                myAll = myAll + parseInt($(this).text());
                                
                            });

                            $('tr#gen_tr_id td:nth-child(4) ~ td').eq(y).text(myAll.toFixed(2));

                            $('tr#gen_tr_id td:nth-child(4) ~ td').css("font-weight", "bold");
                            $('tr#gen_tr_id td:last').css({ "color": "red", "font-size": "1.1em" });
                        } // for Loop
                        break;

                    default:
                        console.warn("Something went Wrong!!!");
                } // switch case

                // Loop through Both Grids
                for (var f = 0; f < $('#approvedTbl tr:eq(0) th:nth-child(4) ~ th, #generaliZed tr:eq(0) th:nth-child(4) ~ th').length; f++) {
                    var bothGrids = 0;
                    $('td[name^=bothGrided]:eq(' + f + ')', 'tr').each(function (f) {
                        bothGrids = bothGrids + parseInt($(this).text());
                        //console.warn("Index: " + f + " Item Value: " + bothGrids);
                    });

                    $('tr#bothGridsSummed td:nth-child(4) ~ td').eq(f).text(bothGrids.toFixed(2));
                    $('tr#bothGridsSummed td:nth-child(4) ~ td').css({ "font-weight": "bold"});
                    $('tr#bothGridsSummed td:last').css("color", "red");
                } // for Loop
                
                totalDays += parseInt(workedHrs);
                       
            } // while Loop

            $('#workedHOURS').html(totalDays.toFixed(2) + " hrs").css("font-weight", "bold");
            //$('#projectTotalHrs').html(totaTues);
            console.log(totaTues);

            
            context.executeQueryAsync(finalResult, redCard);
        }

        // finalResult()
        function finalResult() {
            console.log("Retrives Done Successffuly");
            editPopUp(); //Invoke edit btn
        }
        function redCard(sender, args) { console.log("Error: " + args.get_message()); }

        // get Reviewd date
        function formatDate(myDates) {
            var adate = new Date(myDates);
            var dd = adate.getDate();
            var mm = adate.getMonth() + 1; //January is 0!
            var yyyy = adate.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            } adate = mm + '/' + dd + '/' + yyyy;
            //$('.myEndDateApp').val(adate).attr('readonly', 'readonly');
            $('.myEndDateApp').html(adate);
        } // formartDate()
        function properDate(myDates) {
            var adate = new Date(myDates);
            var dd = adate.getDate();
            var mm = adate.getMonth() + 1; //January is 0!
            var yyyy = adate.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            } adate = mm + '/' + dd + '/' + yyyy;
            //$('.myStartDateApp').val(adate).attr('readonly', 'readonly');
            $('.myStartDateApp').html(adate);
        } // properDate()
        function reviewDates(myDates) {
            var adate = new Date(myDates);
            var dd = adate.getDate();
            var mm = adate.getMonth() + 1; //January is 0!
            var yyyy = adate.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            } adate = mm + '/' + dd + '/' + yyyy;
            $('#reviewDate').html(adate);

        } // formartDate()

        function fail(sender, args) {
            alert("Error: " + args.get_message());
        }
    } // ### END retrieveItem() REGION



    //-----------------------------------------------
    // ### BEGIN THE EMPLOYER CONFIRM AND SUBMIT VIEW
    //-----------------------------------------------
    
    //editPopUp();
    function editPopUp() {
        var htag = $('#approverTbody tr, #generalBody tr');
        console.warn("inside editPopUp(), tr count: " + htag.length);

        htag.each(function (index, item) {
            $(this).find('.btn-xs').on('click', function(e) {
                e.preventDefault();
                /*if (e.target.className == 'glyphicon glyphicon-pencil') {*/
                    alert("clicked a pencil btn");
                    console.info("Edit Btn clicked");
                //}
            });
        });
    } // editPopUp()

    // ### END THE EMPLOYER CONFIRM AND SUBMIT VIEW
});