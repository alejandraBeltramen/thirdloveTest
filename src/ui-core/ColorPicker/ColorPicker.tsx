import React from 'react';
import './ColorPicker.scss';

type ColorPickerProps = {
  // colors to be displayed as single color pickers
  colors: string[],
  // the color that is currently selected
  selectedColor: string,
  // function to be executed when a color is selected
  onSelection(color: string): void
};
type ColorPickerState = {};

export default class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {

  /**
   * Receives a raw color and it parses it by removing '-'
   * E.g.: naked-1 => naked 1 
   * @param selectedColor color name to parse
   */
  parseSelectedColor(selectedColor: string): string {
    return selectedColor.replace('-', ' ');
  }

  /**
   * Render a single color picker
   * @param color color to render
   * @param i key
   */
  renderColorOption(color: string, i: number): JSX.Element {
    const { selectedColor, onSelection } = this.props;
    let styleClass = `uc-cp-options__item ${color}`;
    if (color === selectedColor) {
      styleClass = `${styleClass} selected`;
    }
    return (
      <div key={i} className={styleClass} onClick={() => onSelection(color)}></div>
    );
  }

  /**
   * Rendering of the component itself
   */
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