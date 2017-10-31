jQuery(document).ready(function ($) {

    

    
    // ### START retrieveItem() REGION
    var startWk = moment().startOf("isoweek").toDate();
    var begin = new Date(1970, 0, 1);
    var btwn = (startWk.getTime() - begin.getTime());
    var curDisName = $('.genRef_ID').val();
    var TimeSheetRef_id = curDisName.replace(/\s/g, '') + "_" + parseFloat(btwn);

    console.log("This Week's Ref_id for You is: "+TimeSheetRef_id);

    function retrieveItem(emptaskname) {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();
        var list = web.get_lists().getByTitle("IPPFTimesheet");

        var items = "";
        var ienum = "";

        var query = new SP.CamlQuery();
        //query.set_viewXml("<View><Query><Where><Eq><FieldRef Name='TaskName' /><Value Type='Text'>" + taskNamedHere + "</Value></Eq></Where></Query></View>");
        query.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Ref_id' /><Value Type='Text'>" + emptaskname + "</Value></Eq></Where></Query></View>");
        //query.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='Ref_id' /><Value Type='Text'>" + emptaskname + "</Value></Eq><Eq><FieldRef Name='Status' /><Value Type='Text'>PENDING</Value></Eq></And></Where></Query></View>");
        //query.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='TaskName' /><Value Type='Text'>"+emprefid+"</Value></Eq><Eq><FieldRef Name='Ref_id' /><Value Type='Text'>"+emptaskname+"</Value></Eq></And></Where></Query></View>");

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
                        var myRow = "<tr>"+
                                        "<td class ='recordID hidden'> "+ recordID + " </td>"+

                                        "<td class ='projectid'> "+ proj + " </td>"+

                                        "<td class ='activities'> "+ activity + " </td>"+

                                        "<td class ='difficult'> "+ chal + " </td>"+

                                        "<td class ='task'>"+ task + " </td>"+

                                        
                                        "<td class ='rowDataSd monday' name='bothGrided'> "+ mon + " </td>"+
                                        "<td class ='rowDataSd tuesday' name='bothGrided'> "+ tue + " </td>"+
                                        "<td class ='rowDataSd wednesday' name='bothGrided'> "+ wed + " </td>"+
                                        "<td class ='rowDataSd thursday' name='bothGrided'> "+ thur + " </td>"+
                                        "<td class ='rowDataSd friday' name='bothGrided'> "+ fri + " </td>"+
                                        "<td class ='rowDataSd satarday' name='bothGrided'> "+ sat + " </td>"+
                                        "<td class ='rowDataSd sunday' name='bothGrided'> "+ sun + " </td>"+
                                        "<td class ='rowDataSd' name='bothGrided'><strong> "+ totalRekt.toFixed(2) + " </strong></td>"+
                                        "<td>"+
                                            "<button style='min-width: 2em;' role='button' class ='btn btn-xs btn-info'>"+
                                                "<span class ='glyphicon glyphicon-pencil'></span>"+
                                            "</button>"+
                                            "<button style='min-width: 2em;' role='button' class ='btn btn-xs btn-danger'>"+
                                                "<span class ='glyphicon glyphicon-trash'></span>"+
                                            "</button>"+
                                        "</td>"+
                                    "</tr>";
                        

                        $("#approverTbody").append(myRow);

                        // Add all row cells down each column
                        for (var z = 0; z < $('#approvedTbl tr:eq(0) th:nth-child(4) ~ th').length; z++) {
                            var totAll = 0;

                            $('td.rowDataSd:eq(' + z + ')', 'tr').each(function (z) {
                                totAll = totAll + parseFloat($(this).text());
                                //totAll = totAll + parseInt($(this).text());
                            });

                            $('#approvedTbl tr:last td:nth-child(4) ~ td').eq(z).text(totAll.toFixed(2));

                            $('#approvedTbl tr:last td:nth-child(4) ~ td').css("font-weight", "bold");
                            $('#approvedTbl tr:last td:last').css({ "color": "red", "font-size": "1.1em" });
                        } // for Loop
                        break;

                    case "General":
                        console.log(work);
                        var myStaff = "<tr>"+
                                        "<td class ='recordID hidden'> "+ recordID + " </td>"+

                                        "<td class ='projectid'> "+ proj + " </td>"+

                                        "<td class ='activities'> "+ activity + " </td>"+

                                        "<td class ='difficult'> "+ chal + " </td>"+

                                        "<td class ='task'>"+ task + " </td>"+

                                        
                                        "<td class ='generalHRS  monday   ' name='bothGrided'> "+ mon + " </td>"+
                                        "<td class ='generalHRS  tuesday  ' name='bothGrided'> "+ tue + " </td>"+
                                        "<td class ='generalHRS  wednesday' name='bothGrided'> "+ wed + " </td>"+
                                        "<td class ='generalHRS  thursday ' name='bothGrided'> "+ thur + " </td>"+
                                        "<td class ='generalHRS  friday   ' name='bothGrided'> "+ fri + " </td>"+
                                        "<td class ='generalHRS  satarday ' name='bothGrided'> "+ sat + " </td>"+
                                        "<td class ='generalHRS  sunday   ' name='bothGrided'> "+ sun + " </td>"+
                                        "<td class ='generalHRS' name='bothGrided'><strong> "+ totalRekt.toFixed(2) + " </strong>"+

                                        "<td>"+
                                            "<button style='min-width: 2em;' role='button' class ='btn btn-xs btn-info'>"+
                                                "<span class ='glyphicon glyphicon-pencil'></span>"+
                                            "</button>"+
                                            "<button style='min-width: 2em;' role='button' class ='btn btn-xs btn-danger'>"+
                                                "<span class ='glyphicon glyphicon-trash'></span>"+
                                            "</button>"+
                                        "</td>"+
                                    "</tr>";

                        $("#generalBody").append(myStaff);

                        // Add all row cells down each column
                        for (var y = 0; y < $('#generaliZed tr:eq(0) th:nth-child(4) ~ th').length; y++) {
                            var myAll = 0;

                            $('td.generalHRS:eq(' + y + ')', 'tr').each(function (y) {
                                myAll = myAll + parseFloat($(this).text());
                                
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
                        bothGrids = bothGrids + parseFloat($(this).text());
                        //console.warn("Index: " + f + " Item Value: " + bothGrids);
                    });

                    $('tr#bothGridsSummed td:nth-child(4) ~ td').eq(f).text(bothGrids.toFixed(2));
                    $('tr#bothGridsSummed td:nth-child(4) ~ td').css({ "font-weight": "bold"});
                    $('tr#bothGridsSummed td:last').css("color", "red");
                } // for Loop
                
                // Total Both Project and General Worked Worked Hours
                totalDays += parseFloat(workedHrs);
                       
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
            deleteITEm(); // Invoke delete FUNC

            // Hide Edit/Delete Btns
            if ($('.emptaskstatus_real').html() == "Completed") {
                $('#approverTbody tr td, #generalBody tr td').find('.btn-xs').addClass("hidden");
            }

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

    // Delete Selected Item
    var deleteITEm = function() {
        var dtag = $('#approverTbody tr, #generalBody tr');
        dtag.each(function (i, item) {
            $(this).find('.btn-danger').on('click', function (e) {
                e.preventDefault();
                var curTr = $(this).closest('tr');
                curTr.find('td:not(:last-child)').each(function (f, val) {
                    var realItem = $(this).html();
                    var mval = realItem.trim();

                    if ($(this).hasClass('recordID')) {
                        var currentItemID = mval;

                        // now delete
                        var clientContext = SP.ClientContext.get_current();
                        var oList = clientContext.get_web().get_lists().getByTitle('IPPFTimesheet');

                        if (confirm('Delete this item ?')) {
                            var oListItem = oList.getItemById(currentItemID);
                            oListItem.deleteObject(); //Delete it

                            clientContext.executeQueryAsync(welldeleted(currentItemID), nodeleted);
                            window.location.reload(true);
                        }                        
                    }
                });

            });
        });

        function welldeleted(curid) {
            console.log("deleted item ID: " + curid);
        }
        function nodeleted(sender, args) {
            console.warn("Error: " + args.get_message() + " Stack Trace: " + args.get_stackTrace());
        }
    };
    
    //editPopUp();
    function editPopUp() {
        var htag = $('#approverTbody tr, #generalBody tr');
        console.warn("inside editPopUp(), tr count: " + htag.length);

        htag.each(function (index, item) {
            $(this).find('.btn-info').on('click', function (e) {
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
                            $('#project').val(mval).prop('readonly', true);
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
                            //$('#recordID').html("<p class='text-center'>This item ID is " + mval + "</p>");
                            
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
        userconfirm(timeListREFIds, update_TsskList, updateIppfTimesheetStatus);
    });
    
    
    // ### START QUERY EMP_TASKLIST FOR REF_ID COMPARISON
    var querytASkRefID = function (urlTaskID) {
        //alert("First hit is querytASkRefID function");
        var context = SP.ClientContext.get_current();
        var listRefID = context.get_web().get_lists().getByTitle("Emp_TaskList");

        var q = new SP.CamlQuery();
        q.set_viewXml("<View><Query><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>"+urlTaskID+"</Value></Eq></Where></Query></View>");

        var fetchedItems = listRefID.getItems(q);
        var items = context.loadQuery(fetchedItems);
        context.executeQueryAsync(itemsreturned, itemsnotreturned);

        function itemsreturned() {
            //alert(items.length);
            if (items.length > 0) {
                var myItem = items[0];
                var taskRef = myItem.get_item("TimeSheetRefID");
                var taskStats = myItem.get_item("Status");

                var taskRefTitle = myItem.get_item("Title");
                var taskStartDate = myItem.get_item("StartDate");
                var taskDueDate = myItem.get_item("DueDate");
                var Comments = myItem.get_item("Comments");
                var EMpName = myItem.get_item("Employee");
                var sendBy = EMpName.get_lookupValue();
                //alert("Employee sending data is: " + sendBy);

                //alert(taskRefTitle + " Ref_ID now: " + taskRef);

                $('.newtaskname').val(taskRefTitle);
                $('.newtaskrefid').val(taskRef);
                $('.newtaskStartDate').val(taskStartDate);
                $('.newtaskDueDate').val(taskDueDate);
                $(".emptaskstatus_real").html(taskStats);

                // Filter the Tasks by Ref_id and Status equal Pending
                retrieveItem($('.newtaskrefid').val()); //Invoke retrieveItem()
                //retrieveItem(taskRefTitle);

                //alert(taskStats);
                if (taskStats == "Completed") {
                    $('#approveComments').val(Comments).attr("readonly", "true");
                    $('#addNewTaskBtn').addClass("hidden");
                    $('div.checkbox').addClass("hidden");
                }
                
            }
        }
        function itemsnotreturned(sender, args) { alert("Error on Comparing URL & Task Refs"+args.get_message()); }
    }(urlTaskID);

    // ### END QUERY EMP_TASKLIST FOR REF_ID COMPARISON
    function userconfirm(callback, callback2, callback3) {
        // SET values for the callback
        var EmpTaskName = $('.newtaskname').val();
        var EmpRefId = $('.newtaskrefid').val();

        var EmpStartDate = moment($('.newtaskStartDate').val()).format('MM/DD/YYYY');
        var EmpDueDate = moment($('.newtaskDueDate').val()).format('MM/DD/YYYY');

        callback(EmpRefId, EmpTaskName, EmpStartDate, EmpDueDate); // invoke submission to a TimesheetTaskList

        // Update Emp_TaskList [ TaskStatus = Completed ]
        callback2();

        // Update IPPFTimesheet Status to Awaiting Approval
        callback3();
    } //submitTask
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
        myQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>" + popID + "</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>");

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

    // Redirect to Home Page on Close
    $('#closeSubmit').on('click', function (event) {
        event.preventDefault();
        window.location.href = '/sites/apps/SitePages/Home.aspx';
    });

    // ### END UPDATING THE TIMESHEET FROM POPUP WINDOW


    // ### START ADD NEW TASK POPUP
    
    $('#addNewTaskBtn').on('click', function (event) {
        event.preventDefault();

        $('#addnewtask-modal').modal({
            show: true
        });

    });

    $('#submitnewtask').on('click', function (e) {
        e.preventDefault();
        addnewtaskpop(TimeSheetRef_id);
    });

    function addnewtaskpop(TimeSheetRef_id) {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();

        try {
            var list = web.get_lists().getByTitle("IPPFTimesheet");
            var itemInfoObj = new SP.ListItemCreationInformation();
            var curser = web.get_currentUser();

            var newAddedItem = list.addItem(itemInfoObj);

            var dayTextval = $('#newday option:selected').text();
            var worktyped = $('#worktyped').val();
            var newproject = $('#ctl00_PlaceHolderMain_newproject option:selected').text();
            var newactivity = $('#newactivity').val();
            var newtask = $('#newtask').val();
            var newchallenges = $('#newchallenges').val();
            var newday = $('#newday').val();
            var workedhours = $('#newworkedhrs').val();

            //alert("Worked Hours: " + workedhours);

            console.log(dayTextval + " " + worktyped + " " + newproject + " " + newday);

            switch (dayTextval) {
                case "MON":
                    newAddedItem.set_item("MON", workedhours);
                    break;

                case "TUE":
                    newAddedItem.set_item("TUE", workedhours);
                    break;

                case "WED":
                    newAddedItem.set_item("WED", workedhours);
                    break;

                case "THUR":
                    newAddedItem.set_item("THUR", workedhours);
                    break;

                case "FRI":
                    newAddedItem.set_item("FRI", workedhours);
                    break;

                case "SAT":
                    newAddedItem.set_item("SAT", workedhours);
                    break;

                case "SUN":
                    newAddedItem.set_item("SUN", workedhours);
                    break;

                default:

            } // switch

            newAddedItem.set_item("Ref_id", TimeSheetRef_id);
            newAddedItem.set_item("Status", "Pending");

            newAddedItem.set_item("WorkType", worktyped);
            newAddedItem.set_item("ProjectName", newproject);
            newAddedItem.set_item("Activity", newactivity);
            newAddedItem.set_item("Challenges", newchallenges);
            newAddedItem.set_item("Task", newtask);
            newAddedItem.set_item("WorkedHours", workedhours);


            newAddedItem.set_item("TaskName", $('.newtaskname').val());

            newAddedItem.set_item("DayVal", newday);
            //newAddedItem.set_item("Day", dayText);
            newAddedItem.set_item("StartDate", moment().startOf("isoweek").toDate());
            newAddedItem.set_item("Employee", $('.myEMPloyee').html());
            newAddedItem.set_item("EndDate", moment().endOf("isoweek").toDate());

            // Invoke listRefIds List
            newAddedItem.update();
            context.load(curser);
            context.executeQueryAsync(newpopsuccess, newpopfailed);

        } catch (Ex) {
            alert("Error on add new Task: " + Ex.message);
        }
    }

    function newpopsuccess() {
        console.log("Done insertion of new pop item");
        window.location.reload(true);
    }
    function newpopfailed(sender, args) { alert("Eroor on newpop add item: " + args.get_message()); }

    // ### END ADD NEW TASK POPUP

    

    // ### INSERT INTO TimesheetTaskList ONCLICK OF EMP_SUBMIT BTN
    function timeListREFIds(EmpRefId, EmpTaskName, EmpStartDate, EmpDueDate) {
        //alert("We are inside timeListREFIds");
        var currCtx = SP.ClientContext.get_current();
        var myWeb = currCtx.get_web();

        var anEmp = myWeb.get_currentUser();

        try {
            // Insertion of RefIds
            //alert("Ref_id: " + ref_id + " Employee: " + curser);
            var lstRefID = myWeb.get_lists().getByTitle("TimeSheetTaskList");
            var Obj = new SP.ListItemCreationInformation();

            var itemCollection = "";
            var itemToUpdate = "";
            var EmpTaskStatus = "Awaiting Approval";
            var neTaskStatus = "Not Started";
            var empComments = $('#approveComments').val();
            
            var myQuery = new SP.CamlQuery();
            //myQuery.set_viewXml("<View><RowLimit>1</RowLimit></View>");
            myQuery.set_viewXml("<View />");
            itemCollection = lstRefID.getItems(myQuery);
            currCtx.load(itemCollection);
            currCtx.executeQueryAsync(callList, killLst);

            function callList() {
                itemToUpdate = itemCollection.getEnumerator();
                finals();
            }

            function finals() {
                //alert("Inside finals Func");
                while (itemToUpdate.moveNext()) {
                    var myObj = itemToUpdate.get_current();
                    var taskRefID = myObj.get_item("Ref_id");
                    var TtaskName = myObj.get_item("Title");
                    var tskstatus = myObj.get_item("Status");
                } //while Loop

                //alert("EmpTaskName : " + EmpTaskName + " TtaskName: " + TtaskName);

                if (EmpTaskName == TtaskName) {
                    // Update Existing Task in TimesheetTaskList[ Change Status = Awaiting Approval ]);
                    myObj.set_item("Status0", EmpTaskStatus);
                    myObj.set_item("Status", neTaskStatus);
                    myObj.set_item("User_x0020_Comments", empComments);
                    myObj.update();
                    currCtx.executeQueryAsync(insertListRef, refrain);
                } else {
                    // Create new Task in TimesheetTaskList
                    var kingItem = lstRefID.addItem(Obj);

                    kingItem.set_item("Ref_id", EmpRefId);
                    kingItem.set_item("StartDate", EmpStartDate);
                    kingItem.set_item("DueDate", EmpDueDate);
                    kingItem.set_item("Status0", EmpTaskStatus);
                    kingItem.set_item("User_x0020_Comments", empComments);
                    kingItem.set_item("c2uy", anEmp);
                    kingItem.set_item("Title", EmpTaskName);
                    kingItem.update();
                    currCtx.load(kingItem);
                    currCtx.executeQueryAsync(insertListRef, refrain);

                    // Update Emp_TaskList [ TaskStatus = Completed ]
                }

            }
            function killLst(sender, args) { alert("Error: " + args.get_message()); }

            //addingItem.update();

        } catch (ex) {
            alert(ex.message);
        }
    } //listRefIds
    function insertListRef() {
        console.info("Everything working");
        window.location.href = '/sites/apps/SitePages/Home.aspx';
    }
    function refrain(sender, args) { alert("Error: " + args.get_message()); }

    // ### END INTO TimesheetTaskList ONCLICK OF EMP_SUBMIT BTN



    // ### START UPDATE Emp_TaskList:

    function update_TsskList() {
        var updateContext = SP.ClientContext.get_current();
        var myDweb = updateContext.get_web();

        var mylistz = myDweb.get_lists().getByTitle("Emp_TaskList");

        var EmpTask = $('.newtaskname').val();
        //alert(EmpTask);
        var query = new SP.CamlQuery();
        query.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" + EmpTask + "</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>");
        var qitems = mylistz.getItems(query);
        var tasks = updateContext.loadQuery(qitems);
        
        updateContext.executeQueryAsync(emptasklistsucceed, emptasklistfail);

        function emptasklistsucceed() {
            if (tasks.length > 0) {
                var task = tasks[0];
                task.set_item("Status", "Completed");
                task.set_item("Comments", $('#approveComments').val());
                task.set_item("Status0", "Awaiting Approval"); 
                task.update();
                updateContext.executeQueryAsync(listsucceed, emptasklistfail);
            }
        }
    } // updateEmp_TsskList()

    function listsucceed() { console.log("Successfully updated Emp_TaskList"); }
    function emptasklistfail(sender, args){ console.log("Error on Updating Emp_TaskList: "+args.get_message()) }

    // ### END UPDATE Emp_TaskList:


    // ### START UPDATE IPPFTIMEsheet:

    function updateIppfTimesheetStatus() {
        //alert("We are inside updateIppfTimesheetStatus()");
        var someCtxr = SP.ClientContext.get_current();
        var myDweb = someCtxr.get_web();

        var mylistz = myDweb.get_lists().getByTitle("IPPFTimesheet");

        var EmpTask = $('.newtaskname').val();
        var EmpTaskRefid = $('.newtaskrefid').val();
        //alert(EmpTask + " and " + EmpTaskRefid);

        var q = new SP.CamlQuery();
        q.set_viewXml("<View><Query><Where><And><Eq><FieldRef Name='TaskName' /><Value Type='Text'>TIMESHEET_116188671552</Value></Eq><Eq><FieldRef Name='Ref_id' /><Value Type='Text'>SHAREPOINTADMIN_1496620800000</Value></Eq></And></Where></Query>><RowLimit>1</RowLimit></View>");
        var queitems = mylistz.getItems(q);
        var tasks = someCtxr.loadQuery(queitems, "Include(Status, Ref_id, TaskName)");
        //alert(tasks);

        someCtxr.executeQueryAsync(successINFO, failureINFO);

        function successINFO() {
            //alert("We have "+tasks.length);
            if (tasks.length > 0) {
                var task = tasks[0];
                task.set_item("Status", "Awaiting Approval");
                task.update();
                someCtxr.executeQueryAsync(updateSuccess, timesheetlistfail);
            }
        }
    } // updateIppfTimesheetStatus()
    function updateSuccess() { console.log("Successfully updated IPPTimesheet Status"); }
    function timesheetlistfail(sender, args) { console.log("Error on Updating IPPFTimesheet: " + args.get_message()) }
    
    // ### END UPDATE IPPTimesheet:
    

});