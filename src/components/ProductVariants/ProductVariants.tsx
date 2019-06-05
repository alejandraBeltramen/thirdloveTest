import React from 'react';
import './ProductVariants.scss';
import ColorPicker from '../../ui-core/ColorPicker/ColorPicker';
import Dropdown from '../../ui-core/Dropdown/Dropdown';
import Button from '../../ui-core/Button/Button';

type ProductVariantsProps = {
  // collection of colors to be displayed in the color picker
  colors: string[],
  // color that is currently selected
  selectedColor: string,
  // collection of the current band sizes by the selected color
  bandSizes: string[],
  // collection of the current cup sizes by the selected color and band size
  cupSizes: string[],
  // inventory for the current selection of color, band and cup sizes
  stock: number,
  // function to be executed when the color changes
  handleColorChange(color: string): void,
  // function to be executed when the band size changes
  handleBandSizeChange(BandSize: string): void,
  // function to be executed when the cup size changes
  handleCupSizeChange(cupSize: string): void,
  // function to be executed when the button is clicked
  handleAddToBugClick(): void
};
type ProductVariantsState = {};

export default class ProductVariants extends React.Component<ProductVariantsProps, ProductVariantsState> {
  /**
   * Rendering of the component itself
   */
  render() {
    const {
      colors,
      selectedColor,
      bandSizes,
      cupSizes,
      stock,
      handleColorChange,
      handleBandSizeChange,
      handleCupSizeChange,
      handleAddToBugClick
    } = this.props;

    return (
      <div className="product-variants">
        <div className="pv__color">
          <ColorPicker colors={colors}
                       selectedColor={selectedColor}
                       onSelection={handleColorChange}>
          </ColorPicker>
        </div>

        <div className='pv__stock'>
          <span className="pv__stock__title"> STOCK: </span>
          <span className="pv__stock__value">{ stock }</span>
        </div>

        <div className="pv-size">
          <div className="pv__band-size">
            <Dropdown title="BAND SIZE"
                      items={bandSizes}
                      onChange={handleBandSizeChange}>
            </Dropdown>
          </div>
          
          <div className="pv__cup-size">
            <Dropdown title="CUP SIZE"
                      items={cupSizes}
                      onChange={handleCupSizeChange}>
            </Dropdown>
          </div>
        </div>

        <div className="pv__add">
          <Button text='Add to Bag' onClick={handleAddToBugClick}></Button>
        </div>
      </div>
    )
  }
}