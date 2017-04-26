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
});