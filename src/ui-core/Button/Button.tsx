import React from 'react';
import './Button.scss';

type ButonProps = {
  text: string,
  onClick(event: any): void
};
type ButtonState = {};

export default class Button extends React.Component<ButonProps, ButtonState> {
  constructor(props: ButonProps) {
    super(props);
  }
  render() {
    return (
      <button className='uc-button' onClick={this.props.onClick}>
        {this.props.text}
      </button>
    );
  }
}