import styles from './Home.module.css'

import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';

const Home = () => {
    const {authenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={styles}>
            <h1>Home</h1>
            <p>{String(authenticated)}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
};

export default Home;