
jQuery(document).ready(function ($) {
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
    }); // #saveRowData First Func

    

    // Begin save Functions
    function saveRecords() {
        var context = SP.ClientContext.get_current();
        var web = context.get_web();

        //grab the curent logged in user
        var curser = web.get_currentUser();

        var startdate = $('.timeshitStartDate').val();
        var enddate = $('.timeshitEndDate').val();

        try {
            var list = web.get_lists().getByTitle("IPPFTimesheet");
            var itemInfoObj = new SP.ListItemCreationInformation();

            var worktype, project, activity, action, day, hoursworked, challanges, employee;


            // Loop through each tr's and get it's input fields' value
            $('.killerTBody tr').each(function (index, item) {
                // Generate Ref id
                var onMonday = Date.parse("monday");
                var onSunday = Date.monday().add(6).days();

                var begin = new Date(1970, 0, 1);
                var btwn = (onMonday.getTime() - begin.getTime());
                console.log("Ref_" + btwn);

                // Generate a Ref_id per user
                var curDisName = $('.employeeLoginNames').val();
                var realRef = curDisName.replace(/\s/g, '') + "_" + parseFloat(btwn);
                //alert("Ref_id per user: " + realRef);

                // Generate a Task Name Randomly
                function getRandomInt(min, max) {
                    min = Math.ceil(min);
                    max = Math.floor(max);
                    return Math.floor(Math.random() * (max - min)) + min;
                }

                console.log("TASK_" + getRandomInt(onMonday.getTime(), begin.getTime()));

                var taskNAME = "TASK_" + getRandomInt(onMonday.getTime(), begin.getTime());
                var ref_id = curDisName.replace(/\s/g, '') + "_" + parseFloat(btwn);
                var status = "Pending";
                //var employee = $('.employeeLoginNames').val();

                worktype = $($(this).find('.WorkType')).val();
                //project = $($(this).find('.projectName')).val();
                project = $(this).find('.projectName option:selected').text();
                activity = $($(this).find('.Activity')).val();
                challanges = $($(this).find('.Challenges')).val();
                action = $($(this).find('.Action')).val();
                dayVal = $(this).find('.day').val();
                //dayText = $(this).find('.day option:selected').text();
                workedhours = $($(this).find('.WorkedHours')).val();


                var newAddedItem = list.addItem(itemInfoObj);

                newAddedItem.set_item("Ref_id", realRef);
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
                context.executeQueryAsync(onQuerySuccess(ref_id, status, startdate, enddate, curser, taskNAME), onQueryFailure);
                //context.executeQueryAsync(Function.createDelegate(
                //    this, this.onQuerySuccess), Function.createDelegate(this, this.onQueryFailure));
            });
            
            
        } catch (Ex) {
            alert(Ex.message);
        }
    }// End saveRecords() */

    function onQuerySuccess(ref_id, status, startdate, enddate, curser, taskNAME) {
        console.log('Setting changed');
        listRefIds(ref_id, status, startdate, enddate, curser, taskNAME);
    }

    function onQueryFailure(sender, args) {
        alert('Request Failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }

    // listREFIds List Function
    function listRefIds(ref_id, status, startdate, enddate, curser, taskNAME) {
        var ctx = SP.ClientContext.get_current();
        var myWeb = ctx.get_web();

        try {
            // Insertion of RefIds
            //alert("Ref_id: " + ref_id + " Employee: " + curser);
            var lstRefID = myWeb.get_lists().getByTitle("TimeSheetTaskList");
            var Obj = new SP.ListItemCreationInformation();

            var itemCollection = "";
            var itemToUpdate = "";

            

            var myQuery = new SP.CamlQuery();
            //myQuery.set_viewXml(`<View><Query><Where><Eq><FieldRef Name='Ref_id' /><Value Type='Text'>SYSTEMACCOUNT_1491177600000</Value></Eq></Where></Query></View>`);
            myQuery.set_viewXml("<View />");
            itemCollection = lstRefID.getItems(myQuery);
            ctx.load(itemCollection);
            ctx.executeQueryAsync(callList, killLst);

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

                    console.log("Task Ref_id: " + taskRefID + " TimeSheet Ref_id: " + ref_id, status);

                    if (ref_id == taskRefID) {
                        //alert("Incomming Task Ref_id duplicate detected, we are updating Task");
                        //myObj.set_item("Ref_id", ref_id);
                        //myObj.set_item("Status0", status);
                        //myObj.set_item("Status", "Completed");

                        //myObj.refreshLoad(); // Resolve conflict
                        //myObj.update();
                    } else {
                        var addingItem = lstRefID.addItem(Obj);

                        addingItem.set_item("Ref_id", ref_id);
                        addingItem.set_item("StartDate", startdate);
                        addingItem.set_item("DueDate", enddate);
                        addingItem.set_item("Status0", status);
                        addingItem.set_item("c2uy", curser);
                        addingItem.set_item("Title", taskNAME);
                        addingItem.update();
                    }
                } //while Loop
            }
            function killLst(sender, args) { alert("Error: " + args.get_message()); }

            
            ctx.executeQueryAsync(insertListRef(retrieveDays), refrain);
        } catch (ex) {
            alert(ex.message);
        }
    } //listRefIds
    function insertListRef(callback) { /*alert("We hit the insertListRef func");*/
        
        callback(); /*location.reload(true)*/
    }
    function refrain(sender, args) { alert("Error: " + args.get_message()); }

    // The update function
    //retrieveDays();

    function retrieveDays() {
        console.log("RetrievDays function called after 5 Seconds");
        var context = SP.ClientContext.get_current();
        var myweb = context.get_web();

        var collListItemToBeUpdated = "";
        var listItemToBeUpdated = "";

        try {
            var myList = myweb.get_lists().getByTitle("IPPFTimesheet");
            var q = new SP.CamlQuery();
            q.set_viewXml(`<View><Query>
                               <Where>
                                  <Geq>
                                     <FieldRef Name='DayVal' />
                                     <Value Type='Number'>1</Value>
                                  </Geq>
                               </Where>
                            </Query></View>`);
            var collListItemToBeUpdated = myList.getItems(q);
            context.load(collListItemToBeUpdated, "Include(DayVal, WorkedHours)"); // Make sure to use load() not loadQuery()
            context.executeQueryAsync(qualify, disqualify);

        } catch (ex) {
            alert("Retrieve Error: " + ex.message);
        }

        function qualify() {
            //alert("Inside qualify");
            listItemToBeUpdated = collListItemToBeUpdated.getEnumerator();
            updateMultipleItems();
        }

        function updateMultipleItems() {
            var clientContext = SP.ClientContext.get_current();
            var oList = clientContext.get_web().get_lists().getByTitle('IPPFTimesheet');



            while (listItemToBeUpdated.moveNext()) {
                var oListItem = listItemToBeUpdated.get_current();

                var DayVal = oListItem.get_item("DayVal");
                var workedhours = oListItem.get_item("WorkedHours");

                console.log("Day value: "+DayVal + " Worked Hours: " + workedhours);

                // Dealing with the Days !!!
                switch (DayVal) {
                    case 1:
                        oListItem.set_item("MON", workedhours);
                        oListItem.update();
                        break;

                    case 2:
                        oListItem.set_item("TUE", workedhours);
                        oListItem.update();
                        break;

                    case 3:
                        oListItem.set_item("WED", workedhours);
                        oListItem.update();
                        break;

                    case 4:
                        oListItem.set_item("THUR", workedhours);
                        oListItem.update();
                        break;

                    case 5:
                        oListItem.set_item("FRI", workedhours);
                        oListItem.update();
                        break;

                    case 6:
                        oListItem.set_item("SAT", workedhours);
                        oListItem.update();
                        break;

                    case 7:
                        oListItem.set_item("SUN", workedhours);
                        oListItem.update();
                        break;

                    default:
                        console.log("Nothing was inserted buddy");
                } // switch
            }// while Loop

            context.executeQueryAsync(finalCheck, redCard);
        } // updateMultipleItems()

        function disqualify(sender, args) {
            console.warn("Error: " + args.get_message());
        }
    }

    function finalCheck() {
        // stop the time Loop
        //alert("Days Updated1!!");
        window.location.href = 'http://svrarspdev01/sites/appcenter/_layouts/15/start.aspx#/SitePages/DevHome.aspx';
        //location.reload(true);
    }
    function redCard(sender, args) {
        alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }



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
