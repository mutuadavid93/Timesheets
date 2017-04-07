using System;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Client;
using Microsoft.SharePoint.WebControls;
using Microsoft.SharePoint.Utilities;

namespace Pages.Layouts.Pages
{
    public partial class Timesheet : LayoutsPageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           SPSite site = SPContext.Current.Site;
           SPWeb web = SPContext.Current.Web;

            SPSecurity.RunWithElevatedPrivileges(delegate ()
            {
                using(SPSite curSite = new SPSite(SPContext.Current.Site.ID))
                {
                    using(SPWeb powerWeb = curSite.OpenWeb())
                    {
                        if (!IsPostBack)
                        {
                            SPUserCollection siteUsers = powerWeb.AllUsers;
                            foreach (SPUser logUser in siteUsers)
                            {
                                if(logUser.LoginName.ToUpper() != "")
                                {
                                    employeeLoginNames.Value = logUser.Name.ToUpper();
                                }
                            }// Username
                        }

                        //Get list item values from SharePoint lists.
                        SPList projects = powerWeb.Lists["LK_Projects"];
                        projectName.DataSource = projects.Items;
                        projectName.DataValueField = "ID";
                        projectName.DataTextField = "Title";
                        projectName.DataBind();
                    }
                }
            });

        }

        public static SPListItem ReloadListItem(SPListItem item)
        {
            if (item == null)
                return null;

            return item.ParentList.GetItemByUniqueId(item.UniqueId);
        }

        // Save Button Function
        public void Save(Object sender, EventArgs e)
        {
            var siteUrl = "http://svrarspdev01/sites/appcenter";
            using(ClientContext ctx = new ClientContext(siteUrl))
            {
                try
                {
                   /* var web = ctx.Web;
                    var list = web.Lists.GetByTitle("TimesheetGrid ");

                    var ici = new ListItemCreationInformation();
                    var item = list.AddItem(ici);

                    item["WorkType"] = "Project";
                    item["ProjectName"] = "SharePoint Installation";
                    item["Activity"] = "SHP Environment set up";
                    item["Challenges"] = "None";
                    item["Action"] = "No Action needed";

                    item["MON"] = */

                }
                catch(Exception ex)
                {

                }
            }
        }


    }
}
