
jQuery(document).ready(function ($) {
    var monday = moment().startOf("isoweek").toDate();
    var sundayy = moment().endOf("isoweek").toDate();
    getMeThisSunday(sundayy);   properDate(monday);

    $('.employeeLoginNames').attr('readonly', 'readonly');

    var tap = 1;
    $('#stampRow').on("click", function (event) {
        event.preventDefault();

        tap++;
        // Duplicate a row and empty it
        $('#myrow_id_1').clone().appendTo('#myTable')
            .attr("id", "myrow_id_" + tap.toString()).find("input:text, textarea").each(function (){
                $(this).val("");
            });

    }); // #stampRow

    $('#saveRowData').on("click", function (event) {
        event.preventDefault();
        saveRecords(listREFIds);
    }); // #saveRowData First Func

    
    // ALL THE ELEMENTS NEEDED FOR A TASK LIST
    var startdate = $('.timeshitStartDate').val();
    var enddate = $('.timeshitEndDate').val();

    
    var startWk = moment().startOf("isoweek").toDate();
    var endWk = moment().endOf("isoweek").toDate();

    var begin = new Date(1970, 0, 1);
    var btwn = (startWk.getTime() - begin.getTime());

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    var taskNAME = "TASK_" + getRandomInt(startWk.getTime(), begin.getTime());
    
    var curDisName = $('.employeeLoginNames').val();
    var ref_id = curDisName.replace(/\s/g, '') + "_" + parseFloat(btwn);
    var status = "Pending";

    
    // Begin save Functions
    function saveRecords(mycallback) {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();

        
        //grab the curent logged in user
        var curser = web.get_currentUser();
        
        try {
            var list = web.get_lists().getByTitle("IPPFTimesheet");
            var itemInfoObj = new SP.ListItemCreationInformation();

            var worktype, project, activity, action, day, hoursworked, challanges, employee;


            // Loop through each tr's and get it's input fields' value
            $('.killerTBody tr').each(function (index, item) {
                worktype = $($(this).find('.WorkType')).val();
                //project = $($(this).find('.projectName')).val();
                project = $(this).find('.projectName option:selected').text();
                activity = $($(this).find('.Activity')).val();
                challanges = $($(this).find('.Challenges')).val();
                action = $($(this).find('.Action')).val();
                dayVal = $(this).find('.day').val();
                dayText = $(this).find('.day option:selected').text();
                workedhours = $($(this).find('.WorkedHours')).val();

                //alert("Current DAY it's :"+dayText);

                var newAddedItem = list.addItem(itemInfoObj);

                // Try to Add hours and Days into List on Submit
                switch (dayText) {
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


                newAddedItem.set_item("Ref_id", ref_id);
                newAddedItem.set_item("Status", "Pending");

                newAddedItem.set_item("WorkType", worktype);
                newAddedItem.set_item("ProjectName", project);
                newAddedItem.set_item("Activity", activity);
                newAddedItem.set_item("Challenges", challanges);
                newAddedItem.set_item("Task", action);
                newAddedItem.set_item("WorkedHours", workedhours);

                
                newAddedItem.set_item("TaskName", taskNAME);

                newAddedItem.set_item("DayVal", dayVal);
                //newAddedItem.set_item("Day", dayText);
                newAddedItem.set_item("StartDate", startdate);
                newAddedItem.set_item("Employee", $('.employeeLoginNames').val());
                newAddedItem.set_item("EndDate", enddate);

                // Invoke listRefIds List
                newAddedItem.update();
                context.load(curser);
                context.executeQueryAsync(onQuerySuccess, onQueryFailure);
            });
            
            
        } catch (Ex) {
            alert(Ex.message);
        }

        mycallback(ref_id);
    }// End saveRecords() */

    function onQuerySuccess() {
        console.log('Setting changed');
        window.location.href = 'http://svrarspdev01/sites/apps/SitePages/Home.aspx';
    }

    function onQueryFailure(sender, args) {
        alert('Request Failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }

    

    // The update function
    //retrieveDays();

    



    function properDate(myDates) {
        var adate = new Date(myDates);
        var dd = adate.getDate();
        var mm = adate.getMonth() + 1; //January is 0!
        var yyyy = adate.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        } adate = mm + '/' + dd + '/' + yyyy;

        $('.timeshitStartDate').val(adate).attr('readonly', 'readonly');
        console.log(adate)
    }
    function getMeThisSunday(myDates) {
        var adate = new Date(myDates);
        var dd = adate.getDate();
        var mm = adate.getMonth() + 1; //January is 0!
        var yyyy = adate.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        } adate = mm + '/' + dd + '/' + yyyy;

        $('.timeshitEndDate').val(adate).attr('readonly', 'readonly');
        console.log(adate)
    }


    // listREFIds List Function
    function listREFIds(ref_id) {
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

            //var approver = "w52r";
            //var employee = "c2uy";

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
                    var tskstatus = myObj.get_item("Status");

                    //alert("Task Ref_id: " + taskRefID + " TimeSheet Ref_id: " + ref_id);
                    //alert("TaskStatus: "+tskstatus+" StartDate: " + startdate + " status: " + status + " TaskName: " + taskNAME + " EndDate: " + enddate);

                } //while Loop

                if (ref_id == taskRefID && tskstatus != "Completed") {
                    //alert("Incomming Task Ref_id duplicate detected, we are updating Task");
                    //myObj.set_item("Ref_id", ref_id);
                    //myObj.set_item("Status0", status);
                    //myObj.set_item("Status", "Completed");

                    //myObj.refreshLoad(); // Resolve conflict
                    //myObj.update();
                } else if (ref_id == taskRefID && tskstatus == "Completed") {
                    //alert("Creating another task");
                    var addingItem = lstRefID.addItem(Obj);

                    addingItem.set_item("Ref_id", ref_id);
                    addingItem.set_item("StartDate", startdate);
                    addingItem.set_item("DueDate", enddate);
                    addingItem.set_item("Status0", status);
                    addingItem.set_item("c2uy", anEmp);
                    addingItem.set_item("Title", taskNAME);
                    addingItem.update();
                    currCtx.load(addingItem);
                    currCtx.executeQueryAsync(insertListRef, refrain);
                } else {
                    //alert("Creating first task");
                    var kingItem = lstRefID.addItem(Obj);

                    kingItem.set_item("Ref_id", ref_id);
                    kingItem.set_item("StartDate", startdate);
                    kingItem.set_item("DueDate", enddate);
                    kingItem.set_item("Status0", status);
                    kingItem.set_item("c2uy", anEmp);
                    kingItem.set_item("Title", taskNAME);
                    kingItem.update();
                    currCtx.load(kingItem);
                    currCtx.executeQueryAsync(insertListRef, refrain);
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
        window.location.href = 'http://svrarspdev01/sites/apps/SitePages/Home.aspx';
    }
    function refrain(sender, args) { alert("Error: " + args.get_message()); }

    // Limit to 2 and only numbers

});
