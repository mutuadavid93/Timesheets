<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EmployeeView.aspx.cs" Inherits="Pages.Layouts.Pages.EmployeeView" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <!-- CUSTOM CSS -->
    <!--<link type="text/css" rel="stylesheet" href="/_layouts/1033/STYLES/Timesheets/css/bootstrap.min.css" />
    <link type="text/css" rel="stylesheet" href="/_layouts/1033/STYLES/Timesheets/css/timeshit.css" /> -->
    <link href="../Bootstrap/jquery-ui-ippf/jquery-ui.theme.min.css" rel="stylesheet" />
    <link href="../Bootstrap/jquery-ui-ippf/jquery-ui.min.css" rel="stylesheet" />

    <link href="../Bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Bootstrap/css/timeshit.css" rel="stylesheet" />
    <!-- CUSTOM JS -->
    <script src="../Bootstrap/js/jquery.min.js" type="text/javascript"></script>
    <script src="../Bootstrap/js/moment.min.js"></script>
    

    <script src="../Bootstrap/jquery-ui-ippf/jquery-ui.min.js" type="text/javascript"></script>
    <script src="../Bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    
    <!-- JS for CSOM to work -->    
    <script src="/_layouts/init.js" type="text/javascript"></script>
    <script src="/_layouts/MicrosoftAjax.js" type="text/javascript"></script>
    <script src="/_layouts/sp.core.js" type="text/javascript"></script>
    <script src="/_layouts/sp.runtime.js" type="text/javascript"></script>
    <script src="/_layouts/sp.js" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="row-offcanvas row-offcanvas-right">
        <div class="container-fluid">
            <div class="col-xs-12 col-sm-12">
                <div class="row">
                    <div class="col-sm-12">
                        <br />
                        <div class="bounce">
                            <h4>Employee View</h4>
                        </div>
                    </div>
                </div><br />

                <div class="row">
                    <div class="col-sm-12">
                        <table class="table table-striped" id="empTabl">
                            <thead>
                                <tr>
                                    <th>Work Type</th>
                                    <th>Project</th>
                                    <th>Activity</th>
                                    <th>Task</th>
                                    <th>Challenges</th>
                                    
                                    <th>Sun</th>
                                    <th>Mon</th>
                                    <th>Tue</th>
                                    <th>Wed</th>
                                    <th>Thur</th>
                                    <th>Fri</th>
                                    <th>Sat</th>

                                    <th>Hours Worked</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>Project</td>
                                    <td>SharePoint Installation</td>
                                    <td>Training users on Azure and O365</td>
                                    <td>OK</td>
                                    <td>Not all users attened the training</td>
                                    <td>Monday</td>
                                    <td>2.00</td>
                                    <td>
                                        <button role="button" class="btn btn-info">
                                            <span class="glyphicon glyphicon-pencil"></span></button>
                                    </td>
                                </tr>
                            </tbody>

                            <tfoot>
                                <tr>
                                    <td colspan="8">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <textarea rows="6" class="form-control" 
                                                    placeholder="Any notes regarding the timesheet?"></textarea><br />

                                                <div class="checkbox">
                                                    <label>
                                                        <input type="checkbox" /> &nbsp; Submit your timesheet now?
                                                    </label>
                                                </div><br />

                                                <button role="button" class="btn btn-success hidden">
                                                    <span class="glyphicon glyphicon-floppy-disk"></span> &nbsp;Submit
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div><!-- col-xs-12 -->
        </div><!-- container-fluid -->
    </div><!-- row-offcanvas -->
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">

</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >

</asp:Content>
