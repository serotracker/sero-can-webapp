import React, {useState} from "react";
import {Input} from "semantic-ui-react";

export default function NewsletterEmailInput() {
    const url = "https://sheet.best/api/sheets/63b3e9c5-bf7d-4e7d-880b-b65923a84db5"
    const emailRegex = "^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [invalidEntry, setInvalidEntry] = useState(false)
    const handleNewsletterSubmit = () => {

        if(newsletterEmail.match(emailRegex)){
            setInvalidEntry(false)
            fetch(url, {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({Email: newsletterEmail})
            }).then(response => {
                console.log(response.json())
            }).then(data => {
                console.log(data)
                alert(newsletterEmail + " is registered for newsletters!")
            }).catch((error) => {
                // Errors are reported there
                console.log(error);
            });
        }
        else {
            alert("INVALID EMAIL: Please enter a valid email")
            setInvalidEntry(true);
        }
    }

    return (
        <>
            <h5>{"SEROTRACKER NEWSLETTER"}</h5>
            <p>Monthly summaries of recent seroprevalence ltierature and product updates</p>
            <Input
                action={{content: "Sign Up", onClick: handleNewsletterSubmit, color: "blue"}}
                placeholder={"example@somecompany.ext"}
                type={"email"}
                error={invalidEntry}
                onChange={(event) => setNewsletterEmail(event.target.value)}
            />
        </>
    )
}