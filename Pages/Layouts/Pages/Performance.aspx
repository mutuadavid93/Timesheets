<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Performance.aspx.cs" Inherits="Pages.Layouts.Pages.Performance" DynamicMasterPageFile="~masterurl/default.master" %>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <link href="../Bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Bootstrap/css/mystyels.css" rel="stylesheet" />

    <script src="../Bootstrap/js/log.js"></script>
    <!-- JS for CSOM to work -->    
    <script src="/_layouts/init.js" type="text/javascript"></script>
    <script src="/_layouts/MicrosoftAjax.js" type="text/javascript"></script>
    <script src="/_layouts/sp.core.js" type="text/javascript"></script>
    <script src="/_layouts/sp.runtime.js" type="text/javascript"></script>
    <script src="/_layouts/sp.js" type="text/javascript"></script>


    <script src="../Bootstrap/js/bootstrap.min.js"></script>
    <script src="../Bootstrap/js/moment.min.js"></script>
    <script src="../Bootstrap/js/masterscript.js"></script>
    <script src="../Bootstrap/js/perform.js"></script>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div class="row-offcanvas row-offcanvas-right">
        <div class="container-fluid">
            <div class="col-xs-12 col-sm-12">
            <div class="row">
                <div class="col-sm-10 col-sm-offset-1">
                    <div class="leaveHeading">
                        <h4>Submit a Performance Appraisal</h4>
                    </div>
                </div>
            </div><br />
            
            <div class="row">
                <div class="col-sm-10 col-sm-offset-1">

                    <label class="ObjectRefIDHere hidden"></label>
                    
                        <table class="table borderless">
                            <tr>
                                <td>Name:</td>
                                <td><input id="fullname" class="form-control fullname" runat="server" type="text" /></td>

                                <td>Date:</td>
                                <td><input runat="server" class="form-control performDate" id="performDate" type="text" /></td>
                            </tr>

                            <tr>
                                <td>Job Title:</td>
                                <td><input class="form-control" runat="server" id="jobTitle" type="text" /></td>

                                <td>Supervisor:</td>
                                <td><input class="form-control" id="supervisorMgr" runat="server" type="text" /></td>
                            </tr>

                            <tr>
                                <td>Period of review:</td>
                                <td><input class="form-control startYear" placeholder="1 January 20XX – 31 December 20XX" type="text" /></td>
                            </tr>
                        </table>
                </div>
            </div>
                    
            <div class="row">
                <div class="col-sm-8 col-sm-offset-2">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th colspan="3" class="text-center">Definition of Appraisal Assessments</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Below Standard</td>
                                    <td>Important performance standards not met</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Partially Achieves Standard</td>
                                    <td>Does not meet all the performance standards set</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Fully Achieves Standard</td>
                                    <td>Meets the performance standards set</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Exceeds Standard Some</td>
                                    <td>Meets all performance standards(exceeds)</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Outstanding</td>
                                    <td>Greatly exceeds performance standards</td>
                                </tr>
                            </thead>
                        </table>
                    
                </div>
            </div>
            
             
            
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
            
            
            
            <!-- ### BEGIN THE TABS REGION -->
            <div class="row">
                <div class="col-sm-10 col-sm-offset-1">
                    <article class="schedule">
                        <div class="tabbable tabs">
                            <ul class="nav nav-tabs">
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
                                <tbody class="section_one" id="section_one">
                                    <tr id="sectone_row_1">
                                        <td>
                                            <input type="text" class="form-control performObj" runat="server" />
                                        </td> 
                                        <td>
                                            <input type="text" class="form-control weighting" runat="server" />
                                        </td>
                                        <td>
                                            <input type="text" class="form-control Evidence" runat="server" />
                                        </td>
                                        <td>
                                            <input type="text" class="form-control hinders" runat="server" />
                                        </td>
                                        <td>
                                            <input type="text" class="form-control selRating" runat="server" />
                                        </td>
                                        <td>
                                            <input type="text" class="form-control mgersRate" runat="server" />
                                        </td>
                                        <td>
                                            <input type="text" class="form-control agreedRate" runat="server" />
                                        </td>
                                    </tr>
                                </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="7">
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <button role="button" id="sect1_AddRow" class="btn btn-info">
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

                                
                                <button role="button" class="btn btn-success pull-right">
                                    Next Section &nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</button>
                                    
                                <button role="button" class="btn btn-success" id="saveSectOne">
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
                                            <strong>Creativity</strong>
                                            <ul>
                                                <li>This is about how we set vision and direction in the organization. It is our thinking skills including strategic vision and direction setting, championing innovation, problem solving and decision-making and our ability to learn from our experiences.</li>
                                            </ul>
                                        </td>

                                        <td>
                                            <textarea rows="8"  class="form-control"></textarea>
                                        </td>
                                        <td>
                                            <input class="form-control" type="text" />
                                        </td>
                                         <td>
                                            <input class="form-control" type="text" readonly/>
                                        </td>
                                         <td>
                                            <input class="form-control" type="text" readonly/>
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
                                            <textarea rows="8" class="form-control"></textarea>
                                        </td>
                                        <td>
                                            <input class="form-control" type="text" />
                                        </td>
                                         <td>
                                            <input class="form-control" type="text" readonly/>
                                        </td>
                                         <td>
                                            <input class="form-control" type="text" readonly/>
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
                                            <textarea rows="8"  class="form-control"></textarea>
                                        </td>
                                        <td>
                                            <input class="form-control" type="text" />
                                        </td>
                                         <td>
                                            <input class="form-control" type="text" readonly/>
                                        </td>
                                         <td>
                                            <input class="form-control" type="text" readonly/>
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
                                            <textarea rows="8"  class="form-control"></textarea>
                                        </td>
                                        <td>
                                            <input class="form-control" type="text" />
                                        </td>
                                         <td>
                                            <input class="form-control" type="text" readonly/>
                                        </td>
                                         <td>
                                            <input class="form-control" type="text" readonly/>
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
                                            <textarea rows="8" class="form-control"></textarea>
                                        </td>
                                        <td>
                                            <input class="form-control" type="text" />
                                        </td>
                                         <td>
                                            <input class="form-control" type="text" readonly/>
                                        </td>
                                         <td>
                                            <input class="form-control" type="text" readonly/>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="matter"></td>
                                        <td class="text-center">
                                            <strong>Overall Average Score</strong>
                                            <p>&nbsp;</p>
                                        </td>

                                        <td>
                                            
                                        </td>
                                        <td>
                                            
                                        </td>
                                         <td>
                                            
                                        </td>
                                         <td>
                                            
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
                            
                                <button role="button" class="btn btn-success">
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

                                    <tbody id="section_three">
                                        <tr id="section3_row_1">
                                            <td>
                                                <input class="objectives form-control" type="text" />
                                            </td>
                                            <td>
                                                <input class="weighing form-control" type="text" />
                                            </td>
                                            <td>
                                                <input class="measures form-control" type="text" />
                                            </td>
                                            <td>
                                                <input class="timeline form-control" type="text" />
                                            </td>
                                            <td>
                                                <input class="supportneeded form-control" type="text" />
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="5">
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <button role="button" id="sect3_AddRow" class="btn btn-info">
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
                                
                                
                                <button role="button" class="btn btn-success pull-right">
                                    Next Section &nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</button>
                            
                                <button role="button" class="btn btn-success" id="saveSectionThree">
                                        Save &nbsp;<span class="glyphicon glyphicon-"></span>&nbsp;</button>
                            
                            </div><!-- wednesday  SECTION 3 ENDS HERE-->
                            
                            <div class="tab-pane" id="thursady">
                            <h5>SECTION 4: LEARNING AND DEVELOPMENT NEEDS</h5>
                                <p>What learning and development, support, coaching, etc, will help you to achieve your objectives, whether they are objectives or competencies?  In particular, how can your Supervisor help?  Be as specific as you can.</p>
                                <p>Keep in mind the range of learning opportunities available:</p>

                                <br />

                                <div class="row">
                                    <div class="col-sm-3">
                                        <p>Coaching</p>
                                        <p>Conferences</p>
                                        <p>Courses - internal/external</p>
                                        <p>Knowledge Bank</p>
                                        <p>Mentoring</p>
                                    </div>

                                    <div class="col-sm-3">
                                        <p>On the job learning</p>
                                        <p>Other NGOs/organisations</p>
                                        <p>Projects</p>
                                        <p>Professional Groups</p>
                                        <p>Secondment</p>
                                    </div>

                                    <div class="col-sm-3">
                                        <p>Self-managed learning </p>
                                        <p>Seminars/Workshops</p>
                                        <p>Shadowing in/out Unit</p>
                                        <p>Study Support</p>
                                        <p>Surgeries/Action Learning Sets</p>
                                    </div>

                                    <div class="col-sm-3"></div>
                                </div> 
                                
                            <table class="table table-bordered" id="section4_Tbl">
                                <thead>
                                    <th>Learning requirement</th>
                                    <th>Linked to objective or competency? <br />
                                        <em>(Please specify which, e.g. objective (3) or Driving Results)</em>
                                    </th>
                                    <th>Priority <br />
                                        <em>(Please specify - required for role; maintenance; stretch; career development)</em>
                                    </th>
                                    <th>Specific opportunity sourced? <br />
                                        <em>If you know of a specific opportunity eg a particular course that would meet this learning need please specify here</em>
                                    </th>
                                </thead>

                                <tbody id="section_four">
                                    <tr id="section4_row_1">
                                        <td>
                                            <input type="text" class="rqrement form-control" />
                                        </td>
                                        <td>
                                            <input type="text" class="competency form-control" />
                                        </td>
                                        <td>
                                            <input type="text" class="priority form-control" />
                                        </td>
                                        <td>
                                            <input type="text" class="opportunity form-control" />
                                        </td>
                                    </tr>
                                </tbody>
                                
                                <tfoot>
                                        <tr>
                                            <td colspan="4">
                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <button role="button" id="sect4_AddRow" class="btn btn-info">
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
                              
                                <button role="button" class="btn btn-success pull-right">
                                    Next Section &nbsp;<span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</button>
                            
                                <button role="button" class="btn btn-success" id="saveSectionFour">
                                        Save &nbsp;<span class="glyphicon glyphicon-"></span>&nbsp;</button>
                            </div><!-- thursday SECTION 4 ENDS HERE -->
                            
                            <div class="tab-pane" id="friday">
                                
                                <h5 class="matter">SECTION 5: GENERAL OVERVIEW AND COMMENTS</h5>
                    
                                <p>Please note down any specific issues or areas of concern. For example, your current level of satisfaction with role, what your Supervisor can do to support you effectively over the next year, effectiveness of communication across your team/Division/CO/RO etc.</p>
                                
                                <label for="appraise">Overall Comments: Appraisee</label>
                                <textarea class="form-control" id="appraise" rows="5"></textarea>
                                <br />

                                <label for="super">Overall Comments: Supervisor:</label>
                                <textarea class="form-control" id="super" rows="5"></textarea>

                                <br />
                                <p>
                                    Please finalise the Performance Assessment after the Performance and Development Review meeting has taken place. Please add your name below to agree that this is an accurate and agreed record of performance to date and plans for the future.
                                </p>
                                
                                <div class="row">
                                <div class="col-sm-3">
                                    <label for="appraisee">Name of Appraisee:</label>
                                    <input type="text" class="form-control" id="appraisee" />
                                    <input type="text" class="form-control hidden" id="appraiseeLoginName" />
                                </div>
                                <div class="col-sm-3">
                                    <label for="appraiseDates">Date:</label>
                                    <input type="text" class="form-control performDate" id="appraiseDates" />
                                </div>


                                <div class="col-sm-3">
                                    <label for="superName">Name of Supervisor:</label>
                                    <input type="text" class="form-control" id="superName" />
                                    <input type="text" class="form-control hidden" id="superLoginName" />
                                </div>
                                <div class="col-sm-3">
                                    <label for="superDates">Date:</label>
                                    <input type="text" class="form-control performDate" id="superDates" />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-3"></div>
                                <br />
                            </div>
                                
                                <button role="button" class="btn btn-success pull-right" id="saveSectionFive">
                                    Submit &nbsp;<span class="glyphicon glyphicon-floppy-disk"></span>&nbsp;</button>
                            
                            </div><!-- friday SECTION 5 ENDS HERE -->
                            
                        </section><!-- tabbable tabs -->

                    </article> <!-- Schedule -->
                </div><!-- col-sm-10 col-sm-offset-1 -->
            </div><!-- row -->
            <!-- ### END THE TABS REGION -->
            </div><%--col-xs-12 col-sm-12--%>
            </div><%--container-fluid--%>
        </div><%--row-offcanvas row-offcanvas-right--%>
    
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
Application Page
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server" >

</asp:Content>
