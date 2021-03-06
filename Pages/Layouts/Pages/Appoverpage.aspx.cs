﻿using System;
using Microsoft.SharePoint;
using Microsoft.SharePoint.WebControls;

namespace Pages.Layouts.Pages
{
    public partial class Appoverpage : LayoutsPageBase
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
                                    //string userName = SPContext.Current.Web.CurrentUser.Name;
                                    //revBy.Text = userName.ToUpper();
                                }
                            }
                        }

                    }// SPWeb
                }
            });
        }


    }
}
