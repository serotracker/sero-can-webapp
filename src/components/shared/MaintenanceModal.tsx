import React from "react";
import { Modal } from "semantic-ui-react";
import 'sass/components/shared.scss';
import Translate from "../../utils/translate/translateService";

interface MaintenanceModalProps {
    isOpen: boolean,
    headerText: string // specifies if analysis or explore page
  }

export default function MaintenanceModal(props: MaintenanceModalProps) {

    const { isOpen, headerText } = props;

    return (
        <Modal
          className="maintenance-modal"
          closeOnEscape={false}
          closeOnDimmerClick={false}
          open={isOpen}
        >
          <Modal.Header>{Translate('TemporaryMaintenance')}</Modal.Header>
          <Modal.Content>
            <p>{Translate('TemporaryMaintenanceDescription')}</p>
          </Modal.Content>
        </Modal>
    );
}
