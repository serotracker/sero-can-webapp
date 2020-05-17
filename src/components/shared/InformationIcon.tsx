import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Popup } from "semantic-ui-react";

interface InformationIconProps {
  color: string;
  size: "xs" | "lg" | "sm" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x" | undefined,
  tooltip: string;
  tooltipHeader: string;
}

export default function InformationIcon(props: InformationIconProps) {
  const { color, size, tooltip, tooltipHeader } = props;
  return (
    <div className="px-2">
      <Popup
        content={tooltip}
        header={tooltipHeader}
        key={Math.random()}
        trigger={
          <FontAwesomeIcon
            icon={faInfoCircle}
            color={color}
            size={size} />} />
    </div>
  );
}
