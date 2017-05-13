<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EmpView.aspx.cs" Inherits="Pages.Layouts.Pages.EmpView" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../Bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Bootstrap/css/print.css" rel="stylesheet" />
    <link href="../Bootstrap/css/style.css" rel="stylesheet" />
    <link href="../Bootstrap/css/timeshit.css" rel="stylesheet" />

    <script src="../Bootstrap/js/jquery-1.12.4.min.js"></script>
    <script src="../Bootstrap/js/moment.min.js"></script>

    <!-- JS for CSOM to work -->    
    <script src="/_layouts/init.js" type="text/javascript"></script>
    <script src="/_layouts/MicrosoftAjax.js" type="text/javascript"></script>
    <script src="/_layouts/sp.core.js" type="text/javascript"></script>
    <script src="/_layouts/sp.runtime.js" type="text/javascript"></script>
    <script src="/_layouts/sp.js" type="text/javascript"></script>
    <%--<script src="../Bootstrap/js/date.js"></script>--%>

    <script src="../Bootstrap/js/bootstrap.min.js"></script>
    <script src="../Bootstrap/js/employee.js"></script>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="row-offcanvas row-offcanvas-right">
         <section class="container-fluid">
             <div class="col-xs-12 col-sm-12">
                 <div class="row">
                     <div class="col-sm-12">
                        <button role="button" onclick="PrintDoc();" id="printBtn" class="hidden btn btn-default">
                            <span class="glyphicon glyphicon-print"></span> &nbsp; Print
                        </button>

                         <%-- Create the Modal Window --%>
                         <!-- Modal -->
                        <div class="modal fade" id="modal" tabindex="-1">
                            <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="myModalLabel">Update item</h4>
                                </div>
                                <div class="modal-body">
                                    <label></label>
                                
                                    <div class="form-group">
                                      <label class="" for="project">Project name</label>
                                      <input type="text" class="form-control" id="project">
                                    </div>
                                    <div class="form-group">
                                        <label class="" for="act">Activity</label>
                                        <textarea class="form-control" rows="3" id="act"></textarea>
                                    </div>
                                    <div class="form-group">
                                      <label class="" for="chall">Challenges</label>
                                      <textarea class="form-control" rows="3" id="chall"></textarea>
                                    </div>
                                    <div class="form-group">
                                      <label class="" for="task">Task</label>
                                      <input type="text" class="form-control" id="task">
                                    </div>

                                    <table class="table-striped">                            
                                        <thead>
                                            <tr>
                                                <th>MON</th>
                                                <th>TUE</th>
                                                <th>WED</th>
                                                <th>THUR</th>
                                                <th>FRI</th>
                                                <th>SAT</th>
                                                <th>SUN</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr id="myrowed">
                                                <td>
                                                    <input type="text" class="form-control" id="mond" />
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control" id="tuesd" />
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control" id="weds" />
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control" id="thurs" />
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control" id="frids" />
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control" id="sats" />
                                                </td>
                                                <td>
                                                    <input type="text" class="form-control" id="sunds" />
                                                </td>
                                            </tr>
                                        </tbody>
                                </table>

                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" id="saveFromPopUp" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                            </div>
                        </div>

                        <p>&nbsp;</p>
                     </div>
                 </div>

                 <%-- start modal two--%>

                 <div class="modal fade" id="addnewtask-modal" tabindex="-1" role="dialog">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Add new timesheet task</h4>
                      </div>
                      <div class="modal-body">
                        
                          <div class="form-group">
                            <label class="" for="worktyped">Work type</label>
                            <select class="form-control" id="worktyped">
                                <option value="Project">Project</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <%--<label class="" for="newproject">Project</label>
                            <select class="form-control" id="newproject">
                                <option value="SharePoint Installation">SharePoint Installation</option>
                                <option value="SQL Configuration">SQL Configuration</option>
                            </select>--%>
                            <asp:DropDownList id="newproject" AppendDataBoundItems="true" runat="server" CssClass="form-control projectName required" data-msg-required="Please select patient's prefered language.">
                                    <asp:ListItem Value="" Selected="True">Choose project name</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    
                        <div class="form-group">
                            <label class="" for="newactivity">Activity</label>
                            <input type="text" class="form-control" id="newactivity" placeholder="Activity" />
                        </div>
                    
                        <div class="form-group">
                            <label class="" for="newtask">Task</label>
                            <input type="text" class="form-control" id="newtask" placeholder="New Task" />
                        </div>
                    
                        <div class="form-group">
                            <label class="" for="newchallenges">Challenges</label>
                            <textarea class="form-control" placeholder="Task Challenges" id="newchallenges" rows="3"></textarea>
                        </div>
                    
                        <div class="form-group">
                            <label class="" for="newday">Day</label>
                            <select id="newday" class="form-control">
                                    <option value="" selected>Choose Day</option>
                                    <option value="1">MON</option>
                                    <option value="2">TUE</option>
                                    <option value="3">WED</option>
                                    <option value="4">THUR</option>
                                    <option value="5">FRI</option>
                                    <option value="6">SAT</option>
                                    <option value="7">SUN</option>
                                </select>
                        </div>
                    
                        <div class="form-group">
                            <label class="" for="newworkedhrs">Hours Worked</label>
                            <input type="text" maxlength="2" class="form-control" id="newworkedhrs" placeholder="Number of Worked Hours" />
                        </div>

                      </div> <%--modal-body--%>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" id="submitnewtask" class="btn btn-primary">Submit</button>
                      </div>
                    </div><!-- /.modal-content -->
                  </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->

                 

                 <%-- end modal two--%>

                  <%-- START DEAD HIDDEN HOLDERS--%>
                 <div class="form-group">
                    <input type="text" class="form-control newtaskname hidden" />
                </div>
                    <div class="form-group">
                    <input type="text" class="form-control newtaskrefid hidden" />
                </div>

                    <div class="form-group">
                    <input type="text" class="form-control newtaskStartDate hidden" />
                </div>
                    <div class="form-group">
                    <input type="text" class="form-control newtaskDueDate hidden" />
                </div>

                    <div class="form-group">
                    <input type="text" class="form-control taskStartDate hidden" />
                </div>
                   <label class="emptaskstatus_real hidden"></label>
                 <%--END DEAD HIDDEN HOLDERS--%>

         <div id="printarea">
            <div class="row">
                <div class="col-sm-12">
                    <br />
                    <div class="bounce">
                        <h4>Employee's timesheet view</h4>
                    </div>
                </div>
            </div>
            <br />
            
             <div id="masterpage_container">
                 <div class="row">
                <div>
                    <div class="col-sm-3">
                        <span>Employee name</span>
                        <%--<input type="text" class="myEMPloyee form-control" />--%>
                        <span class="myEMPloyee" style="display:block;"></span>
                        <input type="text" class="hidden taskRefIdNeeded" />
                        <input type="text" class="hidden taskNameNeeded" />
                        <input type="text" class="hidden genRef_ID" id="genRef_ID" runat="server" />
                    </div>
                    <div class="col-sm-3"></div>

                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-sm-6">
                                <span>StartDate</span>
                                <%--<input type="text" class="myStartDateApp form-control" />--%>
                                <span class="myStartDateApp" style="display:block;"></span>
                            </div>
                            <div class="col-sm-6">
                                <span>EndDate</span>
                                <%--<input type="text" class="myEndDateApp form-control" />--%>
                                <span class="myEndDateApp" style="display:block;"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <p>&nbsp;</p>
            </div><!-- row -->
            
            <div class="row">
                <div class="col-sm-12">

                    <table class="table table-striped" id="approvedTbl">
                        <caption><strong>PROJECT</strong></caption>
                        <thead>
                            <tr>
                                <th>Project name</th>
                                <th>Activity</th>
                                <th>Challenges</th>
                                <th>TASK</th>
                                
                                
                                <th>MON</th>
                                <th>TUE</th>
                                <th>WED</th>
                                <th>THUR</th>
                                <th>FRI</th>
                                <th>SAT</th>
                                <th>SUN</th>

                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        
                        <tbody id="approverTbody"></tbody>
                        <tfoot>
                            <tr>
                                <td><strong>Project Worked Hours</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>

                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                                <td col width="30">&nbsp;</td>
                            </tr>
                        </tfoot>
                        
                    </table>
                    

                    <br />
                    <table class="table table-striped" id="generaliZed">
                        <caption><strong>GENERAL WORKING HOURS</strong></caption>
                        <thead>
                            <tr>
                                <th>General work</th>
                                <th>Activity</th>
                                <th>Challenges</th>
                                <th>TASK</th>
                                
                                
                                <th>MON</th>
                                <th>TUE</th>
                                <th>WED</th>
                                <th>THUR</th>
                                <th>FRI</th>
                                <th>SAT</th>
                                <th>SUN</th>

                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        
                        <tbody id="generalBody"></tbody>
                        <tfoot>
                            <tr id="gen_tr_id">
                                <td><strong>General Worked Hours</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>

                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                                <td col width="30">&nbsp;</td>
                            </tr>
                            <tr><td colspan="12">&nbsp;</td></tr>
                            <tr id="bothGridsSummed">
                                <td><strong>Project and General Hours Total</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>

                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                                <!--<td id="workedHOURS></td>-->
                                <td></td>
                            </tr>

                            <tr>
                                <td colspan="12">
                                    <div class="row">
                                        <div class='col-sm-12'>
                                            <br />
                                            
                                            <button class="btn btn-info" id="addNewTaskBtn">
                                                <span class="glyphicon glyphicon-plus"></span> New task
                                            </button><br /><br />
                                            <p>&nbsp;</p>

                                            <span class="commentsLabel">Insert your comments below<span class='required'></span></span>
                                            <textarea id="approveComments" rows='6' class="form-control" placeholder="type your comments here about the work done"></textarea>
                                            
                                             <br />
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <button class="btn btn-success hidden" role="button" id="userConfirmSubmit">Submit&nbsp; 
                                                <span class="glyphicon glyphicon-send"></span>
                                            </button>
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox" />
                                                    &nbsp; Do you want to sumit?
                                                </label>
                                            </div><!-- checkbox -->
                                        </div>
                                        <div class="col-sm-6">
                                            <button class="btn btn-danger pull-right" role="button" id="closeSubmit">Close&nbsp; 
                                                <span class="glyphicon glyphicon-remove"></span>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
             </div><%--masterpage_container--%>
            
        </div><!-- printarea -->
    </div><!-- col-xs-12 col-sm-12 -->

        </section>
    </div>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">

</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >

</asp:Content>
