import React from "react";
import './static.css';

export default function Dashboard() {
    return (
        <div className="static-page vertical-spacer">
            <div className="static-content">
                <p>
                    Our interactive world map is currently in development. Illustrative images from development work are below.
                </p>
            </div>
            <img src={require('../../assets/images/serotracker_map_may7.png')} className='dashboard-img vertical-spacer'/>
            <img src={require('../../assets/images/serotracker_chart_may7.jpg')} className='dashboard-img vertical-spacer'/>
        </div>
    )
}