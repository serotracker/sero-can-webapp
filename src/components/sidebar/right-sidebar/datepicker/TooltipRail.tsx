import * as React from "react";
import './tooltip.css';

const { Component, Fragment } = React;

const railStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: 40,
  top: -13,
  borderRadius: 7,
  cursor: "pointer",
  opacity: 0.3,
  zIndex: 300,
};

const railCenterStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: 5,
  borderRadius: 7,
  cursor: "pointer",
  pointerEvents: "none",
  backgroundColor: "#eaeaea"
};

const handleStyle: React.CSSProperties = {
  position: "absolute",
  marginLeft: "-11px",
  marginTop: "-35px"
};

interface TooltipRailProps {
  activeHandleID: string;
  getRailProps: (props: object) => object;
  getEventData: (e: Event) => object;
}

export default class TooltipRail extends Component<TooltipRailProps> {
  state = {
    value: null,
    percent: null
  };

  static defaultProps = {
    disabled: false
  };

  onMouseEnter = () => {
    document.addEventListener("mousemove", this.onMouseMove);
  };

  onMouseLeave = () => {
    this.setState({ value: null, percent: null });
    document.removeEventListener("mousemove", this.onMouseMove);
  };

  onMouseMove = (e: Event) => {
    const { activeHandleID, getEventData } = this.props;

    if (activeHandleID) {
      this.setState({ value: null, percent: null });
    } else {
      this.setState(getEventData(e));
    }
  };

  render() {
    const { value, percent } = this.state;
    const { activeHandleID, getRailProps } = this.props;

    return (
      <Fragment>
        {!activeHandleID && value ? (
          <div
            style={{
              left: `${percent}%`,
              ...handleStyle
            }}
          >
            <div className="tooltip">
              <span className="tooltiptext">Value: {value}</span>
            </div>
          </div>
        ) : null}
        <div
          style={railStyle}
          {...getRailProps({
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave
          })}
        />
        <div style={railCenterStyle} />
      </Fragment>
    );
  }
}