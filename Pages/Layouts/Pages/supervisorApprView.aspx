<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="supervisorApprView.aspx.cs" Inherits="Pages.Layouts.Pages.supervisorApprView" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
     <link href="../Bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Bootstrap/css/mystyels.css" rel="stylesheet" />
    <link href="../Bootstrap/css/dateui.css" rel="stylesheet" />

    <script src="../Bootstrap/js/log.js"></script>
    <!-- JS for CSOM to work -->    
    <script src="/_layouts/init.js" type="text/javascript"></script>
    <script src="/_layouts/MicrosoftAjax.js" type="text/javascript"></script>
    <script src="/_layouts/sp.core.js" type="text/javascript"></script>
    <script src="/_layouts/sp.runtime.js" type="text/javascript"></script>
    <script src="/_layouts/sp.js" type="text/javascript"></script>

    <script src="../Bootstrap/js/bootstrap.min.js"></script>
    <script src="../Bootstrap/js/moment.min.js"></script>
    <script src="../Bootstrap/js/dateui.js"></script>
    <script src="../Bootstrap/js/datepicker.js" type="text/javascript"></script>
    <!--script src="../Bootstrap/js/appraisee.js"></!--script-->
    <script src="../Bootstrap/js/supervisorasppraisal.js"></script>

</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
      <section class="row-offcanvas row-offcanvas-right">
         <section class="container-fluid">
             <div class="row">
                <div class="col-sm-10 col-sm-offset-1">
                    <div class="panel-group" id="playlists" 
                            data-pdsa-collapser-name ="playlists"
                            data-pdsa-collapser-open="glyphicon glyphicon-plus" 
                            data-pdsa-collapser-close="glyphicon glyphicon-minus">
                        <div class="panel panel-default">
                            <div class="panel-heading" style="background-color: #d3d3d3;">
                                <h1 class="panel-title">
                                    <a href="#mytoprated" 
                                        data-toggle="collapse"
                                        data-parent="#playlists">GUIDING PRINCIPLES</a>
                                    <a href="#mytoprated"
                                        data-toggle="collapse"
                                        data-parent="#playlists" 
                                        class="pdsa-panel-toggle pull-right"></a>
                                </h1>
                            </div>
                            
                            <div id="mytoprated" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <ul type="square">
                                        <li>The principles guiding this appraisal tool arise from experience, knowledge, and values, on which we base our actions and thinking. They include fairness, equity, justice, integrity, truthfulness, diligence, honesty, compassion and true to self and others.</li>
                                        <li>Please refer to ‘Preparing for Your Performance and Development Review’ and for supervisors, ‘Preparing as a Supervisor to Hold a Performance and Development Review’ (shorten titles and annex the documents)</li>
                                    </ul>	
                                    <p>Your performance and development review covers your progress to date, your objectives for the coming year, and an agreement about any learning and development needs, together with a discussion about your general satisfaction. After the meeting this agreed and completed document is finalised as an official review with both sign offs.</p>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>

             <div class="row">
                 <div class="col-xs-12 col-sm-12">
                     <div class="row">
                        <div class="col-sm-10 col-sm-offset-1">
                            <article class="schedule">
                                <div class="tabbable tabs">
                                    <ul class="nav nav-tabs" id="mytabs">
                                        <li class="active"><a href="#monday" data-toggle="tab">SECTION 1</a></li>
                                        <li><a href="#tuesday" data-toggle="tab">SECTION 2</a></li>
                                        <li><a href="#wednesday" data-toggle="tab">SECTION 3</a></li>
                                        <li><a href="#thursady" data-toggle="tab">SECTION 4</a></li>
                                        <li><a href="#friday" data-toggle="tab">SECTION 5</a></li>
                                    </ul> <!-- nav nav-tabs -->
                                </div><!-- tabbable tabs -->

                                <section class="tab-content">
                                    <div class="tab-pane active" id="monday">
                                
                                        <table class="table table-bordered" id="sect1_Tbl">
                                            <caption class="matter">SECTION 1: PERFORMANCE REVIEW - OBJECTIVES</caption>

                                            <thead>
                                                <tr>
                                                    <th>Performance Objectives (as outlined in the APB)</th>
                                                    <th>Weighting (H, M, L)</th>
                                                    <th>Evidence of Achievement</th>
                                                    <th>Factors hindering achievements of the objectives</th>
                                                    <th>Self Rating</th>
                                                    <th>Manager’s Rating</th>
                                                    <th>Agreed Rating</th>
                                                </tr>
                                            </thead>
                                        <tbody class="section_one" id="this_section">
                                            <%--<tr id="sectone_row_1">
                                                <td class="performObj"></td> 
                                                <td class="weighting"></td>
                                                <td class="Evidence"></td>
                                                <td class="hinders"></td>
                                                <td class="selRating"></td>
                                                <td class="mgersRate"></td>
                                                <td class="agreedRate"></td>
                                            </tr>--%>
                                        </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="7">
                                                        <div class="row">
                                                            <div class="col-sm-6">
                                                                <button role="button" id="sect1_AddRow" class="hidden btn btn-info">
                                                                    <span class="glyphicon glyphicon-plus"></span>
                                                                    &nbsp; Add row
                                                                </button>
                                                            </div>
                                                            <div class="col-sm-6"></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                
                                        <p>&nbsp;</p>
                                        <table class="table borderless">
                                            <thead>
                                                <tr>
                                                    <th colspan="2">SIGNATURES</th>
                                                </tr>
                                            </thead>

                                            <tr>
                                                <td>(Signature indicates that the content of this assessment has been reviewed with the appraisee)</td>
                                                <td>&nbsp;</td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <label>Appraisee:</label>
                                                    <input class="form-control" id="userAppraisee" type="text" />
                                                </td>
                                                <td>
                                                    <label>Date: </label>
                                                    <input class="form-control performDate" id="appraiseDate" type="text" />
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <label>Immediate Supervisor: </label>
                                                    <input class="form-control" id="immediateManager" type="text" />
                                                </td>
                                                <td>
                                                    <label>Date: </label>
                                                    <input class="form-control performDate" id="superDate" type="text" />
                                                </td>
                                            </tr>

                                            <tr><td colspan="2"></td></tr>

                                            <tr>
                                                <td>
                                                    <label class="hidden">Next Level Supervisor (In case of disagreement): </label>
                                                    <input class="form-control hidden" type="text" />
                                                </td>
                                                <td>
                                                    <label class="hidden">Date: </label>
                                                    <input class="form-control performDate hidden" id="nextLevelDate" type="text" />
                                                </td>
                                            </tr>
                                        </table>
                                
                                        <div class="noteBetter">
                                            <p>NB:</p>
                                            <ul type="square">
                                                <li>Objectives should be weighted at Objective Setting Stage in line with the Change Goals (Unite, Deliver, and Perform).</li>
                                                <li>In case of disagreement on the scoring between the appraisee and the immediate supervisor the next level supervisor should be consulted and an amicable solution reached.</li>
                                            </ul>
                                        </div>

                                
                                        <button role="button" class="btn btn-success pull-right hidden">
                                            Next Section &nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</button>
                                    
                                        <button role="button" class="btn btn-success hidden">
                                            Save &nbsp;<span class="glyphicon glyphicon-"></span>&nbsp;</button>
                                    </div><!-- monday SECTION 1 END -->

                                    <div class="tab-pane" id="tuesday">
                                
                                        <table class="table table-bordered">
                                        <caption>
                                            <h5>SECTION 2: PERFORMANCE REVIEW - COMPETENCIES </h5><br />
                                            <em>(Evaluation team will consist of three Appraisers, two of whom should be from the same department or area of competency and another from a different unit that closely works with the Appraisee.)</em>
                                        </caption>

                                        <thead>
                                            <tr>
                                                <th>Competency Cluster</th>
                                                <th>Competency</th>
                                                <th>Specific Example</th>

                                                <th>1</th>
                                                <th>2</th>
                                                <th>Av. Score</th>
                                            </tr>
                                        </thead>
                                                                                   <tr>
                                        <td class="matter">Organisation Focus</td>
                                        <td class="col-md-3">
                                             <input class="form-control hidden" id="getPerformanceID" type="text" readonly />
                                            <strong>Creativity</strong>
                                            <ul>
                                                <li>This is about how we set vision and direction in the organization. It is our thinking skills including strategic vision and direction setting, championing innovation, problem solving and decision-making and our ability to learn from our experiences.</li>
                                            </ul>
                                        </td>

                                        <td>
                                            <textarea rows="8" id="activityExample" class="form-control" readonly></textarea>
                                        </td>
                                        <td>
                                            <input class="form-control" id="activityAppraisee" type="text" readonly />
                                        </td>
                                         <td>
                                            <input class="form-control" id="activitySupervisor" type="text" />
                                        </td>
                                         <td>
                                            <input class="form-control" id="activityAverage" type="text" readonly/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="matter">Execution</td>
                                        <td>
                                            <strong>Driving results</strong>
                                            <ul>
                                                <li>These two separate competencies measure our ability to get things done and to deliver. Driving results requires us to plan and organise, have drive and enthusiasm, communicate effectively and be results oriented.</li>
                                            </ul>
                                        </td>
                                        <td>
                                            <textarea rows="8" id="drivingExample" class="form-control" readonly></textarea>
                                        </td>
                                        <td>
                                            <input class="form-control" id="drivingAppraisee" type="text" readonly />
                                        </td>
                                         <td>
                                            <input class="form-control" id="drivingSupervisor" type="text" />
                                        </td>
                                         <td>
                                            <input class="form-control" id="drivingAverage" type="text" readonly/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="matter" style="border-bottom: 0px;"></td>
                                        <td>
                                            <strong>Leading and Management</strong>
                                            <ul>
                                                <li>In order to get things done we need to lead and manage staff including ourselves. This is demonstrated through leading / managing and team leading. Ensuring we manage performance. Managing projects, programmes and money. 
                                                    In addition we must develop self and others and be able to deliver and cope with change.</li>
                                            </ul>
                                        </td>

                                        <td>
                                            <textarea rows="8" id="managementExample" class="form-control" readonly></textarea>
                                        </td>
                                        <td>
                                            <input class="form-control" id="managementAppraisee" type="text" readonly />
                                        </td>
                                         <td>
                                            <input class="form-control" id="managementSupervisor" type="text" />
                                        </td>
                                         <td>
                                            <input class="form-control" id="managementAverage" type="text" readonly/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="matter">Taking People With You</td>
                                        <td>
                                            <strong>Collaborating Across Boundaries</strong>
                                            <ul>
                                                <li>This is about how we work with people both inside and outside IPPF. This includes respect for others, networking, global awareness, team working and consensus building through the organization.</li>
                                            </ul>
                                        </td>

                                        <td>
                                            <textarea rows="8" id="bounderiesExample" class="form-control" readonly></textarea>
                                        </td>
                                        <td>
                                            <input class="form-control" id="boundariesAppraisee" type="text" readonly />
                                        </td>
                                         <td>
                                            <input class="form-control" id="bounderiesSupervisor" type="text" />
                                        </td>
                                         <td>
                                            <input class="form-control" id="boudariesAverage" type="text" readonly/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="matter"></td>
                                        <td>
                                            <strong>Inspiring Others</strong>
                                            <ul>
                                                <li>This is about how we appeal to people’s emotions and are passionate about the work we do. It includes our passion and commitment, how we utilise volunteer contributions, our political acumen, 
                                                    the way in which we build support and fundraising.</li>
                                            </ul>
                                        </td>

                                        <td>
                                            <textarea rows="8" id="inspiringExample" class="form-control" readonly></textarea>
                                        </td>
                                        <td>
                                            <input class="form-control" id="inspirirngappraisee" type="text" readonly />
                                        </td>
                                         <td>
                                            <input class="form-control" id="inspiringSupervisor" type="text" />
                                        </td>
                                         <td>
                                            <input class="form-control" id="inspiringEvarage" type="text" readonly/>
                                        </td>
                                    </tr>

                                           
                                    </table>
                                
                                    <table class="table table-bordered">
                                        <caption>
                                            <strong>Overall Performance Assessment</strong> <br />
                                            <span style="color: red;"> HR will complete this section and return the form to you with your scores.</span>
                                        </caption>

                                        <tr>
                                            <td class="matter">Overall Assessment – Objectives (1 – 5):</td>
                                            <td class="matter">60%</td>
                                            <td class="matter">Overall Performance Assessment (1 – 5): </td>
                                            <td>&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td class="matter">Overall Assessment – Competencies (1 – 5):</td>
                                            <td class="matter">40%</td>
                                            <td class="matter">&nbsp;</td>
                                            <td>&nbsp;</td>
                                        </tr>
                                    </table>
                                
                                        <button role="button" class="btn btn-success pull-right">
                                            Next Section &nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</button>
                            
                                        <button role="button" id="saveperformanceReview" class="btn btn-success">
                                            Save &nbsp;<span class="glyphicon glyphicon-"></span>&nbsp;</button>
                                    </div><!-- tuesday SECTION TWO ENDS HERE-->
                            
                                    <div class="tab-pane" id="wednesday">
                                
                                        <table class="table table-bordered" id="section3_Tbl">
                                            <caption class="matter">SECTION 3: PLAN FOR NEXT REVIEW PERIOD</caption>

                                            <thead>
                                                <tr><th colspan="5" class="text-center">OBJECTIVES FOR THE NEXT PERFOMANCE REVIEW PERIOD</th></tr>
                                            </thead>

                                            <tr class="matter">
                                                <td>Objectives</td>
                                                <td>Weighting (H, M, L)</td>
                                                <td>Success Measures</td>
                                                <td>Timeline</td>
                                                <td>Support Needed</td>
                                            </tr>

                                          
                                       <tbody class="section_one" id="section3_3">
                                            <%--
                                                display items of next plans
                                            --%>
                                        </tbody>
                                            
                                        </table> 
                            
                                    </div><!-- wednesday  SECTION 3 ENDS HERE-->
                            
                                    <div class="tab-pane" id="thursady">
                                    <h5>SECTION 4: LEARNING AND DEVELOPMENT NEEDS</h5>
                                       
                                    <table class="table table-bordered" id="section4_Tbl">
                                        <thead>
                                            <th>Learning requirement</th>
                                            <th>Linked to objective or competency <br /></th>
                                            <th>Priority
                                               
                                            </th>
                                            <th>Specific opportunity sourced? 
                                           </th>
                                        </thead>

                                            
                                       <tbody class="section_one" id="section4_row_1">
                                              <%--
                                                display items of next plans
                                              --%>
                                        </tbody>
    
                                    </table>             
                                    </div><!-- thursday SECTION 4 ENDS HERE -->
                            
                                    <div class="tab-pane" id="friday">
                                        <h5 class="matter">SECTION 5: GENERAL OVERVIEW AND COMMENTS</h5>
                    
                                        <div class="row">
                                            <div class="col-sm-6">
                                            <span for="appraisee">Name of Appraisee:</span>
                                            <input type="text" class="form-control" id="appraisee" readonly />
                                        </div>
                                        <div class="col-sm-6">
                                            <span for="appraiseDates">Date:</span>
                                            <input type="text" class="form-control performDate" id="appraiseDates" readonly />
                                        </div>
                                        </div>
                                        <span for="appraise">Overall Comments: Appraisee</span>
                                        <textarea class="form-control" id="appraise" rows="5" readonly></textarea>
                                        <br />
    
                                        <div class="row"> 
                                        <div class="col-sm-4">
                                            <span for="superName">Name of Supervisor:</span>
                                            <input type="text" class="form-control" id="superName"  readonly />
                                        </div>
                                        <div class="col-sm-4">
                                            <span for="superDates">Date:</span>
                                            <input type="text" class="form-control performDate" id="superDates" readonly/>
                                        </div>
                                        <div class="col-md-4">
                                 <span for="reviewdate">Proposed Date of Review:</span>
                                 <input type="text" class="form-control  reviewdate performDate " id="reviewdate" />
                                     
                                    </div>
                                            
                                      </div>
                                        </br>
                                      <div class="row"> 
                                          <div class="col-md-12">
                                        <span for="super">Overall Comments: Supervisor:</span>
                                        <textarea class="form-control" id="super" rows="5"></textarea>
                                        </div>
                                       </div><br />
                                  <div class="row"> 
                                       <input type="text" class="form-control hidden  " id="getID" /><br />
                                       <div class="col-md-5">
                                                  <button role="button" class="btn btn-success" id="SuperviorComments">
                                            Submit &nbsp;<span class="glyphicon glyphicon-"></span>&nbsp;</button>
                                       </div>
                                 </div>
                             
                                        <br />
                                      </div><!-- friday SECTION 5 ENDS HERE -->
                            
                                </section><!-- tabbable tabs -->

                            </article> <!-- Schedule -->
                        </div><!-- col-sm-10 col-sm-offset-1 -->
                    </div><!-- row -->

                 </div><%--col-xs-12 col-sm-12--%>
             </div>
          </section><%--container-fluid--%>
    </div><%--row-offcanvas row-offcanvas-right--%>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    Supervisor View
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >
</asp:Content>
