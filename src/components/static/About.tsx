import React from "react";
import './static.css';

export default function About() {

    function renderBioBlock(name: string, description: string[]){
        return (
            <div>
                <b>
                    {name}
                </b>
                <br/>
                {description.map((line) => {
                    return (
                        <div>
                            {line}
                            <br/>
                        </div>
                    )
                })}
            </div>
        )
    }
    return (
        <div className="page col-12">
            <div className="static-content">
                <h1>
                    Scientific Lead:
                </h1>
                <div>
                    {renderBioBlock('Tim Evans', ['Director, School of Population and Global Health, McGill University', 'Executive Director, Canadian COVID-19 Immunity Task Force'])}
                </div>
                <h1>
                    Research Team:
                </h1>
                <div className="bio-grid-container">
                    {renderBioBlock('Rahul Arora', ['University of Oxford'])}
                    {renderBioBlock('Niklas Bobrovitz ', ['University of Oxford', 'University of Toronto'])}
                    {renderBioBlock('Emily Boucher', ['University of Calgary'])}
                    {renderBioBlock('Nathan Duarte', ['University of Waterloo'])}
                    {renderBioBlock('Hannah Rahim', ['University of Calgary'])}
                    {renderBioBlock('Tingting Yan', ['University of Toronto'])}
                </div>
                <p>
                    Please direct research-related inquiries to <a href="mailto:niklas.bobrovitz@mail.utoronto.ca">niklas.bobrovitz@mail.utoronto.ca</a>.
                </p>
                <h1>
                    Data Science Team:
                </h1>
                <div className="bio-grid-container">
                    {renderBioBlock('Austin Atmaja', ['University of Waterloo'])}
                    {renderBioBlock('Abel Joseph ', ['University of Waterloo'])}
                    {renderBioBlock('Ewan May', ['University of Calgary'])}
                    {renderBioBlock('Simona Rocco', ['University of Waterloo'])}
                    {renderBioBlock('Jordan Van Wyk', ['University of Waterloo'])}
                </div>
                <p>
                    Please direct website-related inquiries to <a href="mailto:jordan.vanwyk@uwaterloo.ca">jordan.vanwyk@uwaterloo.ca</a>.
                </p>
            </div>
        </div>
    )
}