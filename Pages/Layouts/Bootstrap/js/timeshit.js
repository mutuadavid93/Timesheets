
jQuery(document).ready(function () {

    // Approver form
    $('.timeshitStartDate').datepicker();
    $('.timeshitEndDate').datepicker();


    // Prevent user form typing on any date's text field
    $("input[type=text]").on("focus", function (event) {
        ($(event.target).hasClass("performDate")) ?

        $(this).blur()
        :
        console.warn("You can't blur on this textfield!!");
    });

    (localStorage.getItem('myTbl')) ?
        $('#killerTBody').html(localStorage.getItem('myTbl')) : console.error("Empty localstorage");

    $('#stampRow').on('click', function (event) {
        var myRow = $(`<tr>
                    <td>
                        <select class="form-control">
                            <option value="">General</option>
                            <option value="">Project</option>
                        </select>
                    </td>

                    <td>
                        <input class="form-control" type="text" />
                    </td>

                    <td>
                        <textarea class="form-control"></textarea>
                    </td>
                    <td>
                        <textarea class="form-control"></textarea>
                    </td>

                    <td>
                        <select class="form-control">
                            <option value="Monday" selected>MON</option>
                            <option value="Tuesday">TUE</option>
                            <option value="Wednesday">WED</option>
                            <option value="Thursday">THUR</option>
                            <option value="Friday">FRI</option>
                        </select>
                    </td>

                    <td>
                        <input type="text" class="form-control" />
                    </td>
                </tr>`);


        // append next to the first row
        //$(myRow).insertAfter( $('#killerTBody > tr') );

        $('#killerTBody').append(myRow);

        var tmpTable = $('#killerTBody').html();
        localStorage.setItem('myTbl', tmpTable);
    });

    $('#refreshPage').click(function () {
        window.localStorage.clear();

        //window.location.href=window.location.href;
        location.reload();
    });
});