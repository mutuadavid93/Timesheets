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
        context.load(items, "Include(ID,Status, ReviewDate, Approver, DayVal, WorkType, Employee, ProjectName, Activity, Challenges, Task, StartDate, EndDate, WorkedHours, Comments, SUN,MON,TUE,WED,THUR,FRI,SAT,TOTAL)"); /*, */
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

                var recordID = listObj.get_item("ID");

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
                                        <td class ="recordID hidden"> `+ recordID + ` </td>

                                        <td class ="projectid"> `+ proj + ` </td>

                                        <td class ="activities"> `+ activity + ` </td>

                                        <td class ="difficult"> `+ chal + ` </td>

                                        <td class ="task"> `+ task + ` </td>

                                        
                                        <td class ="rowDataSd monday" name="bothGrided"> `+ mon + ` </td>
                                        <td class ="rowDataSd tuesday" name="bothGrided"> `+ tue + ` </td>
                                        <td class ="rowDataSd wednesday" name="bothGrided"> `+ wed + ` </td>
                                        <td class ="rowDataSd thursday" name="bothGrided"> `+ thur + ` </td>
                                        <td class ="rowDataSd friday" name="bothGrided"> `+ fri + ` </td>
                                        <td class ="rowDataSd satarday" name="bothGrided"> `+ sat + ` </td>
                                        <td class ="rowDataSd sunday" name="bothGrided"> `+ sun + ` </td>
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

                                        <td class ="recordID hidden"> `+ recordID + ` </td>

                                        <td class ="projectid"> `+ proj + ` </td>

                                        <td class ="activities"> `+ activity + ` </td>

                                        <td class ="difficult"> `+ chal + ` </td>

                                        <td class ="task"> `+ task + ` </td>

                                        
                                        <td class ="generalHRS  monday   " name="bothGrided"> `+ mon + ` </td>
                                        <td class ="generalHRS  tuesday  " name="bothGrided"> `+ tue + ` </td>
                                        <td class ="generalHRS  wednesday" name="bothGrided"> `+ wed + ` </td>
                                        <td class ="generalHRS  thursday " name="bothGrided"> `+ thur + ` </td>
                                        <td class ="generalHRS  friday   " name="bothGrided"> `+ fri + ` </td>
                                        <td class ="generalHRS  satarday " name="bothGrided"> `+ sat + ` </td>
                                        <td class ="generalHRS  sunday   " name="bothGrided"> `+ sun + ` </td>
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
                    //alert("clicked a pencil btn");
                    console.info("Edit Btn clicked");

                    $('#modal').modal({
                        show: true
                    });

                // get the tr's cntrls vals
                    var curTr = $(this).closest('tr');
                    curTr.find('td:not(:last-child)').each(function (f, val) {
                        //console.log("Item value: " + $(this).html());
                        var realItem = $(this).html();
                        var mval = realItem.trim();

                        

                        if ($(this).hasClass('projectid')) {
                            $('#project').val(mval);
                        } else if ($(this).hasClass('difficult')) {
                            $('#chall').val(mval);
                        } else if ($(this).hasClass('activities')) {
                            $('#act').val(mval);
                        } else if ($(this).hasClass('task')) {
                            $('#task').val(mval);
                        }

                        else if ($(this).hasClass('monday')) {
                            $('#mond').val(mval);
                        } else if ($(this).hasClass('tuesday')) {
                            $('#tuesd').val(mval);
                        } else if ($(this).hasClass('wednesday')) {
                            $('#weds').val(mval);
                        } else if ($(this).hasClass('thursday')) {
                            $('#thurs').val(mval);
                        }

                        else if ($(this).hasClass('friday')) {
                            $('#frids').val(mval);
                        } else if ($(this).hasClass('satarday')) {
                            $('#sats').val(mval);
                        } else if ($(this).hasClass('sunday')) {
                            $('#sunds').val(mval);
                        }

                        else if ($(this).hasClass('recordID')) {
                            $('#recordID').html("<p class='text-center'>This item ID is " + mval + "</p>");
                            
                            $('#saveFromPopUp').on('click', function (event) {
                                event.preventDefault();
                                updateFromPopUp(mval);
                            });
                            
                        }

                        else {
                            //alert("td has nothing");
                        }
                    });
            });
        });
    } // editPopUp()


    // Using the clicked item's ID to get Status and Insert to ApproverTimesheet View
    // Get the Task ID from URL
    function getTaskURLID(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    var urlTaskID = getTaskURLID("ID", window.location.href);

    //$('#approveComments');

    $('#userConfirmSubmit').on('click', function (event) {
        event.preventDefault();
        userconfirm(urlTaskID);
    });
    


    function userconfirm(urlTaskID) {
        var currCtx = SP.ClientContext.get_current();
        var myWeb = currCtx.get_web();
        var ref_id = "";
        var anEmp = myWeb.get_currentUser();

        try {
            // Insertion of RefIds
            //alert("Ref_id: " + ref_id + " Employee: " + curser);
            var lstRefID = myWeb.get_lists().getByTitle("Emp_TaskList");

            var itemCollection = "";
            var itemToUpdate = "";
            
            var myQuery = new SP.CamlQuery();
            //myQuery.set_viewXml("<View><RowLimit>1</RowLimit></View>");
            myQuery.set_viewXml(`<View><Query><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>` + urlTaskID + `</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>`);


            itemCollection = lstRefID.getItems(myQuery);
            currCtx.load(itemCollection);
            currCtx.executeQueryAsync(taskinserted, taskfailed);

            function taskinserted() {
                itemToUpdate = itemCollection.getEnumerator();
                finals();
            }

            function finals() {
                //alert("Inside finals Func");
                while (itemToUpdate.moveNext()) {
                    var myObj = itemToUpdate.get_current();
                    var taskRefID = myObj.get_item("TimeSheetRefID");
                    var tskstatus = myObj.get_item("Status");
                    var taskNAME = myObj.get_item("Title");
                    var taskStatus = myObj.get_item("Status0");

                    var startdate = myObj.get_item("StartDate");
                    var enddate = myObj.get_item("DueDate");

                    var employee = myObj.get_item("Employee");
                    //var relUser = employee.get_lookupValue();


                } //while Loop

                //alert("Creating first task");
                var timeshList = myWeb.get_lists().getByTitle("TimeSheetTaskList");
                var Obj = new SP.ListItemCreationInformation();
                var kingItem = timeshList.addItem(Obj);
                var usercomments = $('#approveComments').val();

                kingItem.set_item("Ref_id", taskRefID);
                kingItem.set_item("StartDate", startdate);
                kingItem.set_item("DueDate", enddate);
                kingItem.set_item("Status0", taskStatus);
                kingItem.set_item("Status", tskstatus);
                kingItem.set_item("c2uy", employee);
                kingItem.set_item("Title", taskNAME);
                kingItem.set_item("User_x0020_Comments", usercomments);

                kingItem.update();
                currCtx.load(kingItem);
                currCtx.executeQueryAsync(newapprovertaskcreated, newtaskfailed);
            }
            function taskfailed(sender, args) { alert("Error: " + args.get_message()); }

            //addingItem.update();

        } catch (ex) {
            alert(ex.message);
        }
    } //submitTask
    function newapprovertaskcreated() {
        console.info("TimesheetTaskList Tasks Added Successfully");
        window.location.reload(true);

        // Insert to TimeSheetTaskList
    }
    function newtaskfailed(sender, args) { alert("Error: " + args.get_message()); }

    // ### END THE EMPLOYER CONFIRM AND SUBMIT VIEW


    // ### START UPDATING THE TIMESHEET FROM POPUP WINDOW

    function updateFromPopUp(popID) {
        //alert("This item ID is: " + popID);

        var drcontext = SP.ClientContext.get_current();
        var web = drcontext.get_web();
        var lst = web.get_lists().getByTitle("IPPFTimesheet");
        var itemCollection = "";

        var itemCollToBeUpdated = "";
        var lstItemToBeUpdated = "";

        var myQuery = new SP.CamlQuery();
        myQuery.set_viewXml(`<View><Query><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>` + popID + `</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>`);

        itemCollToBeUpdated = lst.getItems(myQuery);
        drcontext.load(itemCollToBeUpdated, "Include(ID,ProjectName, Activity, Challenges, Task, WorkedHours,SUN,MON,TUE,WED,THUR,FRI,SAT)");
        drcontext.executeQueryAsync(moveToNext, popupfailed);

        function moveToNext() {
            lstItemToBeUpdated = itemCollToBeUpdated.getEnumerator();
            popupsuccess();
        }

        function popupsuccess() {
            //alert("Inside popupsuccess()");
            while (lstItemToBeUpdated.moveNext()) {
                var listItem = lstItemToBeUpdated.get_current();
                // Get values from available controls
                var proj = $('#project').val();
                var act = $('#act').val();
                var chall = $('#chall').val();
                var task = $('#task').val();

                var realIDentity = listItem.get_item("ID");

                console.log("List ID: "+realIDentity+" UI ID: "+popID);
                // update columns
                if (realIDentity == popID) {
                    listItem.set_item("ProjectName", proj);
                    listItem.set_item("Activity", act);
                    listItem.set_item("Challenges", chall);
                    listItem.set_item("Task", task);

                    $('#myrowed input').each(function (yii, item) {
                        //console.log($(this).filter("[id='mond']"));
                        if ($(this).attr("id") == 'mond') {
                            var mond = $('#mond').val();
                            listItem.set_item("MON", mond);
                        } else if ($(this).attr("id") == 'tuesd') {
                            var tues = $('#tuesd').val();
                            listItem.set_item("TUE", tues);
                        } else if ($(this).attr("id") == 'weds') {
                            var weds = $('#weds').val();
                            listItem.set_item("WED", weds);
                        } else if ($(this).attr("id") == 'thurs') {
                            var thurs = $('#thurs').val();
                            listItem.set_item("THUR", thurs);
                        } else if ($(this).attr("id") == 'frids') {
                            var frids = $('#frids').val();
                            listItem.set_item("FRI", frids);
                        } else if ($(this).attr("id") == 'sats') {
                            var sats = $('#sats').val();
                            listItem.set_item("SAT", sats);
                        } else if ($(this).attr("id") == 'sunds') {
                            var sunds = $('#sunds').val();
                            listItem.set_item("SUN", sunds);
                        }
                    });

                    listItem.update();
                    drcontext.executeQueryAsync(listupdated, listfailed);
                }
                
            }
        }
    }// uodateFromPopUp

    
    function popupfailed(sender, args) { console.warn("Error: "+args.get_message()); }

    function listupdated() {
        console.log("Updated from popup updating");
        window.location.reload(true);
    }
    function listfailed(sender, args){ alert("Error on Pop Up: "+args.get_message()) }


    // Show the Submit Btn
    $('input[type="checkbox"] ').on("change", function (event) {
        if ($(this).is(':checked')) {
            $('#userConfirmSubmit').removeClass('hidden').fadeIn("slow");
        } else {
            $('#userConfirmSubmit').fadeOut("slow").addClass('hidden');
        }
    });

    // ### END UPDATING THE TIMESHEET FROM POPUP WINDOW
});