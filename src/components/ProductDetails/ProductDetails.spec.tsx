import React from 'react';
import ProductDetails from './ProductDetails';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

describe('Components - Product Details', () => {
  it('should be rendered without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductDetails details={'details'} />, div);
  });

  it('should create the html object to be rendered', () => {
    // Arrange
    jest.spyOn(ProductDetails.prototype, 'createDetails');

    // Act
    shallow(<ProductDetails details={'content'}/>);

    // Assert
    expect(ProductDetails.prototype.createDetails).toHaveBeenCalledTimes(1);
  });
});