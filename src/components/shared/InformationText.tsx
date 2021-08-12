import React from "react";
import { Popup } from "semantic-ui-react";
import { sendAnalyticsEvent } from "../../utils/analyticsUtils";
import 'sass/components/shared.scss';

interface InformationTextProps {
  position?: "top left" | "top right" | "bottom right" | "bottom left" | "right center" | "left center" | "top center" | "bottom center" | undefined,
  tooltip: string | React.ReactNode;
  tooltipHeader?: string;
  offset: string | number;
  popupSize?: "mini" | "tiny" | "small" | "large" | "huge";
  text: string;
}

export default function InformationText(props: InformationTextProps) {
  const { text, tooltip, tooltipHeader, offset, position, popupSize = "small" } = props;
  return (
      <Popup
        key={Math.random()}
        offset={offset}
        position={position}
        size={popupSize}
        onOpen={() => {
          sendAnalyticsEvent({
            /** Typically the object that was interacted with (e.g. 'Video') */
            category: 'Tooltip',
            /** The type of interaction (e.g. 'play') */
            action: 'opening',
            /** Useful for categorizing events (e.g. 'Fall Campaign') */
            label: tooltipHeader || "Unknown tooltip"
            /** A numeric value associated with the event (e.g. 42) */
          })
        }}
        //fix for janky popup positioning due to overflow styling
        popperModifiers={{ preventOverflow: { boundariesElement: "window" } }}
        trigger={<span className="info-text">{text}</span>}>
        {tooltipHeader && (

          <Popup.Header className="flex left">{tooltipHeader}</Popup.Header>
        )}
        <Popup.Content className="flex left">{tooltip}</Popup.Content>
      </Popup>
  );
}