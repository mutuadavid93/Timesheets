<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Appoverpage.aspx.cs" Inherits="Pages.Layouts.Pages.Appoverpage" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../Bootstrap/jquery-ui-ippf/jquery-ui.theme.min.css" rel="stylesheet" />
    <link href="../Bootstrap/jquery-ui-ippf/jquery-ui.min.css" rel="stylesheet" />
    <link href="../Bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Bootstrap/css/timeshit.css" rel="stylesheet" />

    <script src="../Bootstrap/js/jquery-1.12.4.min.js"></script>
    <script src="../Bootstrap/jquery-ui-ippf/jquery-ui.min.js"></script>

    <!-- JS for CSOM to work -->    
    <script src="/_layouts/init.js" type="text/javascript"></script>
    <script src="/_layouts/MicrosoftAjax.js" type="text/javascript"></script>
    <script src="/_layouts/sp.core.js" type="text/javascript"></script>
    <script src="/_layouts/sp.runtime.js" type="text/javascript"></script>
    <script src="/_layouts/sp.js" type="text/javascript"></script>
    <script src="../Bootstrap/js/date.js"></script>

    <script src="../Bootstrap/js/bootstrap.min.js"></script>
    <script src="../Bootstrap/js/approave.js"></script>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="row-offcanvas row-offcanvas-right">
         <section class="container-fluid">
             <div class="col-xs-12 col-sm-12">
                 <div class="row">
                <div class="col-sm-12">
                    <br />
                    <div class="bounce">
                        <h4>Approver's timesheet view</h4>
                    </div>
                </div>
            </div>
            <br />
            
            <div class="row">
                <div>
                    <div class="col-sm-3">
                        <span>Employee name</span>
                        <input type="text" class="myEMPloyee form-control" />
                        <input type="text" class="hidden taskRefIdNeeded" />
                        <input type="text" class="hidden taskNameNeeded" />
                    </div>
                    <div class="col-sm-3"></div>

                    <div class="col-sm-6">
                        <div class="row">
                            <div class="col-sm-6">
                                <span>StartDate</span>
                                <input type="text" class="myStartDateApp form-control" />
                            </div>
                            <div class="col-sm-6">
                                <span>EndDate</span>s
                                <input type="text" class="myEndDateApp form-control" />
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
                                
                                <th>SUN</th>
                                <th>MON</th>
                                <th>TUE</th>
                                <th>WED</th>
                                <th>THUR</th>
                                <th>FRI</th>
                                <th>SAT</th>

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

                                <td></td>
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
                                
                                <th>SUN</th>
                                <th>MON</th>
                                <th>TUE</th>
                                <th>WED</th>
                                <th>THUR</th>
                                <th>FRI</th>
                                <th>SAT</th>

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

                                <td></td>
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
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p><label class="reviwdates hidden">Reviewed by:</label> <span style="display: block;" id="approverName"></span></p>
                                                    <br />
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="row">
                                                        <div class="col-sm-3">
                                                            
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <p class="reviewing hidden"><label>Review date:</label> &nbsp;<span id="reviewDate" style="display:block;"></span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <span class="commentsLabel">Insert your comments below<span class='required'></span></span>
                                            <textarea id="approveComments" rows='6' class="form-control" placeholder="type your comments here about the work done"></textarea>
                                            
                                             <br />
                                            
                                            <button class="btn btn-success" role="button" id="approovData"><span class="glyphicon glyphicon-thumbs-up"></span>&nbsp; Approve </button>
                                            <button class="btn btn-danger" role="button" id="declineData"><span class="glyphicon glyphicon-thumbs-down"></span>&nbsp; Decline </button>

                                            <button class="btn btn-info pull-right hidden" role="button" id="redirectToMains">
                                                <span class="glyphicon glyphicon-remove"></span>&nbsp; Close</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
             </div>
        </section>
    </div>
   
            
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">

</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >

</asp:Content>
