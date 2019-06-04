import React from 'react';
import './ProductVariants.scss';
import ColorPicker from '../../ui-core/ColorPicker/ColorPicker';
import Dropdown from '../../ui-core/Dropdown/Dropdown';
import Button from '../../ui-core/Button/Button';

type ProductVariantsProps = {
  colors: string[],
  selectedColor: string,
  bandSizes: string[],
  cupSizes: string[],
  stock: number,
  handleColorChange(color: string): void,
  handleBandSizeChange(BandSize: string): void,
  handleCupSizeChange(cupSize: string): void,
  handleAddToBugClick(): void
};
type ProductVariantsState = {};

export default class ProductVariants extends React.Component<ProductVariantsProps, ProductVariantsState> {
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