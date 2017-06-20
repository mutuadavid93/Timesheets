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
                    return $('#'+elemID).val(data.d.Id + ";#" + data.d.Title);
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
        }catch(Ex){
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

    function userMagerComments() {
        alert("We are in the userMagerComments function");
        var currentCrx = SP.ClientContext.get_current();
        var web = currentCrx.get_web();

        try {
            var list = web.get_lists().getByTitle("Comments");
            var itemInfoObj = new SP.ListItemCreationInformation();

            var realRef = "REF_" + $('#appraiseeUserName').val().replace(/\\/g, '') + $('#immediateManager').val().replace(/\\/g, '');

            var appraise = $('#appraise').val();
            var supervisor = $('#super').val();
            //var appraisee = $('#appraisee').val();
            var appraiseDates = $('#appraiseDates').val();
            var superName = $('#superLoginName').val();
            var superDates = $('#superDates').val();

            var newAddedItem = list.addItem(itemInfoObj);

            newAddedItem.set_item("Title", realRef);
            newAddedItem.set_item("SupercisorComments", supervisor);
            newAddedItem.set_item("AppraiseeComments", appraise);
            newAddedItem.set_item("Appraisee", $('#appraiseeLoginName').val());
            newAddedItem.set_item("Supervisor", $('#superLoginName').val());
            newAddedItem.set_item("SupervisorDate", superDates);
            newAddedItem.set_item("AppraiseeDate", appraiseDates);
            newAddedItem.update();
            currentCrx.executeQueryAsync(commentsSuccess, commentsFail);
        } catch (Ex) {
            alert("userMagerComments() threw an error: " + Ex.message);
        }
    } //nextReviewPlans

    function commentsSuccess() {
        console.warn('LearnDev List Effected');
    }

    function commentsFail(sender, args) {
        alert('Request Failed. ' + args.get_message() + '\n' + args.get_stackTrace());
    }

    $('#saveSectionFive').click(function (event) {
        event.preventDefault();
        //alert($('#superLoginName').val() + " " + $('#appraiseeLoginName').val());
        userMagerComments(); // invoke the 
        appraiseeView();
    });

    // ## End Section Five




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



    var appraiseeView = function () {
        //alert("wE are inside appraiseeView"+urlid);
        var curCtx = SP.ClientContext.get_current();
        var web = curCtx.get_web();
        var lst = web.get_lists().getByTitle("AppraiseeTaskList");


        var myQuery = new SP.CamlQuery();
        myQuery.set_viewXml("<View><Query><Where><Eq><FieldRef Name='Appraisee_x0020_Username' /><Value Type='Text'>REF_ARspadminARspfarm</Value></Eq></Where></Query><RowLimit>1</RowLimit></View>");
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

        function itemsnotreturned(sender, args) { console.log("Error on appraiseeView() " + args.get_message()); }
    };
});