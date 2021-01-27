import React from "react";
// @ts-ignore
// The tableau JS API does not have good typescript support
import TableauReport from 'tableau-react-embed';

export default function Analyze() {
  return (
    <>
      <TableauReport
        url="http://public.tableau.com/views/RegionalSampleWorkbook/Storms"
      />
    </>
  )
}
