import React from 'react';
import ColorPicker from './ColorPicker';
import ReactDOM from 'react-dom';
import { mount, render, shallow } from 'enzyme';

describe('UI core - Color Picker component', () => {
  it('should be rendered without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ColorPicker colors={[]} selectedColor="naked-1" onSelection={() => {}} />, div);
  });

  it('should render the amount of colors requested', () => {
    // Arrange
    const selectedColor = 'naked-1';
    const colors = [ 'naked-1', 'naked-2' ];
    const onSelection = (color: string) => {};

    // Act
    const wrapper = shallow(<ColorPicker colors={colors} selectedColor={selectedColor} onSelection={onSelection} />);

    // Assert
    expect(wrapper.find('.uc-cp-options__item').length).toBe(colors.length);
  });

  it('should parse the selected color', () => {
    // Arrange
    const selectedColor = 'naked-1';
    const colors = [ 'naked-1', 'naked-2' ];
    const onSelection = (color: string) => {};

    // Act
    const wrapper = render(<ColorPicker colors={colors} selectedColor={selectedColor} onSelection={onSelection} />);

    // Assert
    expect(wrapper.text()).toContain('COLOR: naked 1');
  });

  it('should handle changes', () => {
    // Arrange
    const props = {
      selectedColor: 'naked-2', 
      colors: [ 'naked-1', 'naked-2' ],
      onSelection: jest.fn()
    };
    const wrapper = mount(<ColorPicker {...props}/>);
    const changeSimulation = 'naked-1';

    // Act
    wrapper.find('.uc-cp-options__item').first().simulate('click', changeSimulation);

    // Assert
    expect(props.onSelection).toHaveBeenCalledTimes(1);
  });
});