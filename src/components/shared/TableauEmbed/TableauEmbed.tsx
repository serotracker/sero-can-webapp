import React, { useContext } from "react";
// @ts-ignore
// The tableau JS API does not have good typescript support
import TableauReport from './TableauReport';
import '../../pages/static.css';
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../../constants";
import { LanguageType } from "../../../types";
import { AppContext } from "../../../context";
import './TableauEmbed.scss';

interface TableauEmbedProps {
    className?: string,
    url: { [key in LanguageType]?: string },
    mobileOptions?: Record<string, string>,
    desktopOptions?: Record<string, string>
}

// All other vizCreate options are supported here, too
// They are listed here:
// https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#ref_head_9
// const options = {
//     width: "100%",
//     height: "100%"
// }

export default function TableauEmbed(props: TableauEmbedProps) {
    const [{ language }, dispatch] = useContext(AppContext);
    const isMobileDeviceOrTablet = useMediaQuery({ maxWidth: mobileDeviceOrTabletWidth });
    const url = language in props.url ? props.url[language as LanguageType] : props.url["en"];

    let options = {}
    if(isMobileDeviceOrTablet){
        options = props.mobileOptions ? props.mobileOptions : {}
    }
    else{
        options = props.desktopOptions ? props.desktopOptions : {}
    }

    return (
    <figure className={`tableau-embed ${props.className as string}`}>
        <TableauReport url={url} options={options}/>
    </figure>
    )
}