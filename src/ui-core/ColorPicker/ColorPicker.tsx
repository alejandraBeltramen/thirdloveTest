import React from 'react';
import './ColorPicker.scss';

type ColorPickerProps = {
  colors: string[],
  selectedColor: string,
  onSelection(color: string): void
};
type ColorPickerState = {};

export default class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
  parseSelectedColor(selectedColor: string) {
    return selectedColor.replace('-', ' ');
  }

  renderColorOption(color: string, i: number) {
    const { selectedColor, onSelection } = this.props;
    let styleClass = `uc-cp-options__item ${color}`;
    if (color === selectedColor) {
      styleClass = `${styleClass} selected`;
    }
    return (
      <div key={i} className={styleClass} onClick={() => onSelection(color)}></div>
    );
  }

  render() {
    const { selectedColor, colors } = this.props;

    return(
      <div className="uc-color-picker">
        <span className="uc-cp__title"> COLOR: </span>
        <span className="uc-cp__selection">{ this.parseSelectedColor(selectedColor) }</span>
        <div className='uc-cp-options'>
          {colors.map((color,i) => this.renderColorOption(color, i))}
        </div>
      </div>
    );
  }
}