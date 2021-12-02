import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { NavbarData } from './NavbarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { firebaseAuth } from '../Firebase';

function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let history = useHistory();

    const handleLogout = () => {
        setAnchorEl(null);
        firebaseAuth.signOut().then(() => {
            setUser(null);
            history.push('/login');
            window.location.reload();
        })
    }

    const [user, setUser] = useState(0);
    const [role, setRole] = useState(null);
    const [pid, setPid] = useState(null);

    useEffect(() => {
        firebaseAuth.onAuthStateChanged(async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user);

                const res = await fetch(`${process.env.REACT_APP_API}/api/user/${user.uid}`);
                const body = await res.json();
                if (res.status === 200) {
                    setRole(body.body.role);
                    setPid(body.body.pid);
                }
            } else {
                // User is signed out
                // ...
            }
        });
    }, [])

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <Typography variant="h4" fontWeight="bold" style={{ display: "block", margin: "auto" }}><a href="../Home" style={{ color: "white", textDecoration: "none" }}>HOLIND</a></Typography>
                    <div>
                        <Button
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <FaIcons.FaUser className="user"></FaIcons.FaUser>
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {
                                user ?
                                    <div><MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem></div>
                                    : <MenuItem onClick={handleClose} component={Link} to="/login">Sign In</MenuItem>
                            }
                        </Menu>
                    </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {NavbarData.map((item, index) => {
                            if (item.role === 'all' || item.role === role || (item.role === 'clinical' && role !== 'patient')) {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path + (role === 'patient' && item.title === 'Tasks' ? pid : '')}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            } else return '';
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;