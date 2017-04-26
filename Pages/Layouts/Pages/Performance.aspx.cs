using System;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;
using Microsoft.Office.Server;
using Microsoft.Office.Server.Administration;
using Microsoft.Office.Server.UserProfiles;



namespace Pages.Layouts.Pages
{
    public partial class Performance : LayoutsPageBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SPSecurity.RunWithElevatedPrivileges(delegate ()
            {
                string accountName = string.Empty;

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
                                    fullname.Value = userName.ToUpper();

                                    //string strUserName = SPContext.Current.Web.CurrentUser.LoginName;

                                }
                            }

                            DateTime today = DateTime.Today;
                            performDate.Value = today.ToString("MM/dd/yyyy");
                        }// isPostBack
                    }
                }
            }); //SPSecurity

            // Instantiates the User Information List 
            //SPList userInformationList = SPContext.Current.Web.SiteUserInfoList;
            //SPContext.Current.Web.AllowUnsafeUpdates = true;

            //// Get the current user 
            //SPUser user = SPContext.Current.Web.EnsureUser(@"ar\spadmin");

            //// The actual User Information is within this ListItem 
            //SPListItem userItem = userInformationList.Items.GetItemById(user.ID);
            //jobTitle.Value = userItem["Last Name"].ToString();
            ////TextBox3.Text = userItem["Work email"].ToString();
            //supervisorMgr.Value = userItem["Manager"].ToString();
            ////TextBox4.Text= userItem["Picture"].ToString();

            //SPContext.Current.Web.AllowUnsafeUpdates = false;
        }
    }
}
