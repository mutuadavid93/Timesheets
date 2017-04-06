
jQuery(document).ready(function ($) {
    //ExecuteOrDelayUntilScriptLoaded(loadConstants, "sp.js");

    var tap = 1;
    $('#addRowBtn').on("click", function (event) {
        tap++;
        // Duplicate a row and empty it
        $('#row_id_1').clone().appendTo('#real_tbl')
            .attr("id", "row_id_" + tap.toString()).find("input").val("");

        $('#saveItemBtn').on("click", function (event) {
            saveRecords();
        });

        function saveRecords() {
            var ctx = SP.ClientContext.get_current();
            var list = ctx.get_web().get_lists().getByTitle("Friends");
            var itemInfoObj = new SP.ListItemCreationInformation();

            var vendor, certid, certname, myArray = [];
            var seen = {};

            // Loop through each tr's and get it's input fields' value
            $('#tbody_id tr').each(function (index, item) {
                // Avoid Request DataCorruption

                console.warn(item);
                //var ctx2 = new SP.ClientContext(ctx.get_url());

                certid = $($(this).find(".certid")).val();
                vendor = $($(this).find(".vendor")).val();
                certname = $($(this).find(".certname")).val();


                newAddedItem = list.addItem(itemInfoObj);

                // Set item values into the List's records
                newAddedItem.set_item("CertID", certid);
                newAddedItem.set_item("Vendor", vendor);
                newAddedItem.set_item("Certname", certname);

                // Remove duplicate trs
                /*var txt = $(this).text();
                if (seen[txt]) {
                    $(this).remove();
                } else {
                    seen[txt] = true;

                    
                }

                console.log($(this).closest('#row_id_' + index.toString()));

                if ($($(this).closest('#row_id_' + index.toString()).find('.certid').val() === certid)) {
                    var parow = $($(this).closest('#row_id_' + index.toString()));
                    //if (parow.firstchild) {
                    //    parow.removeChild(parow.firstchild);
                    //}

                    
                    $('a').each(function () {
                        var txt = $(this).text();
                        if (seen[txt])
                            $(this).remove();
                        else
                            seen[txt] = true;
                    });  
                }*/

                newAddedItem.update();
                ctx.load(newAddedItem);
                myArray.push(newAddedItem);

                ctx.executeQueryAsync(success, failure);
            });
            


            function success() {
                console.log("Items added successfully!!");
            }

            function failure(){}
        }// End saveRecords()

        
    });
});