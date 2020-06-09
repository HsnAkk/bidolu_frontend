import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Sidebar from './containers/Sidebar/Sidebar';
import TopNavbar from './containers/TopNavbar/TopNavbar';
import './AdminPanel.css';



function AdminPanel(props) {

    let history = useHistory();

    useEffect(() => {
        history.push('/')
    }, [])


    return (
        <div>
            <TopNavbar />
            <Sidebar />
        </div>
    );
}

export default AdminPanel;
