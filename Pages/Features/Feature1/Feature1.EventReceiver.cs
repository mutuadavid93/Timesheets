using System;
using System.Runtime.InteropServices;
using System.Security.Permissions;
using Microsoft.SharePoint;

namespace Pages.Features.Feature1
{
    /// <summary>
    /// This class handles events raised during feature activation, deactivation, installation, uninstallation, and upgrade.
    /// </summary>
    /// <remarks>
    /// The GUID attached to this class may be used during packaging and should not be modified.
    /// </remarks>
    /// 

    [Guid("65db1229-bca4-401a-a1b7-f87f32bb6c42")]
    public class Feature1EventReceiver : SPFeatureReceiver
    {
        // Uncomment the method below to handle the event raised after a feature has been activated.
        
        public override void FeatureActivated(SPFeatureReceiverProperties properties)
        {
            SPSite spsite = properties.Feature.Parent as SPSite;
            if(spsite != null)
            {
                SPWeb web = spsite.RootWeb;

                SPContentType ct = web.ContentTypes["TimeSheetTaskList"];
                ct.EditFormUrl = "_layouts/15/Pages/Appoverpage.aspx";
                ct.DisplayFormUrl = "_layouts/15/Pages/Appoverpage.aspx";
                ct.Update(true);

                SPContentType empTaskListCT = web.ContentTypes["Emp_TaskListCT"];
                empTaskListCT.EditFormUrl = "_layouts/15/Pages/EmpView.aspx";
                empTaskListCT.DisplayFormUrl = "_layouts/15/Pages/EmpView.aspx";
                empTaskListCT.Update(true);

                SPContentType appraise = web.ContentTypes["AppraiseeTaskList"];
                appraise.EditFormUrl = "_layouts/15/Pages/Appraisee.aspx";
                appraise.DisplayFormUrl = "_layouts/15/Pages/Appraisee.aspx";
                appraise.Update(true);

               SPContentType Supervisor = web.ContentTypes["supervisorAppraisal"];
               Supervisor.EditFormUrl = "_layouts/15/Pages/supervisorApprView.aspx";
               Supervisor.DisplayFormUrl = "_layouts/15/Pages/supervisorApprView.aspx";
               Supervisor.Update(true);
            }            
        }


        // Uncomment the method below to handle the event raised before a feature is deactivated.

        //public override void FeatureDeactivating(SPFeatureReceiverProperties properties)
        //{
        //}


        // Uncomment the method below to handle the event raised after a feature has been installed.

        //public override void FeatureInstalled(SPFeatureReceiverProperties properties)
        //{
        //}


        // Uncomment the method below to handle the event raised before a feature is uninstalled.

        //public override void FeatureUninstalling(SPFeatureReceiverProperties properties)
        //{
        //}

        // Uncomment the method below to handle the event raised when a feature is upgrading.

        //public override void FeatureUpgrading(SPFeatureReceiverProperties properties, string upgradeActionName, System.Collections.Generic.IDictionary<string, string> parameters)
        //{
        //}
    }
}
