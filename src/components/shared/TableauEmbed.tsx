import React from "react";
// @ts-ignore
// The tableau JS API does not have good typescript support
import TableauReport from 'tableau-react-embed';
import '../pages/static.css';
import { useMediaQuery } from "react-responsive";
import { mobileDeviceOrTabletWidth } from "../../constants";

interface TableauEmbedProps {
    url: string
}

export default function TableauEmbed(props: TableauEmbedProps) {
    const isMobileDeviceOrTablet = useMediaQuery({ maxDeviceWidth: mobileDeviceOrTabletWidth })
    // All other vizCreate options are supported here, too
    // They are listed here: 
    // https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#ref_head_9

    return (
        <>
            <div className="col-12 page">
                <div className="pb-5 pt-5">
                    <TableauReport
                        url={props.url}
                    />
                </div>
            </div>
        </>
    )
}