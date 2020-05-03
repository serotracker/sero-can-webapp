import React, {useState} from "react";
import {checkPassword} from "./AuthController"

export default function Auth(props: Record<string, any>) {
    const [passEntry, setPassEntry]= useState('');

    function handleSubmit(e: any) {
        e.preventDefault();
        const passwordValid = checkPassword(passEntry);
        if (passwordValid) {
            props.authenticate();
        }
        else {
            alert('Invalid password entered');
        }
    }

    function handleChange(e: any) {
        e.preventDefault();
        setPassEntry(e.target.value)
    }

    return (
        <div>
            <div className="staticrypt-form">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="password"
                        onChange={handleChange}
                        value={passEntry}
                        placeholder="passphrase"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}