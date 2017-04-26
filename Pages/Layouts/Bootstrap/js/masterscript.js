$(document).ready(function () {
    // Get all the elements with data-pdsa-collapser-name attr
    // and batch them.
    var pdsaCollapsers = $("[data-pdsa-collapser-name]");
    
    // Loop through each panel-group element
    for(var x=0; x<pdsaCollapsers.length; x++) {
        // Grab our panel-group name 
        // NB: id is named the same as the panel-group name
        var name = pdsaCollapsers[x].id;
        
        // Code the Open Close Logic
        // Grab the icons using data attr
        var open = $("#"+ name).data("pdsa-collapser-open");
        var close = $("#"+ name).data("pdsa-collapser-close");


        $('#playlists .pdsa-panel-toggle')
                .addClass(open);

        var list = $('#'+ name+' .in');
        for(var i=0; i<list.length; i++) {

            // find an <a> with same href attr as id of elem with class in
            // then find the next elem with class .pdsa-panel-toggle 
            // then swap the +/- icon
            $("a[href='#" + $(list[i]).attr("id")+ "']" )
                    .next(".pdsa-panel-toggle")
                    .removeClass(open)
                    .addClass(close);
        }

        // Swicth between +/- icons
        // HIDE

        // when hide collapse event is fired, after clicking on the 
        // current id, go to prev element and inside it, find 
        // an element with class .pdsa-panel-toggle 
        // then swicth between +/- icons.
        $('#playlists').on('hide.bs.collapse', function (evt) {
            $("#" + evt.target.id).prev()
                    .find(".pdsa-panel-toggle")
                    .removeClass($("#"+ name).data("pdsa-collapser-close"))
                    .addClass($("#"+ name).data("pdsa-collapser-open"));
        });

        // SHOW
        $('#playlists').on('show.bs.collapse', function (evt) {
            $("#" + evt.target.id).prev()
                    .find(".pdsa-panel-toggle")
                    .removeClass($("#"+ name).data("pdsa-collapser-open"))
                    .addClass($("#"+ name).data("pdsa-collapser-close"));
        });
    } // End For Loop
    
    
});