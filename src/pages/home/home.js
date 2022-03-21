import * as React from 'react';
import { Outlet, NavLink } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import SvgIcon from '@mui/material/SvgIcon';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { base64toBlob } from '../../util/base64toblobconverter';
import InfoIcon from '@mui/icons-material/Info';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Button, CardHeader } from '@mui/material';
import { GET_PETS } from '../../util/constants';



const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


// MAIN code

function Home() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const adminUser = {
        email: "admin@example.com",
        password: "password"
    }
    const navigate = useNavigate();

    React.useEffect(() => {

        let email = localStorage.getItem('email');
        let password = localStorage.getItem('password');
        if (email == adminUser.email && password == adminUser.password) {
            console.log("Logged in");
        }
        else {
            navigate('/signup')
        }

    }, []);

    const Logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");

    }

    const text = {
        color: 'green',
        backgroundColor: '#bfdc7f',
    }


    const [rows, setRows] = React.useState([]);


    React.useEffect(() => {
        fetch(GET_PETS).then((data) => data.json()).then((obj) => {
            const newData = obj.map(a => {
                const o = JSON.parse(a);
                if (o.pic) {
                    const [contentType, base64] = o.pic.split(';base64,');
                    if (base64) {
                        const blobData = base64toBlob(contentType, base64);
                        console.log('blobdata', blobData)
                        const src = URL.createObjectURL(blobData)
                        console.log('blobdata', src)
                        o.pic = src;

                    }
                }
                else {
                    o.pic = "";
                }
                return o;
            })
            setRows(newData);
        });


    }, []);


    return (
        <div style={{ backgroundColor: '#d1e8e2', height: '121vh' }}>
            <Box sx={{ display: 'flex' }} >
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" style={{ color: "#FEFFA5", textAlign: "center" }}/* variant="h6" noWrap component="div" style={{ textAlignVertical: "center", textAlign: "center", }} */>
                            Pet Store
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} >
                    <DrawerHeader style={{ backgroundColor: '#ADD8E6' }}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List style={text} >
                        <NavLink to="dashboard" style={{
                            color: 'inherit',
                            textDecoration: 'none',

                        }}>
                            <ListItem button key={"Home"} >
                                <ListItemIcon>
                                    <SvgIcon sx={{ color: "green", fontSize: 35 }}>
                                   // <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                                    </SvgIcon>
                                </ListItemIcon>
                                <ListItemText primary={"Home"} />
                            </ListItem>
                        </NavLink>

                        <NavLink to="add" style={{
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                            <ListItem button key={"Add pets"}>
                                <ListItemIcon>
                                    <AddIcon sx={{ color: "green", fontSize: 35 }} />
                                </ListItemIcon>
                                <ListItemText primary={"Add pets"} />
                            </ListItem>
                        </NavLink>

                        <NavLink to="list" style={{
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                            <ListItem button key={"list"}>
                                <ListItemIcon>
                                    <ListIcon sx={{ color: "green", fontSize: 35 }} />
                                </ListItemIcon>
                                <ListItemText primary={"List"} />
                            </ListItem>
                        </NavLink>

                        <NavLink to="customer" style={{
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                            <ListItem button key={"customer"}>
                                <ListItemIcon>
                                    <ListIcon sx={{ color: "green", fontSize: 35 }} />
                                </ListItemIcon>
                                <ListItemText primary={"Add Customer"} />
                            </ListItem>
                        </NavLink>

                        <NavLink to="custlist" style={{
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                            <ListItem button key={"custlist"}>
                                <ListItemIcon>
                                    <ListIcon sx={{ color: "green", fontSize: 35 }} />
                                </ListItemIcon>
                                <ListItemText primary={"custlist"} />
                            </ListItem>
                        </NavLink>

                    </List>
                    <Divider />
                    <NavLink to="../signup" style={{
                        color: 'red',
                        textDecoration: 'none',
                        backgroundColor: '#ffcccb',
                    }}
                        onClick={() => {
                            Logout();
                        }}>
                        <ListItem button key={"logout"}>
                            <ListItemIcon>
                                < LogoutIcon sx={{ color: "red", fontSize: 35 }} />
                            </ListItemIcon>
                            <ListItemText primary={"LogOut"} />
                        </ListItem>
                    </NavLink>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Outlet />
                </Box>

            </Box>


        </div>


    );
}


export { Home };