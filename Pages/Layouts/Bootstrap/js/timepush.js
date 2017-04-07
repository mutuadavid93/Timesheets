
jQuery(document).ready(function ($) {

    // Query a Task List
    function QueryTask() {
        var updateContext = SP.ClientContext.get_current();
        var myDweb = updateContext.get_web();

        var itemColl = "";
        var lstItem = "";

        try{
            var thisList = myDweb.get_lists().getByTitle("TimeSheetTaskList");

            var q = new SP.CamlQuery();
            q.set_viewXml("<View />");
            var itemColl = thisList.getItems(q);

            updateContext.load(itemColl);
            updateContext.executeQueryAsync(happy, saddened);
        } catch (Ex) {
            console.error(Ex.message);
        }

        function saddened(sender, args) { alert(args.get_message()); }

        function happy() {
            lstItem = itemColl.getEnumerator();
            browseThem();
        }// happy()

        function browseThem() {
            while (lstItem.moveNext()) {
                var listItem = lstItem.get_current();

                var taskRefID = listItem.get_item("Ref_id");
                var taskName = listItem.get_item("Title");
                var taskStats = listItem.get_item("Status0");

                console.log(taskRefID + " " + taskName+" "+taskStats);
            } // while
            updateContext.executeQueryAsync(boyboy, gyalgyal);
        }//browseThem()
    } // QueryTask

    function boyboy() {  }
    function gyalgyal(sender, args) { alert(args.get_message()); }

    QueryTask();



    // Default Monday and Sunday Dates of the week
    var sundayy = Date.monday().add(6).days();
    var monday = Date.parse("monday");
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
        saveRecords();

        listREFIds();
    }); // #saveRowData First Func

    
    // ALL THE ELEMENTS NEEDED FOR A TASK LIST
    var startdate = $('.timeshitStartDate').val();
    var enddate = $('.timeshitEndDate').val();


    // Generate Ref id
    var onMonday = Date.parse("monday");
    var onSunday = Date.monday().add(6).days();

    var begin = new Date(1970, 0, 1);
    var btwn = (onMonday.getTime() - begin.getTime());

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    var taskNAME = "TASK_" + getRandomInt(onMonday.getTime(), begin.getTime());
    
    var curDisName = $('.employeeLoginNames').val();
    var ref_id = curDisName.replace(/\s/g, '') + "_" + parseFloat(btwn);
    var status = "Pending";



    // listREFIds List Function
    function listREFIds() {
        var currCtx = SP.ClientContext.get_current();
        var myWeb = currCtx.get_web();

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
            myQuery.set_viewXml("<View><RowLimit>1</RowLimit></View>");
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
                    var tskstatus = myObj.get_item("Status0");

                    alert("Task Ref_id: " + taskRefID + " TimeSheet Ref_id: " + ref_id);
                    alert("StartDate: "+startdate+" status: "+status+" TaskName: "+taskNAME+" EndDate: "+enddate);

                    if (ref_id == taskRefID && tskstatus != "Completed") {
                        //alert("Incomming Task Ref_id duplicate detected, we are updating Task");
                        //myObj.set_item("Ref_id", ref_id);
                        //myObj.set_item("Status0", status);
                        //myObj.set_item("Status", "Completed");

                        //myObj.refreshLoad(); // Resolve conflict
                        //myObj.update();
                    } else if (ref_id == taskRefID && tskstatus == "Completed") {
                        alert("Creating another task");
                        var addingItem = lstRefID.addItem(Obj);

                        addingItem.set_item("Ref_id", ref_id);
                        addingItem.set_item("StartDate", startdate);
                        addingItem.set_item("DueDate", enddate);
                        addingItem.set_item("Status0", status);
                        addingItem.set_item("Title", taskNAME);
                        addingItem.update();
                    } else {
                        alert("Creating first task");
                        var addingItem = lstRefID.addItem(Obj);

                        addingItem.set_item("Ref_id", ref_id);
                        addingItem.set_item("StartDate", startdate);
                        addingItem.set_item("DueDate", enddate);
                        addingItem.set_item("Status0", status);
                        addingItem.set_item("Title", taskNAME);
                        addingItem.update();
                    }
                } //while Loop
            }
            function killLst(sender, args) { alert("Error: " + args.get_message()); }

            //addingItem.update();

            currCtx.executeQueryAsync(insertListRef, refrain);
        } catch (ex) {
            alert(ex.message);
        }
    } //listRefIds
    function insertListRef() {
        console.info("Everything working");
    }
    function refrain(sender, args) { alert("Error: " + args.get_message()); }





    // Begin save Functions
    function saveRecords() {
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

                alert("Current DAY it's :"+dayText);

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
                

                newAddedItem.set_item("DayVal", dayVal);
                //newAddedItem.set_item("Day", dayText);
                newAddedItem.set_item("StartDate", startdate);
                newAddedItem.set_item("Employee", $('.employeeLoginNames').val());
                newAddedItem.set_item("EndDate", enddate);

                // Invoke listRefIds List
                newAddedItem.update();
                context.executeQueryAsync(onQuerySuccess, onQueryFailure);
            });
            
            
        } catch (Ex) {
            alert(Ex.message);
        }
    }// End saveRecords() */

    function onQuerySuccess() {
        console.log('Setting changed');
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
});
