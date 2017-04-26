$(function () {
   $('#tripDate').datepicker();
   $('#employeeDates').datepicker();
   $('#fromDate').datepicker(); 
   $('#toDate').datepicker();
    
    
    // Dynamic Date very slow
    /*$('.performDate').on("focusIn", function () {
       $(this).datepicker(); 
    }); */
    
    $('#performDate').datepicker();
    $('#appraiseDate').datepicker();
    $('#supervisorDate').datepicker();
    $('#nextLevelDate').datepicker();
    $('#appraiseDates').datepicker();
    $('#superDates').datepicker();
    
    // Prevent user form typing on any date's text field
    $("input[type=text]").on("focus", function (event) {
       ($(event.target).hasClass("performDate")) ?
       
       $(this).blur()
       : 
       console.warn("You can't blur on this textfield!!");
    });
    
    
    
    
    
    //$('#tabbedRows').empty().append(localStorage.getItem('newTBodyState'));
    //$('#tabbedRows').empty().append(Cookies.get('myTableCon'));
    //console.info(Cookies.get('myTableCon'));
   
   console.warn(localStorage.getItem('newTBodyState'));
   $('#tabbedRows').empty().append(localStorage.getItem('newTBodyState'));
   
   var myArray = [];   
   
   //console.log(Cookies.get());
    $('#addRow').click(function () {
        var $tr = $(`<tr>
                    <td>
                            <input type="checkbox" class="checkbox myCheckBx" />                                                             
                    </td>
                    
                    <td>
                        <input type="text" class="form-control" />
                    </td>
                    <td>
                        <input type="text" class="form-control" />
                    </td>
                    <td>
                        <input type="text" class="form-control" />
                    </td>
                    <td>
                        <input type="text" class="form-control" />
                    </td>
                </tr>`);
        
         $('#tabbedRows').prepend($tr);
         var myTbody = $('#tabbedRows').html();
         myArray.push(myTbody);
         
         
         
         // get the last element from the array
         if(myArray.push(myTbody) > 0 && localStorage.getItem('newTBodyState')) {
             //console.error(myArray.slice(-1)[0]);
             var lastItem = $('#tabbedRows').empty().append(myArray.slice(-1)[0]);
        
            // store the new table state
            localStorage.setItem("newTBodyState", lastItem);
         }
         
         
         //cookies
         /*Cookies.set('myTableCon', myArray.slice(-1)[0], { expires: 7 });
         
         if(Cookies.get('myTableCon')) {
             //console.warn(Cookies.get('myTableCon'));
         }*/

         
         
         // get the new table content
         /*if(localStorage.getItem('newTBodyState')){           
             //$('#tabbedRows').empty().append(localStorage.getItem('newTBodyState'));
         }*/
    });
    
    // Reset localStorage and clear table
    $('#clear').on('click', function () {
        window.localStorage.clear();
        
        // Clear the Cookies
        Cookies.remove('myTableCon');
        myArray.length = 0;
        location.reload();        
        return false;
    });
    
    
   console.info(myArray[0]); 
    
});

