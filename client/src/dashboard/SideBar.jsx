import {
  Sidebar,
  SidebarItems,
  SidebarItem,
  SidebarItemGroup,
  SidebarLogo
} from "flowbite-react";
import {
  HiChartPie,
  HiViewBoards,
  HiInbox,
  HiUser,
  HiShoppingBag,
  HiArrowSmRight,
  HiTable,
  HiOutlineCloudUpload,
} from "react-icons/hi";
import { BiBuoy } from "react-icons/bi";
import userImg from '../assets/profile.jpg';
import { AuthContext } from "../contects/AuthProvider";
import { useContext } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="w-64 min-h-screen bg-white text-black border-r border-gray-200">
      <Sidebar aria-label="Sidebar" className="bg-white text-black">
        <SidebarLogo
          href="/"
          img={user?.photoURL || userImg}
          imgAlt="User profile"
          className="rounded-full object-cover"
        >
          <p>{user?.displayName || "Demo User"}</p>
        </SidebarLogo>

        <SidebarItems>
          <SidebarItemGroup className="bg-white">
            <SidebarItem
              as={Link}
              to="/admin/dashboard"
              icon={HiChartPie}
              className="text-black hover:bg-gray-100"
            >
              Dashboard
            </SidebarItem>

            <SidebarItem
              as={Link}
              to="/admin/dashboard/upload"
              icon={HiOutlineCloudUpload}
              className="text-black hover:bg-gray-100"
            >
              Upload Book
            </SidebarItem>

            <SidebarItem
              as={Link}
              to="/admin/dashboard/manage"
              icon={HiInbox}
              className="text-black hover:bg-gray-100"
            >
              Manage Books
            </SidebarItem>

            <SidebarItem
              as={Link}
              to="/admin/dashboard/users"
              icon={HiUser}
              className="text-black hover:bg-gray-100"
            >
              Users
            </SidebarItem>

            <SidebarItem
              as={Link}
              to="/login"
              icon={HiArrowSmRight}
              className="text-black hover:bg-gray-100"
            >
              Sign In
            </SidebarItem>

            <SidebarItem
              as={Link}
              to="/logout"
              icon={HiTable}
              className="text-black hover:bg-gray-100"
            >
              Log Out
            </SidebarItem>

            <SidebarItem
              href="#"
              icon={HiChartPie}
              className="text-black hover:bg-gray-100"
            >
              Upgrade to Pro
            </SidebarItem>
            <SidebarItem
              href="#"
              icon={HiViewBoards}
              className="text-black hover:bg-gray-100"
            >
              Documentation
            </SidebarItem>
            <SidebarItem
              href="#"
              icon={BiBuoy}
              className="text-black hover:bg-gray-100"
            >
              Help
            </SidebarItem>
            <SidebarItem
              href="#"
              icon={BiBuoy}
              className="text-black hover:bg-gray-100"
            >
              Settings
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </Sidebar>
    </div>
  );
};

export default SideBar;
