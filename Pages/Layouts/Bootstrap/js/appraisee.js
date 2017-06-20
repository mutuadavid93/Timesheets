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

                var weigh = listItem.get_item("Weighting");
                var evidence = listItem.get_item("AchievementEvidence");
                var factors = listItem.get_item("HinderingFactors");
                var objective = listItem.get_item("APBObjective");
                var myRate = listItem.get_item("SelfRating");
                var mgrRate = listItem.get_item("ManagerRating");
                var agreedRate = listItem.get_item("AgreedRating");

                var $trtd = "<tr>"+
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
});