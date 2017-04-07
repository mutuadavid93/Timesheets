$(document).ready(function () {
    // Imeediate value of ID from Query String
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    var realID = getParameterByName("ID", window.location.href);
    console.log(realID);

    // Query the TaskList to get the Ref_id matching
    // ID val from the URL
    taskListed(realID);
    function taskListed(realID) {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();
        var lst = web.get_lists().getByTitle("TimeSheetTaskList");

        var itemCollection = "";
        var itemToUpdate = "";

        var myQuery = new SP.CamlQuery();
        myQuery.set_viewXml(`<View><Query>
                       <Where>
                          <Eq>
                             <FieldRef Name='ID' />
                             <Value Type='Counter'>`+realID+`</Value>
                          </Eq>
                       </Where>
                    </Query>
                    <RowLimit>1</RowLimit>
                    <ViewFields>
                       <FieldRef Name='Ref_id' />
                       <FieldRef Name='Status0' />
                       <FieldRef Name='ID' />
                    </ViewFields></View>`);
        itemCollection = lst.getItems(myQuery);
        context.load(itemCollection);
        context.executeQueryAsync(callList, killLst);

        function callList() {
            itemToUpdate = itemCollection.getEnumerator();
            finals();
        }

        function finals() {
            //alert("Inside finals Func");
            while (itemToUpdate.moveNext()) {
                var myObj = itemToUpdate.get_current();
                var taskRefID = myObj.get_item("Ref_id");
                var tskstatus = myObj.get_item("Status0");
                var taskID = myObj.get_item("ID");
                //alert("Task URL ID: " + taskID+" Task ID: "+realID);

                retrieveItem(taskRefID, tskstatus, taskID, realID);
            }
        }
       function killLst(sender, args){ alert("Error: "+args.get_message()); }
    }// taskListed
    

    //retrieveItem(realID);

    // CSOM RETRIEVE LIST ITEMS
    function retrieveItem(taskRefID, tskstatus, taskID, realID) {
        //alert(realID);
        var context = SP.ClientContext.get_current();
        var web = context.get_web();
        var list = web.get_lists().getByTitle("IPPFTimesheet");

        var items = "";
        var ienum = "";

        var query = new SP.CamlQuery();
        query.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Ref_id' /><Value Type='Text'>" + taskRefID + "</Value></Eq></Where></Query></View>");

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
                $('.myEMPloyee').val(emp).attr('readonly', 'readonly');
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
                           $('tr#gen_tr_id td:last').css({ "color": "red" , "font-size":"1.1em"});
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

            
            context.executeQueryAsync(finalResult(reviewStatus, reviewedBy, reviewDate, tskstatus, comments, taskID, realID), redCard);
        }

        // finalResult()
        function finalResult(reviewStatus, reviewedBy, reviewDate, tskstatus, comments, taskID, realID) {
            //alert("Reviewed By: " + reviewedBy.get_lookupValue()+ " Comments: " + comments);
            $('#approverName').html(reviewedBy.get_lookupValue());
            $('#approveComments').val(comments);
            
            reviewDates(reviewDate);
            console.log("We are done retrieving in approvers grid "+reviewStatus);
            //alert("Task Status: "+tskstatus);
            if (taskID == realID) {
                if (tskstatus == "Declined" || tskstatus == "Approved") {
                    $('#approovData, #declineData').fadeOut("slow");
                    $('.commentsLabel').html("Comments").css("font-weight", "bold");
                    $('#redirectToMains').removeClass("hidden").click(function (event) {
                        event.preventDefault();

                        window.location.href = 'http://svrarspdev01/sites/appcenter/_layouts/15/start.aspx#/SitePages/DevHome.aspx';
                    });
                }
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
            $('.myEndDateApp').val(adate).attr('readonly', 'readonly');
            
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
            $('.myStartDateApp').val(adate).attr('readonly', 'readonly');
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

    } // retrieveItem()
   

    // Do the approver
    $('#approovData').on("click", function (event) {
        event.preventDefault();
        approverUpdate(realID);
    });

    $('#declineData').on("click", function (event) {
        event.preventDefault();
        Decline(realID);
    });

    // Update the Comments
    function approverUpdate(realID) {
        //alert("Inside approverUpdate func")
        var updateContext = SP.ClientContext.get_current();
        var myweb = updateContext.get_web();

        // get the user from session
        var curUser = myweb.get_currentUser();
        var revDate = new Date();

        var itemCollToBeUpdated = "";
        var lstItemToBeUpdated = "";

        try {
            var thisList = myweb.get_lists().getByTitle("IPPFTimesheet");

            // Task List Code
            var TaskList = updateContext.get_web().get_lists().getByTitle("TimeSheetTaskList");
            var taskLIST = new SP.ListItemCreationInformation();
            var newAddedItem = TaskList.addItem(taskLIST);

            var q = new SP.CamlQuery();
            q.set_viewXml(`<View><Query>
                               <Where>
                                  <Geq>
                                     <FieldRef Name='DayVal' />
                                     <Value Type='Number'>1</Value>
                                  </Geq>
                               </Where>
                            </Query></View>`);
            var itemCollToBeUpdated  = thisList.getItems(q);
            updateContext.load(itemCollToBeUpdated, "Include(Ref_id, DayVal, Comments, ProjectName, StartDate,EndDate,Status)");
            updateContext.executeQueryAsync(goThrough, rollBack);

        } catch (ex) {
            alert("Retrieve Error: " + ex.message);
        }

        function goThrough() {
            lstItemToBeUpdated = itemCollToBeUpdated.getEnumerator();
            maulingTheUpdate(realID);
        } // goThrough()

        function maulingTheUpdate(realID) {
            //alert("Inside maulingUpdate func Task ID: "+realID);
            while (lstItemToBeUpdated.moveNext()) {
                var listItem = lstItemToBeUpdated.get_current();

                var startDate = listItem.get_item("StartDate");
                var endDate = listItem.get_item("EndDate");
                //var status = listItem.get_item("Status");
                var status = "Approved";

                //console.warn(ref_id, project, status, endDate, startDate);

                var commented = $('#approveComments').val();

                if (commented == '') {
                    console.error("Comments can't be blank buddy!!!");
                    location.reload(true);
                } else {
                    listItem.set_item("Comments", commented);
                    listItem.update();

                    listItem.set_item("Status", "Approved");
                    listItem.update();

                    listItem.set_item("Approver", curUser);
                    listItem.update();

                    listItem.set_item("ReviewDate", revDate);
                    listItem.update();
                    // Try adding to Task List
                    //newAddedItem.set_item("Ref_id", ref_id);
                    //newAddedItem.set_item("Title", project);
                    //newAddedItem.set_item("StartDate", startDate);
                    //newAddedItem.set_item("DueDate", endDate);
                    //newAddedItem.set_item("Status0", status);

                    //newAddedItem.update();

                }
            } // while Loop

            updateContext.executeQueryAsync(accomplished(status, realID), failed);
        } // maulingTheUpdate()

    } // approverUpdate()

    function accomplished(status, realID) {
        //alert("Inside accomplished Task ID = " + realID);
        console.log("We are done the approval");
        updateTaskList(status, realID);
        //location.reload(true);
    }

    function failed(sender, args) {
        console.warn("Error: "+args.get_message());
    }

    
    function rollBack(sender, args) {
        console.warn("Error: " + args.get_message());
    }

    // Decline function
    function Decline(realID) {
        //alert("Inside Decline func and Task ID is: " + realID);
        var updateContext = SP.ClientContext.get_current();
        var myDweb = updateContext.get_web();

        // get the user from session
        var currenstUser = myDweb.get_currentUser();
        var reviewDate = new Date();

        var itemColl = "";
        var lstItem = "";
        var tasks = null;

        try {
            var thisList = myDweb.get_lists().getByTitle("IPPFTimesheet");

            // Task List Code
            //var TaskList = updateContext.get_web().get_lists().getByTitle("TimeSheetTaskList");
            //var taskLIST = new SP.ListItemCreationInformation();
            //var newAddedItem = TaskList.addItem(taskLIST);

            var q = new SP.CamlQuery();
            q.set_viewXml(`<View><Query>
                               <Where>
                                  <Geq>
                                     <FieldRef Name='DayVal' />
                                     <Value Type='Number'>1</Value>
                                  </Geq>
                               </Where>
                            </Query></View>`);
            var itemColl = thisList.getItems(q);
            updateContext.load(itemColl, "Include(Ref_id, DayVal, Comments,ProjectName, StartDate,EndDate,Status)");
            updateContext.executeQueryAsync(weAreGood, revert);

        } catch (ex) {
            alert("Retrieve Error: " + ex.message);
        }

        
        


        function weAreGood() {
            console.log("Username: " + currenstUser);

            lstItem = itemColl.getEnumerator();
            declining(realID);
        } // goThrough()
        function revert(sender, args) {
            console.warn("Error: " + args.get_message());
        }

        function declining(realID) {
            //alert("Inside declining() with Task ID: " + realID);
            while (lstItem.moveNext()) {
                var listItem = lstItem.get_current();

                //alert("Review Date: " + reviewDate);
                // Retrieve all the required items for the Task List
                var ref_id = listItem.get_item("Ref_id");
                var project = listItem.get_item("ProjectName");
                var startDate = listItem.get_item("StartDate");
                var endDate = listItem.get_item("EndDate");
                //var status = listItem.get_item("Status");
                var status = "Declined";


                var commented = $('#approveComments').val();

                if (commented == '') {
                    console.error("Comments can't be blank buddy!!!");
                    location.reload(true);
                } else {
                    listItem.set_item("Comments", commented);
                    listItem.update();

                    listItem.set_item("Status", "Declined");
                    listItem.update();

                    listItem.set_item("Approver", currenstUser);
                    listItem.update();
                    
                    listItem.set_item("ReviewDate", reviewDate);
                    listItem.update();
                }
            } // while Loop

            updateContext.executeQueryAsync(gogo(status, realID), curled);
        }
    } // Decline()

    function gogo(ref_id, status, realID) {
        //alert("call updateTasklist Func"+status);
        updateTaskList(status, realID);
        console.log("Timesheet declined successfully");
        //location.reload(true);
    }
    function curled(sender, args) { console.error("Error: " + args.get_message()); }

    // TASKLIST
    function updateTaskList(status, realID) {
        //alert("Inside updateTaskList Func and Task ID = " + realID);
        var updateContext = SP.ClientContext.get_current();
        var myDweb = updateContext.get_web();

        var TaskList = myDweb.get_lists().getByTitle("TimeSheetTaskList");

        var taskLIST = new SP.ListItemCreationInformation();
        var newAddedItem = TaskList.addItem(taskLIST);

        var tasks = null;
        var lstItem = "";
        var qitems = "";


        // Task List Caml Query
        var query = new SP.CamlQuery();
        //query.set_viewXml(`<View><Query><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>` + realID + `</Value></Eq></Where></Query></View>`);

        query.set_viewXml("<View />");
        qitems = TaskList.getItems(query);
        tasks = updateContext.load(qitems);
        updateContext.executeQueryAsync(doneHere, fail1);

        function doneHere() {
            lstItem = qitems.getEnumerator();
            success1(realID);
        }

        function success1(realID) {
            //alert("Insert success1 with Task ID: " + realID);
                while (lstItem.moveNext()) {
                    var listItem = lstItem.get_current();

                    //var taskListRef_id = listItem.get_item("Ref_id");
                    var taskIDentity = listItem.get_item("ID");

                    //alert("Original task ID: " + realID + " Task List taskIDentity: " + taskIDentity);

                    if (realID == taskIDentity) {
                        //alert("Original task ID: " + realID + " Task List taskIDentity: " + taskListRef_id);
                        listItem.set_item("Status0", status);
                        listItem.set_item("Status", "Completed");
                        listItem.update();
                    } else {
                        // THIS SHOULD NEVER HAPPEN
                        //alert("Trying to create new Record with new Ref_id");
                        newAddedItem.set_item("Status0", status);
                        newAddedItem.set_item("Status", "Completed");
                        newAddedItem.update();
                    }
                } // while Loop

            
            updateContext.executeQueryAsync(success2, fail2);
        } // success1()
        function success2() {
            //alert("inside success2");
                window.location.href = 'http://svrarspdev01/sites/appcenter/_layouts/15/start.aspx#/SitePages/DevHome.aspx';
                //location.reload(true);
        }
        function fail2(sender, args) { alert("Error: " + args.get_message()); }
        function fail1(sender, args) { alert("Error: " + args.get_message()); }
    } // updateTaskList()
});


