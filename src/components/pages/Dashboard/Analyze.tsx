import React from "react";
import TableauEmbed from '../../shared/TableauEmbed';

export default function Analyze() {
  return (
    <>
      <TableauEmbed
        url="http://public.tableau.com/views/RegionalSampleWorkbook/Storms"
      />
    </>
  )
}
