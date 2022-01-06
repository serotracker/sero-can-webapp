import React from "react";
import { isMaintenanceMode } from "../../constants";
import MaintenanceModal from "../shared/MaintenanceModal";

interface TableauEmbedProps {
    className?: string,
    children?: JSX.Element | JSX.Element[];
    includeMaintenanceModal: boolean,
}

const PageBody = (props: TableauEmbedProps) => {
  return (
    <div className={`container ${props.className}`}>
    <div className="row">
      <div className="col-md-auto">
        {props.children}
      </div>
    </div>
    {props.includeMaintenanceModal && <MaintenanceModal isOpen={isMaintenanceMode} headerText={""} /> }
  </div>
  )
}

export default PageBody