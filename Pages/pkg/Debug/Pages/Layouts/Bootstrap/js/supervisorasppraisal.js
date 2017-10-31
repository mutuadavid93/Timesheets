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
    console.log("View ID is for supervisor : " + realID);

    var appraiseeView = function (urlid) {
        //alert("wE are inside appraiseeView"+urlid);
        var curCtx = SP.ClientContext.get_current();
        var web = curCtx.get_web(); 
        var lst = web.get_lists().getByTitle("SupervisorAppraisalTaskList");

        var myQuery = new SP.CamlQuery();
        myQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='ID' /><Value Type='Counter'>" + urlid + "</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>");
        var itemCollection = lst.getItems(myQuery);
        var items = curCtx.loadQuery(itemCollection, "Include(Title, REF_ID, Appraisee_x0020_Name)");

        curCtx.executeQueryAsync(itemsreturned, itemsnotreturned);

        function itemsreturned() {
            //alert(items.length);
            if (items.length > 0) {
                var item = items[0];
                var taskname = item.get_item("Title");
                var taskREF_ID = item.get_item("REF_ID");
                var appraisename = item.get_item("Appraisee_x0020_Name").get_lookupValue();

                // invoke other functions to use REF_ID parameter
                retrieveObjectives(taskREF_ID, appraisename);
                retrieveNextReviewPlans(taskREF_ID);
                retrieveLearnDev(taskREF_ID);
                retrieveComments(taskREF_ID);
                retrievePerforamaceReview(taskREF_ID);
            }
        }
        function itemsnotreturned(sender, args) { console.log("Error on appraiseeView() " + args.get_message()); }

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

                var weigh = listItem.get_item("Weighting");
                var evidence = listItem.get_item("AchievementEvidence");
                var factors = listItem.get_item("HinderingFactors");
                var objective = listItem.get_item("APBObjective");
                var myRate = listItem.get_item("SelfRating");
                var mgrRate = listItem.get_item("ManagerRating");
                var agreedRate = listItem.get_item("AgreedRating");

                var $trtd = "<tr>" +
                               "<td><input type='text' class='form-control performObj' value='" + objective + "' runat='server' /></td>" +
                               "<td><input type='text' class='form-control performObj' value='" + weigh + "' runat='server' /></td>" +
                               "<td><input type='text' class='form-control performObj' value='" + evidence + "' runat='server' /></td>" +
                                "<td><input type='text' class='form-control performObj' value='" + factors + "' runat='server' /></td>" +
                                "<td><input type='text' class='form-control performObj' value='" + myRate + "' runat='server' /></td>" +
                                "<td><input type='text' class='form-control performObj' value='" + mgrRate + "' runat='server' /></td>" +
                                "<td><input type='text' class='form-control performObj' value='" + agreedRate + "' runat='server' /></td>" +
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
               
                var SupervisorDate = new Date(); //getItem.get_item("SupervisorDate");
                var Appraisee = getItem.get_item("Appraisee").get_lookupValue();
                var Supervisor = getItem.get_item("Supervisor").get_lookupValue();
                var reviewdate = getItem.get_item("DateOfReview");

                var AppraiseeSignature = getItem.get_item("AppraiseeSignature");
                var appraiseeSignatureDate = getItem.get_item("appraiseeSignatureDate");
                var immediateSupervisorSignature = getItem.get_item("immediateSupervisorSignature");
                var supervisorsignaturedate = getItem.get_item("supervisorsignaturedate");
               
                    var g= getItem.get_id();
                    $("#getID").val(g);
                //get signatures

                //format the Date
                var appDate = (AppraiseeDate.getDate() + '/' + (AppraiseeDate.getMonth() + 1) + '/' + AppraiseeDate.getFullYear());
               var superDate = (SupervisorDate.getDate() + '/' + (SupervisorDate.getMonth() + 1) + '/' + SupervisorDate.getFullYear());
                if (reviewdate != "") {
                    var proposeddate = (reviewdate.getDate() + '/' + (reviewdate.getMonth() + 1) + '/' + reviewdate.getFullYear());

                }
              //append data to the respective fields
                $('#super').val(SupercisorComments);
                $('#appraise').val(AppraiseeComments);
                $('#appraiseDates').val(appDate);
                $('#superDates').val(superDate);

             

                $('#appraisee').val(Appraisee);
                $('#superName').val(Supervisor);
                if (proposeddate !="")
                {
                      $('#reviewdate').val(proposeddate);
                }
              

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
    //GET ID
   
    function retrievePerforamaceReview(taskREF_ID) {
        var currentContext = SP.ClientContext.get_current();
        var web = currentContext.get_web();
        //get the reference number to the global variable
      

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

                //get ID
             var   perfomanceID = getItem.get_item('ID');
                $('#getPerformanceID').val(perfomanceID);
                
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

                //get supervisor
                
                var activitySupervisor = getItem.get_item("ActivityS");
                var drivingSupervisor = getItem.get_item("DrivingS");
                var managementSupervisor = getItem.get_item("ManagementS");
                var bounderiesSupervisor = getItem.get_item("BoundaryS");
                var inspiringSupervisor = getItem.get_item("InspiringS");
                
                // get averages
               

                var activityAverage = getItem.get_item("ActivityAv");
                var drivingAverage = getItem.get_item("DrivingAv");
                var managementAverage = getItem.get_item("ManagementAv");
                var boudariesAverage = getItem.get_item("BoundaryAv");
                var inspiringEvarage = getItem.get_item("InspiringAv");
                


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
                
              
 
                $('#activitySupervisor').val(activitySupervisor);
                $('#drivingSupervisor').val(drivingSupervisor);
                $('#managementSupervisor').val(managementSupervisor);
                $('#bounderiesSupervisor').val(bounderiesSupervisor);
                $('#inspiringSupervisor').val(inspiringSupervisor);

                $('#activityAverage').val(activityAverage);
                $('#drivingAverage').val(drivingAverage);
                $('#managementAverage').val(managementAverage);
                $('#boudariesAverage').val(boudariesAverage);
                $('#inspiringEvarage').val(inspiringEvarage);
                

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

    //Inserting to the  prrt

    //section 2 update supervisor section;
    $('#saveperformanceReview').click(function (event) {
       
        event.preventDefault();
        updateSection2();
        alert('You have successfull submited');
    });
   
    //  console.log('check if the ref ID outside the function is :' + perfomanceID);

   
    function findaverage() {

        $('#activitySupervisor').change(function () {
            var val1 = (isNaN(parseInt($('#activityAppraisee').val()))) ? 0 : parseInt($('#activityAppraisee').val());
            var val2 = (isNaN(parseInt($('#activitySupervisor').val()))) ? 0 : parseInt($('#activitySupervisor').val());
            var average = (val1 + val2) / 2;
            $('#activityAverage').val(average);
        });

        $("#drivingSupervisor").on("change", function () {
            var val1 = (isNaN(parseInt($('#drivingAppraisee').val()))) ? 0 : parseInt($('#drivingAppraisee').val());
            var val2 = (isNaN(parseInt($('#drivingSupervisor').val()))) ? 0 : parseInt($('#drivingSupervisor').val());
            var average = (val1 + val2) / 2;
            $('#drivingAverage').val(average)

        });


        $('#managementSupervisor').change(function () {
            var val1 = (isNaN(parseInt($('#managementAppraisee').val()))) ? 0 : parseInt($('#managementAppraisee').val());
            var val2 = (isNaN(parseInt($('#managementSupervisor').val()))) ? 0 : parseInt($('#managementSupervisor').val());
            var average = (val1 + val2) / 2;
            $('#managementAverage').val(average);
        });


        $('#bounderiesSupervisor').change(function () {
            var val1 = (isNaN(parseInt($('#boundariesAppraisee').val()))) ? 0 : parseInt($('#boundariesAppraisee').val());
            var val2 = (isNaN(parseInt($('#bounderiesSupervisor').val()))) ? 0 : parseInt($('#bounderiesSupervisor').val());
            var average = (val1 + val2) / 2;
            $('#boudariesAverage').val(average);
        });

        $('#inspiringSupervisor').change(function () {
            var val1 = (isNaN(parseInt($('#inspiringSupervisor').val()))) ? 0 : parseInt($('#inspiringSupervisor').val());
            var val2 = (isNaN(parseInt($('#inspirirngappraisee').val()))) ? 0 : parseInt($('#inspirirngappraisee').val());
            var average = (val1 + val2) / 2;
            $('#inspiringEvarage').val(average);
        });
    }
    findaverage();

    function updateSection2() {
        
        //queryleaveInfoTaskList();
        
    
        var clientContext = SP.ClientContext.get_current();// Get SPSITEURL
        var web = clientContext.get_web();
        try {
            var lInfTaskList = clientContext.get_web().get_lists().getByTitle("PerforamaceReview");
          
            var activitySupervisor = $('#activitySupervisor').val();
            var drivingSupervisor = $('#drivingSupervisor').val();
            var managementSupervisor = $('#managementSupervisor').val();
            var bounderiesSupervisor = $('#bounderiesSupervisor').val();
            var inspiringSupervisor = $('#inspiringSupervisor').val();
            
            //take the averages
            var activityAverage = $('#activityAverage').val();
            var drivingAverage = $('#drivingAverage').val();
            var managementAverage = $('#managementAverage').val();
            var boudariesAverage = $('#boudariesAverage').val();
            var inspiringEvarage = $('#inspiringEvarage').val();

            var update_ID = $('#getPerformanceID').val();
            this.updatePerformance = lInfTaskList.getItemById(update_ID);

            updatePerformance.set_item('ActivityS', activitySupervisor);
           updatePerformance.set_item('DrivingS', drivingSupervisor);
            updatePerformance.set_item('ManagementS', managementSupervisor);
           updatePerformance.set_item('BoundaryS', bounderiesSupervisor);
           updatePerformance.set_item('InspiringS', inspiringSupervisor);

           updatePerformance.set_item('ActivityAv', activityAverage);
           updatePerformance.set_item('DrivingAv', drivingAverage);
           updatePerformance.set_item('ManagementAv', managementAverage);
           updatePerformance.set_item('BoundaryAv', boudariesAverage);
           updatePerformance.set_item('InspiringAv', inspiringEvarage);
           
           
        
            updatePerformance.update();
            clientContext.executeQueryAsync(successful, failed);
        } catch (Ex) {
            alert(Ex.message);
        }
        function successful(sender, args) {
            console.log("Items Updated successfully!! to PerforamaceReview");
        }
        function failed(sender, args) {
            alert('Request Failed. ' + args.get_message() + '\n' + args.get_stackTrace());
            console.warn("Failed to Update PerforamaceReview Request Failed. ' + args.get_message() + '\n" + args.get_stackTrace());
        }
    }
    //submiting supervisor details

    //section 2 update supervisor section;
  
    $('#SuperviorComments').on("click", function (event) {
        event.preventDefault();
       var getID= $("#getID").val();
       updateSupervisorDetails(getID)
        alert('You have successfull submited');
    });


  
    

    function updateSupervisorDetails(getID) {
        //need to get id
       
    //reset the supervisor and update it to today's Date

        var updateComments = getID;
        //   console.log('this is the id to update : ' + updateLeaveInfo_ID);

        var clientContext = SP.ClientContext.get_current();// Get SPSITEURL
        var web = clientContext.get_web();
        try {
            var list = clientContext.get_web().get_lists().getByTitle("Comments");
            //Declare the variable to Get value from input element
            var sComments = $("#super").val();
            var dateofreview = $("#reviewdate").val();
           
            var today = new Date();
            var mydayofreview = new Date(dateofreview);
           // var rev = new Date(dateofreview);
            console.log(sComments, ' Date of review :' + mydayofreview, today);
           
            this.oListItem = list.getItemById(updateComments);
            //updating the list By ID
          //  oListItem.set_item('SupervisorDate', today);
            oListItem.set_item('DateOfReview', mydayofreview);
            oListItem.set_item('SupercisorComments', sComments);
            oListItem.set_item('SupervisorDate', today);
            


            oListItem.update();
            // clientContext.load(oListItem);//not necessary
            clientContext.executeQueryAsync(successupdates, failedupdates);
            // clientContext.executeQueryAsync(Function.createDelegate(this, this.success), Function.createDelegate(this, this.failure));
        } catch (Ex) {
            alert(Ex.message);
        }
        function successupdates() {
            console.log("Items Updated successfully!! to Hod Leave Info");
        }
        function failedupdates(sender, args) {
           console.log('Request to approvers  failed. LINE ' + args.get_message() +
                    '\n' + args.get_stackTrace());

        }

    }
    
});