import "./NavBar.scss";
import { Menu, ConfigProvider, Drawer } from "antd";
import { useState } from "react";
import {
  HomeOutlined,
  TabletOutlined,
  FormOutlined,
  LogoutOutlined,
  LoginOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useLocation, useNavigate } from "react-router";

const NavBar = () => {
  const { isMobile } = useWindowWidth();
  const navigate = useNavigate();
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const { pathname } = useLocation();
  
  const shouldRenderSelected = pathname.includes("/product")?false:true 
  const items = [
    {
      label: "Home",
      key: "/",
      icon: <HomeOutlined />,
      onClick: () => {
        navigate("/");
      },
    },
    {
      label: "Table",
      key: "/table",
      icon: <TabletOutlined />,
      onClick: () => {
        navigate("/table");
      },
    },
    {
      label: "Form",
      key: "/form",
      icon: <FormOutlined />,
      onClick: () => {
        navigate("/form");
      },
    },
    {
      label: "",
      key: "spacer",
      style:isMobile?{marginTop:"auto"} :{  marginLeft: "auto" },
      disabled: true,
    },
    {
      icon: <LogoutOutlined />,
      label: "Logout",
      key: "logout",
    },
  ];
  const openDrawer = () => {
    setIsDrawerOpened(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpened(false);
  };
  return (
    <div className="navbar">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorPrimary: "red",
            },
          },
        }}
      >
        {isMobile ? (
          <>
            <MenuOutlined
              style={{ fontSize: "25px", cursor: "pointer", color: "white" }}
              onClick={openDrawer}
            />
            <Drawer
              width={250}
              onClose={closeDrawer}
              open={isDrawerOpened}
              placement="left"
              style={{ backgroundColor: "orange" }}
              bodyStyle={{ backgroundColor: "orange" }}
            >
              <Menu
                // className="navbar__menu"
                style={{
                  backgroundColor: "orange",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                items={items}
                mode="inline"
                defaultOpenKeys={[pathname]}
                defaultSelectedKeys={[pathname]}
              />
            </Drawer>
          </>
        ) : ( <Menu
            className="navbar__menu"
            items={items}
            mode="horizontal"
            defaultOpenKeys={[pathname]}
            defaultSelectedKeys={[pathname]}
             selectedKeys={shouldRenderSelected ? [pathname] : []}
          />
        )}
      </ConfigProvider>
    </div>
  );
};
// const NavBar = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleLogin = () => {
//       setIsLoggedIn(true);
//     };

//     const handleLogout = () => {
//       setIsLoggedIn(false);
//     };

//     const startItems = [
//       {
//         label: "Home",
//         key: "Home",
//         icon: <HomeOutlined />,
//       },
//       {
//         label: "Table",
//         key: "table",
//         icon: <TabletOutlined />,
//       },
//       {
//         label: "Form",
//         key: "form",
//         icon: <FormOutlined />,
//       },
//     ];

//     const endItems = [
//       {
//         label: "Logout",
//         key: "logout",
//         icon: <LogoutOutlined />,
//         onClick: handleLogout,
//         hidden: !isLoggedIn,
//       },
//       {
//         label: "Login",
//         key: "login",
//         icon: <LoginOutlined />,
//         onClick: handleLogin,
//         hidden: isLoggedIn,
//       },
//     ];

//     return (
//       <div className="navbar">
//         <ConfigProvider
//           theme={{
//             components: {
//               Menu: {
//                 colorPrimary: "red",
//               },
//             },
//           }}
//         >
//           <Menu className="navbar__menu" mode="horizontal">
//             {startItems.map((item) => (
//               <Menu.Item key={item.key} icon={item.icon}>
//                 {item.label}
//               </Menu.Item>
//             ))}

//             <Menu.Item style={{ marginLeft: "auto" }} key="spacer" disabled>
//               {/* Empty item for layout spacing */}
//             </Menu.Item>

//             {endItems.map((item) => {
//               if (!item.hidden) {
//                 return (
//                   <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
//                     {item.label}
//                   </Menu.Item>
//                 );
//               }
//               return null;
//             })}
//           </Menu>
//         </ConfigProvider>
//       </div>
//     );
//   };

export default NavBar;
