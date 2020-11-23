import React, { useContext } from "react";
import { AppContext } from "../../context";
import Translate from '../../utils/translate/translateService';
import StudiesTable from '../shared/StudiesTable';
import './Charts.css';

export default function ReferencesTable() {
  const [{records}] = useContext(AppContext);
  return (
    <div className="container col-11 mt-3 top references">
      <div className="col-12 px-0 py-3 section-title">
        {Translate('References').toUpperCase()}
      </div>
       <StudiesTable dataRecords={records} showAllStudies={false}></StudiesTable>
    </div>
  );
}
