<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Grid.aspx.cs" Inherits="Pages.Layouts.Pages.Grid" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../Bootstrap/css/bootstrap.min.css" rel="stylesheet" />

    <script src="../Bootstrap/js/jquery.min.js" type="text/javascript"></script>
    <script src="../Bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="/_layouts/init.js" type="text/javascript"></script>
    <script src="/_layouts/MicrosoftAjax.js" type="text/javascript"></script>
    <script src="/_layouts/sp.core.js" type="text/javascript"></script>
    <script src="/_layouts/sp.runtime.js" type="text/javascript"></script>
    <script src="/_layouts/sp.js" type="text/javascript"></script>

    <script src="../Bootstrap/js/mightySHP.js" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <p>&nbsp;</p>
    <div class="container-fluid">
        <div id="div_id_1" class="div_class_1">
            <table id="real_tbl" class="table table-striped">
                <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>CertName</th>
                        <th>CertId</th>
                    </tr>
                </thead>
                <tbody id="tbody_id">
                    <tr id="row_id_1">
                        <td><br /><input type="text" class="vendor form-control" /></td>
                        <td><br /><input type="text" class="certname form-control" /></td>
                        <td><br /><input type="text" class="certid form-control" /></td>
                    </tr>
                </tbody>
            </table>

            <div>
                <button id="addRowBtn" type="button" class="btn btn-success" width="10" height="10">
                    <span class="glyphicon glyphicon-plus"></span> &nbsp; Add row
                </button>
                  &nbsp;&nbsp;
                <button id="saveItemBtn" type="button" class="btn btn-success">&nbsp; 
                    <span class="glyphicon glyphicon-floppy-disk"></span> Save
                </button>
            </div>
        </div>
    </div>
    
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Application Page
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
My Application Page
</asp:Content>
