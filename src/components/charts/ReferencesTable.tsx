import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { State, PageState } from "../../types";
import StudiesTable from '../shared/StudiesTable';
import './Charts.css';

interface ReferencesTableProps {
  page: string
}

export default function ReferencesTable({page}: ReferencesTableProps) {
  const [state, ] = useContext(AppContext);  
  const [pageState, setPageState] = useState(state[page as keyof State] as PageState);
  useEffect(() => {
    setPageState(state[page as keyof State] as PageState)
  }, [page, state])
  return (
    <div className="top references">
       <StudiesTable dataRecords={pageState.records} showAllStudies={false}></StudiesTable>
    </div>
  );
}
