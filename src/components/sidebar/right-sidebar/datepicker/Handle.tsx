import * as React from "react";
import { SliderItem } from "react-compound-slider";


const { Component, Fragment } = React;

interface HandleProps {
    key: string;
    handle: SliderItem;
    isActive: Boolean;
    disabled?: Boolean;
    domain: number[];
    getHandleProps: (id: string, config: object) => object;
}

const activeHandleStyle: React.CSSProperties = {
  position: "absolute",
  marginLeft: "-11px",
  marginTop: "-35px"
};

const handleStyle: React.CSSProperties = {
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
};
export default class Handle extends Component<HandleProps> {
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
                ...activeHandleStyle
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
              backgroundColor: disabled ? "#666" : "#f1f5f7",
              ...handleStyle
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