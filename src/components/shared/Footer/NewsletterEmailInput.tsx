import React, {useState} from "react";
import {Input} from "semantic-ui-react";
import {ACCESS_TOKEN, SHEET_ID} from "./GoogleApi/sheetConstants";
// import {google} from "googleapis";

export default function NewsletterEmailInput() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:C1:append?valueInputOption=USER_ENTERED`
    const emailRegex = "^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [invalidEntry, setInvalidEntry] = useState(false);

    const clientId = "702218053502-fcrju4976lt0p1dntbln2qdolo72qjki.apps.googleusercontent.com"
    const clientSecret = "d_czX--a8VT3JYOy3tw1ET0b"
    const refreshToken = "1//0deroSpHjRem7CgYIARAAGA0SNwF-L9Ir-WddqsdH71PPLoNMC2Ie_Ac24x7A-_gD9t1wsZN_wVg2CRMJlnK-imdNvTfy_eJG2nE"

    const handleNewsletterSubmit = () => {
        if(newsletterEmail.match(emailRegex)){
            fetch("https://sheet.best/api/sheets/63b3e9c5-bf7d-4e7d-880b-b65923a84db5", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({Email: newsletterEmail}),
            })
                .then((r) => r.json())
                .then((data) => {
                    // The response comes here
                    console.log(data);
                })
                .catch((error) => {
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
            <h5 className={" text-left mb-2"}>{"SEROTRACKER NEWSLETTER"}</h5>
            <p className={"text-left"}>Monthly summaries of recent seroprevalence ltierature and product updates</p>
            <Input
                action={{content: "Sign Up", onClick: handleNewsletterSubmit, color: "blue"}}
                placeholder={"example@somecompany.ext"}
                className={"w-100 align-self-end"}
                type={"email"}
                error={invalidEntry}
                onChange={(event) => setNewsletterEmail(event.target.value)}
            />
        </>
    )
}