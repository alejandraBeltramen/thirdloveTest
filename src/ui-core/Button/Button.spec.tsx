import React from 'react';
import Button from './Button';
import ReactDOM from 'react-dom';
import { mount, render } from 'enzyme';

describe('UI core - Button Component', () => {
  it('should be rendered without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button text="name" onClick={() => {}} />, div);
  });

  it('should render the name', () => {
    // Arrange
    const text = 'name';
    const onClick = (event: any) => {};
    
    // Act
    const wrapper = render(<Button text={text} onClick={onClick}/>);

    // Assert
    expect(wrapper.text()).toContain(text);
  });

  it('should handle clicking', () => {
    // Arrange
    const props = {
      text: 'name', 
      onClick: jest.fn()
    };
    const wrapper = mount(<Button {...props}/>);

    // Act
    wrapper.find('.uc-button').simulate('click', {});
    
    // Assert
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});