import React from "react";
// @ts-ignore
// The tableau JS API does not have good typescript support
import TableauReport from 'tableau-react-embed';
import '../pages/static.css';

interface TableauEmbedProps {
    url: string,
    options?: Record<string, string>
}

export default function TableauEmbed(props: TableauEmbedProps) {
    // All other vizCreate options are supported here, too
    // They are listed here: 
    // https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#ref_head_9
    // const options = {
    //     width: "100%",
    //     height: "100%"
    // }

    return (
        <>
            <div className="col-12 page pb-5 pt-5">
                <TableauReport
                    url={props.url}
                    options={props.options ? props.options : {}} 
                />
            </div>
        </>
    )
}