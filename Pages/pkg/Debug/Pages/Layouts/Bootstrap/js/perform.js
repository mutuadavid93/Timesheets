jQuery(document).ready(function ($) {
    //some code
  
    var startYr = moment().startOf('year').format('LL');
    var endYr = moment().endOf('year').format('LL');
    $('.startYear').val(startYr + " - " + endYr);

    var toss = 1;
    $('#sect1_AddRow').on("click", function (event) {
        event.preventDefault();
        toss++;

        $('#sectone_row_1').clone().appendTo('#sect1_Tbl')
                .attr("id", "sectone_row_" + toss.toString()).find("input:text").each(function () {
                    $(this).val("");
                });
    }); // #sect1_AddRow

    var rap = 1;
    $('#sect3_AddRow').on("click", function (event) {
        event.preventDefault();
        rap++;

        $('#section3_row_1').clone().appendTo('#section3_Tbl')
                .attr("id", "section3_row_" + rap.toString()).find("input:text").each(function () {
                    $(this).val("");
                });
    }); // #sect3_AddRow

    var race = 1;
    $('#sect4_AddRow').on("click", function (event) {
        event.preventDefault();
        race++;

        $('#section4_row_1').clone().appendTo('#section4_Tbl')
                .attr("id", "section4_row_" + race.toString()).find("input:text").each(function () {
                    $(this).val("");
                });
    }); // #sect3_AddRow


    // Supervisor and Appraisse Dates of Submission
    $('#appraiseDates').val(moment().format("MM/DD/YYYY"));
    $('#superDates').val(moment().format("MM/DD/YYYY"));

    // ## Start Current USerProfile

    var fetchFunc = function () {
        var links_url = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties";
        var links_headers = { "accept": "application/json;odata=verbose" };

        var callback = function (data) {
            //console.log(data.d.AccountName+ " "+data.d.DisplayName);
            $('#ctl00_PlaceHolderMain_supervisorMgr').val(data.d.ExtendedManagers.results[1]).prop('readonly', true);
            $('#userAppraisee').val(data.d.DisplayName);
            $('#appraiseeUserName').val(data.d.AccountName);
            $('#immediateManager').val(data.d.ExtendedManagers.results[1]).prop('readonly', true);

            GetUserIdFromUserName(data.d.ExtendedManagers.results[1], 'superLoginName'); //Invoke it now
            GetUserIdFromUserName(data.d.AccountName, 'appraiseeLoginName'); //Invoke it now

            $('#appraiseDate').val(moment().format("MM/DD/YYYY"));
            $('#superDate').val(moment().format("MM/DD/YYYY"));

            $('#appraisee').val(data.d.DisplayName);
            $('#superName').val(data.d.ExtendedManagers.results[1])
        };

        $.ajax({
            type: 'GET',
            headers: links_headers,
            url: links_url,
            success: callback,
            error: function () {
                console.log("Failed to retrieve");
            }
        });

        // Get the UserID using the Username
        function GetUserIdFromUserName(userName, elemID) {
            /// according to the environment.
            var prefix = "i:0#.w|";
            var siteUrl = _spPageContextInfo.siteAbsoluteUrl;
            var accountName = prefix + userName;
            $.ajax({
                url: siteUrl + "/_api/web/siteusers(@v)?@v='" +
                        encodeURIComponent(accountName) + "'",
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" },
                success: function (data) {
                    console.log("Received UserId " + data.d.Id);
                    console.log(JSON.stringify(data));
                    console.warn(data.d.Id + ";#" + data.d.Title);
                    return $('#' + elemID).val(data.d.Id + ";#" + data.d.Title);
                },
                error: function (data) {
                    console.log(JSON.stringify(data));
                }
            });
        }

    }();

    // ## End Current USerProfile




    // ## Start APB Section 1
    var startWk = moment().startOf("isoweek").toDate();
    var begin = new Date(1970, 0, 1);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    var ObjRefID = "APBObjRef_" + getRandomInt(startWk.getTime(), begin.getTime());

    // Global ObjectID Holder Variable
    var globalRefID = ObjRefID;
    $('.ObjectRefIDHere').html(globalRefID);
    var ObjectRefIDHere = $('.ObjectRefIDHere').text();

    function apbObjectivesSection() {
        alert("We are in the first function");
        var currentCrx = SP.ClientContext.get_current();
        var web = currentCrx.get_web();

        try {
            var list = web.get_lists().getByTitle("MyObjectives");
            var itemInfoObj = new SP.ListItemCreationInformation();

            // Collect UserName
            var appraiseUserName = $('#appraiseeUserName').val();
            var managerUserName = $('#immediateManager').val();

            var realRef = "REF_" + $('#appraiseeUserName').val().replace(/\\/g, '') + $('#immediateManager').val().replace(/\\/g, '');

            // Loop through the trs
            $('#section_one tr').each(function (index, item) {
                var apbObj = $($(this).find('.performObj')).val();
                var weight = $($(this).find('.weighting')).val();
                var evidence = $($(this).find('.Evidence')).val();
                var hinders = $($(this).find('.hinders')).val();
                var selRating = $($(this).find('.selRating')).val();
                var mgerRate = $($(this).find('.mgersRate')).val();
                var agreedRate = $($(this).find('.agreedRate')).val();


                var newAddedItem = list.addItem(itemInfoObj);

                console.warn("Tr number: " + index + " " + apbObj + " " + weight + " " + agreedRate);

                newAddedItem.set_item("Title", realRef);
                newAddedItem.set_item("Weighting", weight);
                newAddedItem.set_item("AchievementEvidence", evidence);
                newAddedItem.set_item("HinderingFactors", hinders);
                newAddedItem.set_item("SelfRating", selRating);
                newAddedItem.set_item("ManagerRating", mgerRate);
                newAddedItem.set_item("APBObjective", apbObj);
                newAddedItem.set_item("AgreedRating", agreedRate);
                newAddedItem.update();
                currentCrx.executeQueryAsync(onQuerySuccess, onQueryFailure);
            }); //End Each Loop
        } catch (Ex) {
            alert("apbObjectivesSection() threw an error: " + Ex.message);
        }
    } //apbObjectivesSection

    function onQuerySuccess() {
        alert('Data inserted Successfully');
    }

    function onQueryFailure(sender, args) {
        alert('Request Failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }

    $('#saveSectOne').click(function (event) {
        event.preventDefault();
        apbObjectivesSection(); // invoke the func
    });
    // ## End APB Section 1

    // ## Start Section Four

    function learnDevelopement() {
        alert("We are in the learnDevelopement function");
        var currentCrx = SP.ClientContext.get_current();
        var web = currentCrx.get_web();

        try {
            var list = web.get_lists().getByTitle("LearnDev");
            var itemInfoObj = new SP.ListItemCreationInformation();

            var realRef = "REF_" + $('#appraiseeUserName').val().replace(/\\/g, '') + $('#immediateManager').val().replace(/\\/g, '');

            // Loop through the trs
            $('#section_four tr').each(function (index, item) {
                var rqment = $($(this).find('.rqrement')).val();
                var competency = $($(this).find('.competency')).val();
                var priority = $($(this).find('.priority')).val();
                var opportunity = $($(this).find('.opportunity')).val();

                var newAddedItem = list.addItem(itemInfoObj);

                newAddedItem.set_item("Title", realRef);
                newAddedItem.set_item("Requirement", rqment);
                newAddedItem.set_item("Priority", priority);
                newAddedItem.set_item("References", opportunity);
                newAddedItem.set_item("LinkedObjective", competency);
                newAddedItem.update();
                currentCrx.executeQueryAsync(learnDevSuccess, learnDevFail);
            }); //End Each Loop
        } catch (Ex) {
            alert("learnDevelopement() threw an error: " + Ex.message);
        }
    } //learnDevelopement

    function learnDevSuccess() {
        console.warn('LearnDev List Effected');
    }

    function learnDevFail(sender, args) {
        alert('Request Failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }

    $('#saveSectionFour').click(function (event) {
        event.preventDefault();
        learnDevelopement(); // invoke the func
    });

    // ## End Section Four


    // ## Start Section Three

    function nextReviewPlans() {
        alert("We are in the nextReviewPlans function");
        var currentCrx = SP.ClientContext.get_current();
        var web = currentCrx.get_web();

        try {
            var list = web.get_lists().getByTitle("NextReviewPlans");
            var itemInfoObj = new SP.ListItemCreationInformation();

            var realRef = "REF_" + $('#appraiseeUserName').val().replace(/\\/g, '') + $('#immediateManager').val().replace(/\\/g, '');

            // Loop through the trs
            $('#section_three tr').each(function (index, item) {
                var objs = $($(this).find('.objectives')).val();
                var weighing = $($(this).find('.weighing')).val();
                var measures = $($(this).find('.measures')).val();
                var timeline = $($(this).find('.timeline')).val();
                var supportneeded = $($(this).find('.supportneeded')).val();

                var newAddedItem = list.addItem(itemInfoObj);

                newAddedItem.set_item("Title", realRef);
                newAddedItem.set_item("Objective", objs);
                newAddedItem.set_item("Weighting", weighing);
                newAddedItem.set_item("Measures", measures);
                newAddedItem.set_item("Timeline", timeline);
                newAddedItem.set_item("NeededSupport", supportneeded);
                newAddedItem.update();
                currentCrx.executeQueryAsync(nxtplansSuccess, nxtplansDevFail);
            }); //End Each Loop
        } catch (Ex) {
            alert("learnDevelopement() threw an error: " + Ex.message);
        }
    } //nextReviewPlans

    function nxtplansSuccess() {
        console.warn('LearnDev List Effected');
    }

    function nxtplansDevFail(sender, args) {
        alert('Request Failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }

    $('#saveSectionThree').click(function (event) {
        event.preventDefault();
        nextReviewPlans(); // invoke the func
    });

    // ## End Section Three

    // ## Start Section Five
    var returnedItems = null;
    var getItemID
    function userMagerComments() {
        alert("We are in the userMagerComments function");
        var currentCrx = SP.ClientContext.get_current();
        var web = currentCrx.get_web();

        try {
            var list = web.get_lists().getByTitle("Comments");
            var itemInfoObj = new SP.ListItemCreationInformation();

            var realRef = "REF_" + $('#appraiseeUserName').val().replace(/\\/g, '') + $('#immediateManager').val().replace(/\\/g, '');

            //==========================================
            //code to check if a file exixt
            var commentcamlQuery = new SP.CamlQuery();
            var caml = new SP.CamlQuery();
            caml.set_viewXml("<View><Query><Where><BeginsWith><FieldRef Name='Title' /><Value Type='Text'>" + realRef + "</Value></BeginsWith></Where></Query></View>");
            commentcamlQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>" + realRef + "</Value></Eq></Where></Query></View>");
            this.checkcollListItem = list.getItems(commentcamlQuery);
            returnedItems = list.getItems(caml);
            //clientContext.load(list);


            currentCrx.load(checkcollListItem);
            currentCrx.load(returnedItems);
            currentCrx.executeQueryAsync(
                    function () {
                        function update() {
                            //get ID to Update otherwise Insert
                            var enumerator = returnedItems.getEnumerator();
                            while (enumerator.moveNext()) {
                                var listItem = enumerator.get_current();

                                getItemID = listItem.get_id();
                                console.log('The Id is :' + getItemID)
                            }
                            console.log('Update now');
                        }
                        if (checkcollListItem.get_count() > 0) {
                            //update//get ID and Update
                            console.log('Item exixt');
                            update();
                            updateComments();

                        }
                        if (checkcollListItem.get_count() < 1) {
                            //insert
                            console.log('The item does not exixt ');
                            insertComments();


                        }

                    }, function () {
                        console.log('inside on failed to check the if it exixt');
                        console.log('Failed to check')
                    }
            );


            currentCrx.executeQueryAsync(commentsSuccess, commentsFail);
        } catch (Ex) {
            alert("userMagerComments() threw an error: " + Ex.message);
        }
    } //nextReviewPlans

    function commentsSuccess(sender, args) {
        console.log('Inside the succces get ID from the commments for updating');

    }
    function commentsFail(sender, args) {
        console.log('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());

    }

    ///functions to Insert comments and update comments
    function insertComments() {
       
        var clientContext = SP.ClientContext.get_current();
        var web = clientContext.get_web();
        try {
            var list = clientContext.get_web().get_lists().getByTitle("Comments");
            var itemCreateInfo = new SP.ListItemCreationInformation();
            //Declare the variable to Get value from input element

            var realRef = "REF_" + $('#appraiseeUserName').val().replace(/\\/g, '') + $('#immediateManager').val().replace(/\\/g, '');
            var appraise = $('#appraise').val();
            var supervisor = $('#super').val();
            //var appraisee = $('#appraisee').val();
            var appraiseDates = $('#appraiseDates').val();
            var superName = $('#superLoginName').val();
            var superDates = $('#superDates').val();
            var dateofReview = $('#reviewdate').val();

            var userAppraisee = $('#userAppraisee').val();
            var appraiseDate = $('#appraiseDate').val();
            var immediateManager = $('#immediateManager').val();
            var superDate = $('#superDate').val();



            this.newAddedItem = list.addItem(itemCreateInfo);
            //Adding list items
            newAddedItem.set_item("Title", realRef);
            newAddedItem.set_item("SupercisorComments", supervisor);
            newAddedItem.set_item("AppraiseeComments", appraise);
            newAddedItem.set_item("Appraisee", $('#appraiseeLoginName').val());
            newAddedItem.set_item("Supervisor", $('#superLoginName').val());
            newAddedItem.set_item("SupervisorDate", superDates);
            newAddedItem.set_item("AppraiseeDate", appraiseDates);

            newAddedItem.set_item('DateOfReview', dateofReview);
            newAddedItem.set_item("AppraiseeSignature", userAppraisee);
            newAddedItem.set_item("appraiseeSignatureDate", appraiseDate);
            newAddedItem.set_item("immediateSupervisorSignature", immediateManager);
            newAddedItem.set_item("supervisorsignaturedate", superDate);



            newAddedItem.update();
            clientContext.load(newAddedItem);
            clientContext.executeQueryAsync(success, failure);
        } catch (Ex) {
            alert(Ex.message);
        }
        function success() {
            console.log("Items added successfully!! : Comments");
        }
        function failure() {
            console.warn('Request to approvers  failed. ' + args.get_message() +
                    '\n' + args.get_stackTrace());
        }
    }
    function updateComments() {
        console.log('Start Updatating The Comments List with ID :' + getItemID);
        var clientContext = SP.ClientContext.get_current();// Get SPSITEURL
        var web = clientContext.get_web();
        try {
            var list = clientContext.get_web().get_lists().getByTitle("Comments");

            var appraise = $('#appraise').val();
            var supervisor = $('#super').val();
            var appraiseDates = $('#appraiseDates').val();
            var superDates = $('#superDates').val();
            var dateofReview = $('#reviewdate').val();

            this.oListItem = list.getItemById(getItemID);



            oListItem.set_item('SupercisorComments', supervisor);
            oListItem.set_item('AppraiseeComments', appraise);
            oListItem.set_item('SupervisorDate', superDates);
            oListItem.set_item('AppraiseeDate', appraiseDates);
            oListItem.set_item('DateOfReview', dateofReview);

            reviewdate
            oListItem.update();
            clientContext.executeQueryAsync(success, failure);
        } catch (Ex) {
            alert(Ex.message);
        }
        function success() {
            console.log("Items Updated successfully!! Comments");
        }
        function failure() {
            console.warn("Failed");
        }

    }

    $('#saveSectionFive').click(function (event) {
        event.preventDefault();
        var TaskrEfIDENtity = "REF_" + $('#appraiseeUserName').val().replace(/\\/g, '') + $('#immediateManager').val().replace(/\\/g, '');
        userMagerComments(); // invoke the
        appraiseeView(TaskrEfIDENtity);
    });



    // ## Start Submiting to AppraiseeTaskList

    function pushtotasklist(appraiseename) {
        alert("We are in the pushtotasklist function");
        var currentCrx = SP.ClientContext.get_current();
        var web = currentCrx.get_web();

        try {
            var list = web.get_lists().getByTitle("AppraiseeTaskList");
            var itemInfoObj = new SP.ListItemCreationInformation();
            var newAddedItem = list.addItem(itemInfoObj);

            var realTaskName = "TASK_" + $('#appraiseeUserName').val().replace(/\\/g, '') + $('#immediateManager').val().replace(/\\/g, '');
            var realRef = "REF_" + $('#appraiseeUserName').val().replace(/\\/g, '') + $('#immediateManager').val().replace(/\\/g, '');

            newAddedItem.set_item("Title", realTaskName);
            newAddedItem.set_item("Appraisee_x0020__x0020_Name", appraiseename);
            newAddedItem.set_item("Appraisee_x0020_Username", realRef);

            newAddedItem.update();
            currentCrx.executeQueryAsync(toTaskListSuccess, toTaskListFail);
        } catch (Ex) {
            alert("pushtotasklist() threw an error: " + Ex.message);
        }
    } //pushtotasklist()

    function toTaskListSuccess() {
        console.warn('Appraisee TaskList Effected');
    }

    function toTaskListFail(sender, args) {
        alert('Request Failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }

    // ## End Submiting to AppraiseeTaskList
    var appraiseeView = function (TaskrEfIDENtity) {
        alert("wE are inside appraiseeView"+TaskrEfIDENtity);
        var curCtx = SP.ClientContext.get_current();
        var web = curCtx.get_web();
        var lst = web.get_lists().getByTitle("AppraiseeTaskList");


        var myQuery = new SP.CamlQuery();
        myQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Appraisee_x0020_Username' /><Value Type='Text'>" + TaskrEfIDENtity + "</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>");
        var itemCollection = lst.getItems(myQuery);
        var items = curCtx.loadQuery(itemCollection);

        curCtx.executeQueryAsync(itemsreturned, itemsnotreturned);

        function itemsreturned() {
            //alert(items.length);
            if (items.length > 0) {
                alert("You can't have more than one tasks");
            } else {
                pushtotasklist($('#appraiseeLoginName').val());
               
            }
        }

        function itemsnotreturned(sender, args) {
            console.log("Error on appraiseeView() " + args.get_message());
        }
    };

    //section 2 Insert
    $('#saveperformanceReview').click(function(event) {
        event.preventDefault();
        //sava data to the perfomance review list
        insertSection2();
    });
    function insertSection2() {
        var myUrl = SP.ClientContext.get_current();// Get SPSITEURL
        var webb = myUrl.get_web();
        try {

            var Itemlist = myUrl.get_web().get_lists().getByTitle("PerforamaceReview");
            var itemCreateInfomation = new SP.ListItemCreationInformation();
          
            var realRef = "REF_" + $('#appraiseeUserName').val().replace(/\\/g, '') + $('#immediateManager').val().replace(/\\/g, '');
           
            var activiExample = $('#activityExample').val();
            var activiAppraisee = $('#activityAppraisee').val();
            var DrivingExample = $('#drivingExample').val();
            var DrivingAppraisee = $('#drivingAppraisee').val();
            var ManagementExample = $('#managementExample').val();
            var ManagementAppraisee = $('#managementAppraisee').val();
            var BoundaryExample = $('#bounderiesExample').val();
            var BoundaryAppraisee = $('#boundariesAppraisee').val();
            var InspiringExample = $('#inspiringExample').val();
            var InspiringAppraisee = $('#inspirirngappraisee').val();

        
            this.ListItem = Itemlist.addItem(itemCreateInfomation);
            //Adding list items
            ListItem.set_item('Title', realRef);
            ListItem.set_item('ActivityEx', activiExample);
            ListItem.set_item('ActvityApp', activiAppraisee);
           //  ListItem.set_item('ActvityS', );
           //  ListItem.set_item('ActivityAv', 0);

            ListItem.set_item('DrivingEx', DrivingExample);
            ListItem.set_item('DrivingApp', DrivingAppraisee);
           // ListItem.set_item('DrivingS', );
           //  ListItem.set_item('DrivingAv', 0);

            ListItem.set_item('ManagementExa', ManagementExample);
            ListItem.set_item('ManagementApp', ManagementAppraisee);
           // ListItem.set_item('ManagementS', ManagementS);
           // ListItem.set_item('ManagementAv', 0);

            ListItem.set_item('BoundaryExa', BoundaryExample);
            ListItem.set_item('BoundaryApp', BoundaryAppraisee);
          //  ListItem.set_item('BoundaryS',0);
          //  ListItem.set_item('BoundaryAv', 0);

            ListItem.set_item('InspiringExa', InspiringExample);
            ListItem.set_item('InspiringApp', InspiringAppraisee);
           // ListItem.set_item('ManagementS', ManagementS);
           //  ListItem.set_item('InspiringAv', 0);
                        
            ListItem.update();
            myUrl.load(ListItem);
            myUrl.executeQueryAsync(successful, failed);
        } catch (Ex) {
            alert(Ex.message);
        }
        function successful() {
            console.log("Items added successfully!! : PerforamaceReview");
        }
        function failed() {
            console.warn("Failed to save to PerforamaceReview");
        }
    }
   
    //end saving to Perfomance Review

    //## start submiting to the Supervisor Task List


    function SupervisorTaskList(appraiseename) {
        alert("We are in the pushtotasklist function");
        var currentCrx = SP.ClientContext.get_current();
        var web = currentCrx.get_web();

        try {
            var list = web.get_lists().getByTitle("AppraiseeTaskList");
            var itemInfoObj = new SP.ListItemCreationInformation();
            var newAddedItem = list.addItem(itemInfoObj);

            var realTaskName = "TASK_" + $('#appraiseeUserName').val().replace(/\\/g, '') + $('#immediateManager').val().replace(/\\/g, '');
            var realRef = "REF_" + $('#appraiseeUserName').val().replace(/\\/g, '') + $('#immediateManager').val().replace(/\\/g, '');

            newAddedItem.set_item("Title", realTaskName);
            newAddedItem.set_item("Appraisee_x0020__x0020_Name", appraiseename);
            newAddedItem.set_item("Appraisee_x0020_Username", realRef);

            newAddedItem.update();
            currentCrx.executeQueryAsync(toTaskListSuccess, toTaskListFail);
        } catch (Ex) {
            alert("pushtotasklist() threw an error: " + Ex.message);
        }
    } //pushtotasklist()

    function toTaskListSuccess() {
        console.warn('Appraisee TaskList Effected');
    }

    function toTaskListFail(sender, args) {
        alert('Request Failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }
});