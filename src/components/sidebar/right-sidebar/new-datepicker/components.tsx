import * as React from "react";
import { SliderItem } from "react-compound-slider";
import "./tooltip.css";

const { Component, Fragment } = React;

// *******************************************************
// TOOLTIP RAIL
// *******************************************************
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

interface TooltipRailProps {
  activeHandleID: string;
  getRailProps: (props: object) => object;
  getEventData: (e: Event) => object;
}

export class TooltipRail extends Component<TooltipRailProps> {
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
              position: "absolute",
              marginLeft: "-11px",
              marginTop: "-35px"
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

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
interface HandleProps {
  key: string;
  handle: SliderItem;
  isActive: Boolean;
  disabled?: Boolean;
  domain: number[];
  getHandleProps: (id: string, config: object) => object;
}

export class Handle extends Component<HandleProps> {
  static defaultProps = {
    disabled: false
  };

  state = {
    mouseOver: false
  };

  onMouseEnter = () => {
    this.setState({ mouseOver: true });
  };

  onMouseLeave = () => {
    this.setState({ mouseOver: false });
  };

  render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      isActive,
      disabled,
      getHandleProps
    } = this.props;
    const { mouseOver } = this.state;

    return (
      <Fragment>
        {(mouseOver || isActive) && !disabled ? (
          <div
            style={{
              left: `${percent}%`,
              position: "absolute",
              marginLeft: "-11px",
              marginTop: "-35px"
            }}
          >
            <div className="tooltip">
              <span className="tooltiptext">Value: {value}</span>
            </div>
          </div>
        ) : null}
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          style={{
            left: `${percent}%`,
            position: "absolute",
            marginLeft: "-11px",
            marginTop: "-6px",
            zIndex: 400,
            width: 18,
            height: 18,
            cursor: "pointer",
            border: "none",
            borderRadius: "50%",
            boxShadow: "0 0 1px 1px #ced4da",
            backgroundColor: disabled ? "#666" : "#f1f5f7"
          }}
          {...getHandleProps(id, {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave
          })}
        />
      </Fragment>
    );
  }
}

// *******************************************************
// TRACK COMPONENT
// *******************************************************
interface TrackProps {
  source: SliderItem;
  target: SliderItem;
  disabled?: Boolean;
  getTrackProps: () => object;
}

export function Track({
  source,
  target,
  getTrackProps,
  disabled = false
}: TrackProps) {
  return (
    <div
      style={{
        position: "absolute",
        height: 5,
        zIndex: 1,
        backgroundColor: disabled ? "#999" : "#455a6a",
        borderRadius: 7,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()}
    />
  );
}

// *******************************************************
// TICK COMPONENT
// *******************************************************
interface TickProps {
  tick: SliderItem;
  count: number;
  format: (val: number) => string;
}

const defaultFormat = (d: number) => `d`;

export function Tick({ tick, count, format = defaultFormat }: TickProps) {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          marginTop: 17,
          width: 1,
          height: 5,
          backgroundColor: "rgb(200,200,200)",
          left: `${tick.percent}%`
        }}
      />
      <div
        style={{
          position: "absolute",
          marginTop: 25,
          fontSize: 10,
          textAlign: "center",
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
}
