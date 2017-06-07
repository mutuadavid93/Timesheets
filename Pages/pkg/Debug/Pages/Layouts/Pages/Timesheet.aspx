<%@ Assembly Name="Pages, Version=1.0.0.0, Culture=neutral, PublicKeyToken=4a0f57048647858e" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Timesheet.aspx.cs" Inherits="Pages.Layouts.Pages.Timesheet" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <!-- CUSTOM CSS -->
    <!--<link type="text/css" rel="stylesheet" href="/_layouts/1033/STYLES/Timesheets/css/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet" href="/_layouts/1033/STYLES/Timesheets/css/timeshit.css" /> -->
    <link href="../Bootstrap/jquery-ui-ippf/jquery-ui.theme.min.css" rel="stylesheet" />
    <link href="../Bootstrap/jquery-ui-ippf/jquery-ui.min.css" rel="stylesheet" />

    <link href="../Bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Bootstrap/css/timeshit.css" rel="stylesheet" />
    <!-- CUSTOM JS 
        
    <script src="/_layouts/1033/styles/Timesheets/js/jquery.min.js" type="text/javascript"></script>
    <script src="/_layouts/1033/styles/Timesheets/js/bootstrap.min.js" type="text/javascript"></script>
        -->
    <script src="../Bootstrap/js/jquery.min.js" type="text/javascript"></script>
    <script src="../Bootstrap/js/log.js"></script>
    <%--<script src="../Bootstrap/js/date.js"></script>--%>
    <script src="../Bootstrap/js/moment.min.js"></script>
    

    <script src="../Bootstrap/jquery-ui-ippf/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../Bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    
    <!-- JS for CSOM to work -->    
    <script src="/_layouts/init.js" type="text/javascript"></script>
    <script src="/_layouts/MicrosoftAjax.js" type="text/javascript"></script>
    <script src="/_layouts/sp.core.js" type="text/javascript"></script>
    <script src="/_layouts/sp.runtime.js" type="text/javascript"></script>
    <script src="/_layouts/sp.js" type="text/javascript"></script>
    <script src="../Bootstrap/js/timepush.js"></script>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <!-- HTML MARKUP HERE BUDDY -->
    <div class="row-offcanvas row-offcanvas-right">
        <div class="container-fluid">
            <div class="col-xs-12 col-sm-12">
                <div class="row">
                    <div class="col-sm-12">
                        <br />
                        <div class="bounce">
                            <h4>New Timesheet</h4>
                        </div>
                    </div>
                </div><br />

                <div class="row">
                    <div>
                        <div class="col-sm-3">
                            <span>Employee name</span>
                            <input id="employeeLoginNames" type="text" class="form-control employeeLoginNames" runat="server" />

                            <!--<input class="form-control" id="empName" />-->
                        </div>
                        <div class="col-sm-3"></div>

                        <div class="col-sm-6">
                            <div class="row">
                                <div class="col-sm-6">
                                    <span>StartDate</span>
                                    <input id="timeshitStartDate" type="text" class="form-control timeshitStartDate performDate" runat="server" />

                                </div>
                                <div class="col-sm-6">
                                    <span>EndDate</span>
                                    <input class="form-control performDate timeshitEndDate" type="text" id="timeshitEndDate" runat="server" />
                                </div>
                            </div>
                        </div>
                    </div>
               </div><!-- row -->
            
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-striped" id="myTable">
                    <col width="130" />
                    <thead><tr>
                            <th>Work Type</th>
                            <th>Project</th>
                            <th>Task</th>
                            <th>Action</th>
                            <th>Challenges</th>
                            <th>Day</th>
                            <th>Hours Worked</th>

                        <th class="hidden">StartDate</th>
                        <th class="hidden">EndDate</th>
                        <th class="hidden">Employee</th>
                    </tr></thead>
                        
                    <tbody id="killerTBody" class="killerTBody" runat="server">
                        <tr id="myrow_id_1">
                            <td>
                                <%--<select id="WorkType" class="form-control WorkType">
                                    <option value="General">General</option>
                                    <option value="Project" selected=>Project</option>
                                </select>--%>
                                <asp:DropDownList ID="WorkType" AppendDataBoundItems="true" runat="server" CssClass="form-control WorkType required">
                                    <asp:ListItem Value="Project">Project</asp:ListItem>
                                    <asp:ListItem Value="General">General</asp:ListItem>
                                </asp:DropDownList>
                            </td>     
                            <td>
                                <asp:DropDownList ID="projectName" AppendDataBoundItems="true" runat="server" CssClass="form-control projectName required" data-msg-required="Please select patient's prefered language.">
                                    <asp:ListItem Value="" Selected="True">Choose</asp:ListItem>
                                </asp:DropDownList>
                            </td>
                                
                            <td>
                                <textarea class="form-control Activity" id="Activity" runat="server"></textarea>
                            </td>
                            <td>
                                <textarea class="form-control Action" runat="server" id="Action"></textarea>
                            </td>
                            <td>
                                <textarea class="form-control Challenges" id="Challenges" runat="server"></textarea>
                            </td>
                                
                            <td>
                                <select id="dayTextReqrd" class="form-control day">
                                    <option value="" selected>Choose Day</option>
                                    <option value="1">MON</option>
                                    <option value="2">TUE</option>
                                    <option value="3">WED</option>
                                    <option value="4">THUR</option>
                                    <option value="5">FRI</option>
                                    <option value="6">SAT</option>
                                    <option value="7">SUN</option>
                                </select>
                            </td>
                                
                            <td>
                                <input type="text" class="form-control WorkedHours" id="WorkedHours" runat="server" maxlength="2"/>
                            </td>

                            <td>
                              <input ID="StartDate" type="text" class="form-control hidden StartDate" runat="server" />
                            </td>
                            <td>
                              <input ID="EndDate" type="text" class="form-control hidden EndDate" runat="server" />
                            </td>
                            <td>
                              <input ID="EmployeeName" type="text" class="form-control hidden EmployeeName" runat="server" />
                            </td>
                        </tr>
                    </tbody>
                        
                    <tfoot>
                        <tr>
                            <td colspan="9">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <button id="stampRow" role="button" class="btn btn-info"><span class="glyphicon glyphicon-plus-sign"></span> Add row</button>
                                        <button class="btn btn-success" role="button" id="saveRowData"><span class="glyphicon glyphicon-floppy-disk"></span>&nbsp; Save </button>
                                
                                    </div>
                                    <div class="col-sm-6">
                                        <button class="pull-right btn btn-danger hidden" role="button" id="refreshPage"><span class="glyphicon glyphicon-remove"></span>&nbsp; Clear table </button>
                                        </div>
                                </div>

                            </td>
                        </tr>
                    </tfoot>
                </table>
                    
            </div>
        </div>
            
        <div class="row">
            <div class="col-sm-12">
                   
            </div> 
        </div>
    </div>
            </div><!-- col-xs-12 -->
        
</div><!-- row-offcanvas -->


</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">

</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >

</asp:Content>
