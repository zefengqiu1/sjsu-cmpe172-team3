import Login from "../pages/Login";
import Index from "../pages/admin/dashboard/Index";
import List from "../pages/admin/products/List";
import Edit from "../pages/admin/products/Edit";
import PageNotFound from "../pages/PageNotFound";
import View from "../pages/admin/products/view";
import Register from "../pages/admin/register/Register";
import Management from "../pages/admin/management/management";
import EditUser from "../pages/admin/management/EditUser";
import ViewUser from "../pages/admin/management/ViewUser";

export const mainRoutes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/404",
    component: PageNotFound
  }
];

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    component: Index,
    isShow: true,
    title: "Dashboard",
    icon: "area-chart"
  },
  {
    path: "/admin/products",
    component: List,
    isShow: true,
    exact: true,
    title: "Product Management",
    icon: "shop"
  },
  {
    path: "/admin/management",
    component: Management,
    isShow: true,
    title: "Manage Users",
    icon: "user"
  },
  {
    path: "/admin/register",
    component: Register,
    isShow: true,
    title: "Authorize New Users",
    icon: "user"
  },
  {
    path: "/admin/products/edit/:id?",
    component: Edit,
    isShow: false
  },
  {
    path: "/admin/users/edit/:id?",
    component: EditUser,
    isShow: false
  },
  {
    path: "/admin/products/view/:id?",
    component: View,
    isShow: false,

    path: "/admin/users/view/:id?",
    component: ViewUser,
    isShow: false,

  }
];
