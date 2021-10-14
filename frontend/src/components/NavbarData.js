import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const NavbarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Messages',
        path: '/messages',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    }
]