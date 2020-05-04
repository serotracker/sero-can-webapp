import React, { useState } from "react";
import { Input, Button, Card } from 'semantic-ui-react'
import { checkPassword } from "./AuthController"
import Img from '../../../assets/images/two-tone-dark.svg'
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
            <Card className="col-4">
                <Card.Header className="flex p-3">
                <img src={Img} width={30} height={30} alt="React Logo" />
                <h2 className="col-auto m-0 flex">SeroTracker</h2></Card.Header>
                <Card.Content>
                        <form onSubmit={handleSubmit} className="input-group col-12 p-0 center-item flex">
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
                </Card.Content>
            </Card>
        </div>
    )
}