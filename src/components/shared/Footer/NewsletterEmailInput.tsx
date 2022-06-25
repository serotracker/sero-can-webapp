import React, {useState} from "react";
import {Input} from "semantic-ui-react";
import Translate from "../../../utils/translate/translateService";
import {useMediaQuery} from "react-responsive";
import {mobileDeviceOrTabletWidth} from "../../../constants";
// import {google} from "googleapis";

export default function NewsletterEmailInput() {
    const emailRegex = "^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [invalidEntry, setInvalidEntry] = useState(false);
    const isMobileDeviceOrTablet = useMediaQuery({maxDeviceWidth: mobileDeviceOrTabletWidth})


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
                    alert(newsletterEmail + " has been signed up for newletters");
                    setNewsletterEmail("");
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
            <h5 className={" text-left mb-2"}>{Translate("Footer", ["SeroNewsletter"]).toUpperCase()}</h5>
            <p className={"text-left"}>{Translate("SeroNewsletterDescription")}</p>
            <Input
                action={{content: "Sign Up", onClick: handleNewsletterSubmit, color: "blue"}}
                placeholder={"example@somecompany.ext"}
                value={newsletterEmail}
                className={isMobileDeviceOrTablet ?  "w-75 align-self-end" : "w-100 align-self-end"}
                type={"email"}
                error={invalidEntry}
                onChange={(event) => setNewsletterEmail(event.target.value)}
            />
        </>
    )
}