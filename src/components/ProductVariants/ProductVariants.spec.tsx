import React from 'react';
import ProductVariants from './ProductVariants';
import ReactDOM from 'react-dom';
import { render } from 'enzyme';

describe('Components - Product Variants', () => {
  it('should be rendered without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ProductVariants colors={['color1']}
                       selectedColor={'color1'}
                       bandSizes={['38']}
                       cupSizes={['E']}
                       stock={30}
                       handleColorChange={() => {}}
                       handleBandSizeChange={() => {}}
                       handleCupSizeChange={() => {}}
                       handleAddToBugClick={() => {}}/>,
      div
    );
  });

  it('should render the stock', () => {
    // Arrange

    // Act
    const wrapper = render(
      <ProductVariants colors={['color1']}
                       selectedColor={'color1'}
                       bandSizes={['38']}
                       cupSizes={['E']}
                       stock={30}
                       handleColorChange={() => {}}
                       handleBandSizeChange={() => {}}
                       handleCupSizeChange={() => {}}
                       handleAddToBugClick={() => {}}/>
    );

    // Assert
    expect(wrapper.find('.pv__stock__value').text()).toContain(30);
  });
});