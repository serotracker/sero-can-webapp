import React, { useContext } from "react";
// @ts-ignore
// The tableau JS API does not have good typescript support
import TableauReport from 'tableau-react-embed';
import '../pages/static.css';
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";
import { LanguageType } from "../../types";
import { AppContext } from "../../context";

interface TableauEmbedProps {
    url: { [key in LanguageType]?: string },
    mobileOptions?: Record<string, string>,
    desktopOptions?: Record<string, string>
}

export default function TableauEmbed(props: TableauEmbedProps) {
    const [{ language }, dispatch] = useContext(AppContext);
    const isMobileDeviceOrTablet = useMediaQuery({ maxWidth: mobileDeviceOrTabletWidth });
    const url = language in props.url ? props.url[language] : props.url["en"];

    let options = {}
    if(isMobileDeviceOrTablet){
        options = props.mobileOptions ? props.mobileOptions : {}
    }
    else{
        options = props.desktopOptions ? props.desktopOptions : {}
    }

     // All other vizCreate options are supported here, too
    // They are listed here:
    // https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#ref_head_9
    // const options = {
    //     width: "100%",
    //     height: "100%"
    // }
    return (
        <TableauReport id = "iframe"
            url={url}
            options={options}
        />
    )
}