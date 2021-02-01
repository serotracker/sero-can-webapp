import React from "react";
import TableauEmbed from '../../shared/TableauEmbed';

export default function Analyze() {
  
  const options = {
    width: "800px",
    height: "4000px"
  }

  return (
    <>
      <TableauEmbed
        url="https://public.tableau.com/views/SeroTrackerExp_16121485899730/Analyze?:language=en&:display_count=y&publish=yes&:origin=viz_share_link"
        options={options}
      />
    </>
  )
}
