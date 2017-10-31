jQuery(document).ready(function ($) {
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
    console.log("View ID is: "+realID);

    var appraiseeView = function (urlid) {
        //alert("wE are inside appraiseeView"+urlid);
        var curCtx = SP.ClientContext.get_current();
        var web = curCtx.get_web();
        var lst = web.get_lists().getByTitle("AppraiseeTaskList");

        var myQuery = new SP.CamlQuery();
        myQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>" + urlid + "</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>");
        var itemCollection = lst.getItems(myQuery);
        var items = curCtx.loadQuery(itemCollection, "Include(Title, Appraisee_x0020_Username, Appraisee_x0020__x0020_Name)");

        curCtx.executeQueryAsync(itemsreturned, itemsnotreturned);

        function itemsreturned() {
            //alert(items.length);
            if (items.length > 0) {
                var item = items[0];
                var taskname = item.get_item("Title");
                var taskREF_ID = item.get_item("Appraisee_x0020_Username");
                var appraisename = item.get_item("Appraisee_x0020__x0020_Name").get_lookupValue();
               
                // invoke other functions to use REF_ID parameter
                retrieveObjectives(taskREF_ID, appraisename);
                retrieveNextReviewPlans(taskREF_ID);
                retrieveLearnDev(taskREF_ID);
                retrieveComments(taskREF_ID);
                retrievePerforamaceReview(taskREF_ID);
            }
        }

        function itemsnotreturned(sender, args) { console.log("Error on appraiseeView() "+args.get_message()); }
        
    }(realID);
    // ## Start Retrieve for APB Objectives List

    function retrieveObjectives(taskREF_ID, appraisename) {
       
        var updateContext = SP.ClientContext.get_current();
        var myDweb = updateContext.get_web();

        var itemColl = "";
        var lstItem = "";
        var tasks = null;

        try {
            var thisList = myDweb.get_lists().getByTitle("MyObjectives");

            var q = new SP.CamlQuery();
            q.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Computed'>" + taskREF_ID + "</Value></Eq></Where></Query></View>");
            var itemColl = thisList.getItems(q);
            updateContext.load(itemColl);
            updateContext.executeQueryAsync(weAreGood, revert);

        } catch (ex) {
            alert("Retrieve Error: " + ex.message);
        }

        function weAreGood() {
            lstItem = itemColl.getEnumerator();
            declining();
        } // goThrough()
        function revert(sender, args) {
            console.warn("Error: " + args.get_message());
        }

        function declining() {
            while (lstItem.moveNext()) {
                var listItem = lstItem.get_current();

                var myid = listItem.get_id();
                var weigh = listItem.get_item("Weighting");
                var evidence = listItem.get_item("AchievementEvidence");
                var factors = listItem.get_item("HinderingFactors");
                var objective = listItem.get_item("APBObjective");
                var myRate = listItem.get_item("SelfRating");
                var mgrRate = listItem.get_item("ManagerRating");
                var agreedRate = listItem.get_item("AgreedRating");
              
                var $trtd = "<tr>"+
                               "<td  class='myobjective' >" + objective + "</td>" +
                                "<td class='myweigh' >" + weigh + "</td>" +
                                   "<td class='myevidence' >" + evidence + "</td>" +
                                      "<td class='myfactors' >" + factors + "</td>" +
                                         "<td class='myrate' >" + myRate + "</td>" +
                                            "<td class='myrange' >" + mgrRate + "</td>" +
                                               "<td class='agreedrate' >" + agreedRate + "</td>" +
                                                  "<td  class='myid'>" + myid + "</td>" +
                                //update & delete function
                                   "<td>  <button id='updatePerfomanceObje' type='button' runat='server' class='btn btn-xs btn-info updatePerfomanceObje' style='min-width: 2em;'  data-toggle='modal' data-target='#mymodal'><span class='glyphicon glyphicon-pencil'></span></button></td>" +
                                   "<td> <button role='button' class='btn btn-xs btn-danger pull-right' style='min-width: 2em;' id='deletePerfomanceObj' onclick='return false'> &nbsp;<span class='glyphicon glyphicon-trash'></span>&nbsp;</button></td>" +

                               

                          "</tr>";

                var tbody = $('tbody#this_section').append($trtd);
            } // while Loop

            updateContext.executeQueryAsync(gogo, curled);
        }

    }//retrieveObjectives()

   

    function gogo() {
        console.log("Timesheet fecthed successfully");
    }
    function curled(sender, args) { console.error("Error: " + args.get_message()); }

    // ## End Retrieve for APB Objectives List

    //Start Retrieve Plans for Next Review
    function retrieveNextReviewPlans(taskREF_ID) {     
        var currentContext = SP.ClientContext.get_current();
        var web = currentContext.get_web();

       var itemCol = "";
        var listItem = "";
        try {
            var getList = web.get_lists().getByTitle("NextReviewPlans");
            var query = new SP.CamlQuery();
            query.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Computed'>" + taskREF_ID + "</Value></Eq></Where></Query></View>");
            var itemCol = getList.getItems(query);
            currentContext.load(itemCol);
            currentContext.executeQueryAsync(onSuccess, onFail);

        } catch (ex) {
            alert("Retrieve Error: " + ex.message);
        }

        function onSuccess() {
            listItem = itemCol.getEnumerator();
            while (listItem.moveNext()) {
                var getItem = listItem.get_current();

                var nextplanobject = getItem.get_item("Objective");
                var Weighting = getItem.get_item("Weighting");
                var Measures = getItem.get_item("Measures");
                var Timeline = getItem.get_item("Timeline");
                var NeededSupport = getItem.get_item("NeededSupport");          

                var $tabledata = "<tr>" +
                               "<td><input type='text' class='form-control performObj' value='" + nextplanobject + "' runat='server' /></td>" +
                               "<td><input type='text' class='form-control performObj' value='" + Weighting + "' runat='server' /></td>" +
                               "<td><input type='text' class='form-control performObj' value='" + Measures + "' runat='server' /></td>" +
                                "<td><input type='text' class='form-control performObj' value='" + Timeline + "' runat='server' /></td>" +
                                "<td><input type='text' class='form-control performObj' value='" + NeededSupport + "' runat='server' /></td>" +    
                           "</tr>";

                var tbody = $('tbody#section3_3').append($tabledata);
            } // End While Loop

            currentContext.executeQueryAsync(succesdisplay, faileddisplay);
        
        } // goThrough()
        function onFail(sender, args) {
            console.warn("Error: " + args.get_message());
        }
    }
    function succesdisplay() {
        console.log("NextPlans fecthed successfully");
    }
    function faileddisplay(sender, args) {
        console.error("Error: " + args.get_message());
    }

    //#End Retrieve Plans for Next Review;

    //start the Retrieave LearnDev section 4
    function retrieveLearnDev(taskREF_ID) {
        var currentContext = SP.ClientContext.get_current();
        var web = currentContext.get_web();

        var itemCol = "";
        var listItem = "";
        try {
            var getList = web.get_lists().getByTitle("LearnDev");
            var query = new SP.CamlQuery();
            query.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Computed'>" + taskREF_ID + "</Value></Eq></Where></Query></View>");
            var itemCol = getList.getItems(query);
            currentContext.load(itemCol);
            currentContext.executeQueryAsync(onSuccess, onFail);

        } catch (ex) {
            alert("Retrieve Error: " + ex.message);
        }

        function onSuccess() {
            listItem = itemCol.getEnumerator();
            while (listItem.moveNext()) {
                var getItem = listItem.get_current();

                var Requirement = getItem.get_item("Requirement");
                var LinkedObjective = getItem.get_item("LinkedObjective");
                var Priority = getItem.get_item("Priority");
                var References = getItem.get_item("References");
               

                var $tabledata = "<tr>" +
                                   "<td><input type='text' class='form-control performObj' value='" + Requirement + "' runat='server' /></td>" +
                                   "<td><input type='text' class='form-control performObj' value='" + LinkedObjective + "' runat='server' /></td>" +
                                   "<td><input type='text' class='form-control performObj' value='" + Priority + "' runat='server' /></td>" +
                                   "<td><input type='text' class='form-control performObj' value='" + References + "' runat='server' /></td>" +
                                "</tr>";

                var tbody = $('tbody#section4_row_1').append($tabledata);
            } // End While Loop

            currentContext.executeQueryAsync(succesdisplay, faileddisplay);

        } // goThrough()
        function onFail(sender, args) {
            console.warn("Error: " + args.get_message());
        }
    }
    function succesdisplay() {
        console.log("LearnDev fecthed successfully");
    }
    function faileddisplay(sender, args) {
        console.error("Error: " + args.get_message());
    }
    //#End Retrieve Plans for Next Review;

    //start the Retrieave Comments section5
    function retrieveComments(taskREF_ID) {
        var currentContext = SP.ClientContext.get_current();
        var web = currentContext.get_web();

        var itemCol = "";
        var listItem = "";
        try {
            var getList = web.get_lists().getByTitle("Comments");
            var query = new SP.CamlQuery();
            query.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Computed'>" + taskREF_ID + "</Value></Eq></Where></Query></View>");
            var itemCol = getList.getItems(query);
            currentContext.load(itemCol);
            currentContext.executeQueryAsync(onSuccess, onFail);

        } catch (ex) {
            alert("Retrieve Error: " + ex.message);
        }

        function onSuccess() {
            listItem = itemCol.getEnumerator();
            while (listItem.moveNext()) {
                var getItem = listItem.get_current();

                var SupercisorComments = getItem.get_item("SupercisorComments");
                var AppraiseeComments = getItem.get_item("AppraiseeComments");
                var AppraiseeDate = getItem.get_item("AppraiseeDate");
                var SupervisorDate = getItem.get_item("SupervisorDate");
                var Appraisee = getItem.get_item("Appraisee").get_lookupValue();
                var Supervisor = getItem.get_item("Supervisor").get_lookupValue();
                var reviewdate = getItem.get_item("DateOfReview");

                var AppraiseeSignature = getItem.get_item("AppraiseeSignature");
                var appraiseeSignatureDate = getItem.get_item("appraiseeSignatureDate");
                var immediateSupervisorSignature = getItem.get_item("immediateSupervisorSignature");
                var supervisorsignaturedate = getItem.get_item("supervisorsignaturedate");

                //format the Date
                var appDate = (AppraiseeDate.getDate() + '/' + (AppraiseeDate.getMonth() + 1) + '/' + AppraiseeDate.getFullYear());
                var superDate = (SupervisorDate.getDate() + '/' + (SupervisorDate.getMonth() + 1) + '/' + SupervisorDate.getFullYear());
                var proposeddate = (reviewdate.getDate() + '/' + (reviewdate.getMonth() + 1) + '/' + reviewdate.getFullYear());
               //append data to the respective fields
                $('#super').val(SupercisorComments);
                $('#appraise').val(AppraiseeComments);
                $('#appraiseDates').val(appDate);
                $('#superDates').val(superDate);
                $('#appraisee').val(Appraisee);
                $('#superName').val(Supervisor);
                $('#reviewdate').val(proposeddate);

                $('#userAppraisee').val(AppraiseeSignature);
                $('#appraiseDate').val(appraiseeSignatureDate);
                $('#immediateManager').val(immediateSupervisorSignature);
                $('#superDate').val(supervisorsignaturedate);
                
            } // End While Loop

            currentContext.executeQueryAsync(succesdisplay, faileddisplay);

        } // goThrough()
        function onFail(sender, args) {
            console.warn("Error: " + args.get_message());
        }
    }
    function succesdisplay() {
        console.log("Comments fecthed successfully");
    }
    function faileddisplay(sender, args) {
        console.error("Error: " + args.get_message());
    }
    //#End Retrieve Plans for Next Review;

    //retrieve the items from the perfomance review to the appraisee

    function retrievePerforamaceReview(taskREF_ID) {
        var currentContext = SP.ClientContext.get_current();
        var web = currentContext.get_web();

        var itemCol = "";
        var listItem = "";
        try {
            var getList = web.get_lists().getByTitle("PerforamaceReview");
            var query = new SP.CamlQuery();
            query.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Computed'>" + taskREF_ID + "</Value></Eq></Where></Query></View>");
            var itemCol = getList.getItems(query);
            currentContext.load(itemCol);
            currentContext.executeQueryAsync(onSuccessful, onFailing);

        } catch (ex) {
            alert("Retrieve Error: " + ex.message);
        }

        function onSuccessful(sender, args) {
            listItem = itemCol.getEnumerator();
            while (listItem.moveNext()) {
                var getItem = listItem.get_current();

                var ActivityEx = getItem.get_item("ActivityEx");
                var ActvityApp = getItem.get_item("ActvityApp");
                var DrivingEx = getItem.get_item("DrivingEx");
                var DrivingApp = getItem.get_item("DrivingApp");
                var ManagementExa = getItem.get_item("ManagementExa");
                var ManagementApp = getItem.get_item("ManagementApp");
                var BoundaryExa = getItem.get_item("BoundaryExa");
                var BoundaryApp = getItem.get_item("BoundaryApp");
                var InspiringExa = getItem.get_item("InspiringExa");
                var InspiringApp = getItem.get_item("InspiringApp");


                $('#activityExample').val(ActivityEx);
                $('#activityAppraisee').val(ActvityApp);
                $('#drivingExample').val(DrivingEx);
                $('#drivingAppraisee').val(DrivingApp);
                $('#managementExample').val(ManagementExa);
                $('#managementAppraisee').val(ManagementApp);
                $('#bounderiesExample').val(BoundaryExa);
                $('#boundariesAppraisee').val(BoundaryApp);
                $('#inspiringExample').val(InspiringExa);
                $('#inspirirngappraisee').val(InspiringApp);

            } // End While Loop

            currentContext.executeQueryAsync(succesdisplayperformance, faileddisplayperformance);

        } // goThrough()
        function onFailing(sender, args) {
            console.warn("Error: " + args.get_message());
        }
    }
    function succesdisplayperformance() {
        console.log("Perfomance Reviewed fecthed successfully");
    }
    function faileddisplayperformance(sender, args) {
        console.error("Error: " + args.get_message());
    }

   
});