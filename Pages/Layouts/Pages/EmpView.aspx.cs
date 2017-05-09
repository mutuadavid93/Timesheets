using System;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace Pages.Layouts.Pages
{
    public partial class EmpView : LayoutsPageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SPSecurity.RunWithElevatedPrivileges(delegate ()
            {
                using (SPSite curSite = new SPSite(SPContext.Current.Site.ID))
                {
                    using (SPWeb powerWeb = curSite.OpenWeb())
                    {
                        if (!IsPostBack)
                        {
                            SPContext currentContext = SPContext.Current;
                            SPUserCollection siteUsers = powerWeb.AllUsers;
                            foreach (SPUser logUser in siteUsers)
                            {
                                if (currentContext != null && currentContext.Web.CurrentUser != null)
                                {
                                    string userName = SPContext.Current.Web.CurrentUser.Name;
                                    genRef_ID.Value = userName.ToUpper();
                                }
                            }

                            //Get list item values from SharePoint lists.
                            SPList projectz = powerWeb.Lists["LK_Projects"];
                            newproject.DataSource = projectz.Items;
                            newproject.DataValueField = "ID";
                            newproject.DataTextField = "Title";
                            newproject.DataBind();
                        }
                    }
                }
            });
        }
    }
}
