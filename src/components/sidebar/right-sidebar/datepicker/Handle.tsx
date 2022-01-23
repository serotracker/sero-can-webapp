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
                className={"active-handle-style"}
              style={{
                left: `${percent}%`
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
            className={"handle-style"}
            style={{
              left: `${percent}%`,
              backgroundColor: disabled ? "#666" : "#f1f5f7",
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