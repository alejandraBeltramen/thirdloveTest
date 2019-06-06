import React from 'react';
import ProductImages from './ProductImages';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

describe('Components - Product Images', () => {
  it('should be rendered without crashing', () => {
    const div = document.createElement('div');
    const images = [
      { main: 'main1', thumbnail: 'thumbnail1' },
      { main: 'main2', thumbnail: 'thumbnail2' }
    ];
    ReactDOM.render(<ProductImages images={images}/>, div);
  });
  
  it('should update the component properties if they change', () => {
    // Arrange
    const images = [
      { main: 'main1', thumbnail: 'thumbnail1' },
      { main: 'main2', thumbnail: 'thumbnail2' }
    ];
    const newImages = [
      { main: 'main3', thumbnail: 'thumbnail3' },
      { main: 'main4', thumbnail: 'thumbnail4' }
    ];
    const wrapper = mount(<ProductImages images={images}/>);
    const expectedElements = [ 
      <img className="pi__wrapper__image" src='main3' alt="Bra"></img>,
      <img className="pi__wrapper__image" src='main4' alt="Bra"></img>
    ];

    // Act
    wrapper.setProps({images: newImages});

    // Assert
    expect(wrapper.state('main')).toEqual(expectedElements);
  });

  it('should update the index while selecting an image', () => {
    // Arrange
    const images = [
      { main: 'main1', thumbnail: 'thumbnail1' },
      { main: 'main2', thumbnail: 'thumbnail2' }
    ];
    const wrapper = mount(<ProductImages images={images}/>);

    // Act
    wrapper.find('.pi-image-dots__dot').last().simulate('click');

    // Assert
    expect(wrapper.state('currentIndex')).toEqual(1);
  });

  it('should render the amount of thumbnails as images requested', () => {
    // Arrange
    const images = [
      { main: 'main1', thumbnail: 'thumbnail1' },
      { main: 'main2', thumbnail: 'thumbnail2' }
    ];

    // Act
    const wrapper = mount(<ProductImages images={images}/>);

    // Assert
    expect(wrapper.find('.pi-image-list__thumbnail').length).toBe(images.length);
  });


});