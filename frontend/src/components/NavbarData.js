import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const NavbarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
        role: 'all'
    },
    {
        title: 'Patients',
        path: '/patients',
        icon: <BsIcons.BsFillPersonFill />,
        cName: 'nav-text',
        role: 'clinical'
    }, {
        title: 'Tasks',
        path: '/patient/',
        icon: <FaIcons.FaClipboardList />,
        cName: 'nav-text',
        role: 'patient'
    }, {
        title: 'Messages',
        path: '/messages',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text',
        role: 'all'
    },
    {
        title: 'Help',
        path: '/help',
        icon: <BiIcons.BiHelpCircle />,
        cName: 'nav-text',
        role: 'all'
    }
]