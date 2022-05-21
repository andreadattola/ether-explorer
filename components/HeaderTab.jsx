import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import * as styles from "../styles/HeaderTab.module.css";
import { shouldNotRendered } from "../utils/shouldNotRendered";
import { useCurrentUser } from "@/lib/user";
import SettingsIcon from "@mui/icons-material/Settings";

const pages = [
  { route: "/home", label: "Home" },
  { route: "/apicalling", label: "CheckEther" },
  { route: "/settings", label: "Profile" },
];
const settings = ["Settings", "Account", "Dashboard", "Logout"];

export const HeaderTab = (props) => {
  const router = useRouter();

  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
  React.useEffect(() => {
    if (isValidating) return;
  }, [user, router, isValidating]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  if (shouldNotRendered(router.asPath)) return null;
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    const {
      target: { name },
    } = event;
    router.replace(name);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  if(!user && !router.pathname ==='/home') return null
  if(!user) {
    return (
      <AppBar>
        <Container>
          <Toolbar>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Login">
                <IconButton
                  onClick={() => router.replace("/login")}
                  sx={{ p: 0 }}
                >
                  Login
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  } else{
    return (
      <AppBar className={styles.headBar} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              color={"#388538"}
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              ETHERSCAN
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography
                      className={
                        router.route === page.route
                          ? styles.isActive
                          : styles.isntActive
                      }
                      textAlign="center"
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              color={"#388538"}
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              ETHERSCAN
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  className={
                    router.route === page.route
                      ? styles.isActive
                      : styles.isntActive
                  }
                  name={page.route}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            {/** @todo controllare user */}
            {user && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar2"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
            {
              // @todo controllare user
            }
            {!user && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Login">
                  <IconButton
                    onClick={() => router.replace("/login")}
                    sx={{ p: 0 }}
                  >
                    Login
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
    
 
};
