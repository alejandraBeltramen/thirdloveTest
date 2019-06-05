import React from 'react';
import './Button.scss';

type ButonProps = {
  // label to be displayed as the button name
  text: string,
  // function to be executed when the button is clicked
  onClick(event: any): void
};
type ButtonState = {};

export default class Button extends React.Component<ButonProps, ButtonState> {
  /**
   * Rendering of the component itself
   */
  render() {
    return (
      <button className='uc-button' onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}