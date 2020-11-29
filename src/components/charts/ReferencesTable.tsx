import React, { useContext } from "react";
import { AppContext } from "../../context";
import StudiesTable from '../shared/StudiesTable';
import './Charts.css';

export default function ReferencesTable() {
  const [{records}] = useContext(AppContext);
  return (
    <div className="top references">
       <StudiesTable dataRecords={records} showAllStudies={false}></StudiesTable>
    </div>
  );
}
