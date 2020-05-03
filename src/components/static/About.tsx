import React from "react";
import './static.css';

export default function About() {

    function renderBioBlock(name: string, school: string){
        return (
            <div className="bio-container">
                <b>
                    {name}
                </b>
                <br/>
                {school}
            </div>
        )
    }
    return (
        <div className="static-page">
            <div className="static-content">
                <h1>
                    Who We Are
                </h1>
                <p>
                    We are an interdisciplinary group of researchers, engineers, and medical trainees.
                </p>
                <h2>
                    Research Team:
                </h2>
                {renderBioBlock('Rahul Arora', 'University of Oxford')}
                {renderBioBlock('Niklas Bobrovitz ', 'University of Oxford & University of Toronto')}
                {renderBioBlock('Emily Boucher', 'University of Calgary')}
                {renderBioBlock('Nathan Duarte', 'University of Waterloo')}
                {renderBioBlock('Hannah Rahim', 'University of Calgary')}
                {renderBioBlock('Tingting Yan', 'University of Toronto')}
                <p>
                    Please direct research-related inquiries to <a href="mailto:niklas.bobrovitz@mail.utoronto.ca">niklas.bobrovitz@mail.utoronto.ca</a>.
                </p>
                <h2>
                    Data Science Team:
                </h2>
                {renderBioBlock('Austin Atmaja', 'University of Waterloo')}
                {renderBioBlock('Abel Joseph ', 'University of Waterloo')}
                {renderBioBlock('Ewan May', 'University of Calgary')}
                {renderBioBlock('Simona Rocco', 'University of Waterloo')}
                {renderBioBlock('Jordan Van Wyk', 'University of Waterloo')}
                <p>
                    Please direct website-related inquiries to <a href="mailto:jordan.vanwyk@uwaterloo.ca">jordan.vanwyk@uwaterloo.ca</a>.
                </p>
            </div>
        </div>
    )
}