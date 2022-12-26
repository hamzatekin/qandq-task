import { Suspense, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { privateRoutes } from '../../router/router';
import { Loading } from '../../components/Loading';
import {
  AppBar,
  Box,
  ButtonBase,
  Container,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useUserActions } from '../../store/useUserStore';
import { RoutePath } from '../../router/const';

export const PrivateLayout = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logOut } = useUserActions();

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate(RoutePath.HOME);
  };

  const logUserOut = () => {
    logOut();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ justifyContent: 'space-between' }}>
            <ButtonBase type="button" onClick={navigateToHome}>
              <Typography variant="h6" sx={{ flexGrow: 1 }} component="div">
                Movify
              </Typography>
            </ButtonBase>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logUserOut}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <Suspense fallback={<Loading />}> {useRoutes(privateRoutes)}</Suspense>
        </Container>
      </Box>
    </>
  );
};
