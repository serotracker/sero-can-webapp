import React, { useState } from "react";
import { Input, Button } from 'semantic-ui-react'
import { checkPassword } from "./AuthController"

export default function Auth(props: Record<string, any>) {
    const [passEntry, setPassEntry] = useState('');

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
        <div className="col-12 p-0 flex center-item">
            <form onSubmit={handleSubmit} className="input-group col-4 p-0 center-item flex">
                <Input
                    focus
                    type="password"
                    onChange={handleChange}
                    value={passEntry}
                    className="col"
                    placeholder="Passphrase" />
                <Button type="submit" content="Submit" 
                    className="col-auto" primary>
                </Button>
            </form>
        </div>
    )
}