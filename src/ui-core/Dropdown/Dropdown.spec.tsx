import React from 'react';
import Dropdown from './Dropdown';
import ReactDOM from 'react-dom';
import { mount, render, shallow } from 'enzyme';

describe('UI core - Dropdown component', () => {
  it('should be rendered without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Dropdown title="title" items={[]} onChange={() => {}} />, div);
  });

  it('should render the amount of options requested', () => {
    // Arrange
    const title = 'title';
    const items = [ 'option1', 'option2' ];
    const onChange = (change: any) => {};

    // Act
    const wrapper = shallow(<Dropdown title={title} items={items} onChange={onChange}/>);

    // Assert
    expect(wrapper.find('.uc-dd-list__item').length).toBe(items.length);
  });

  it('should render the title', () => {
    // Arrange
    const title = 'title';
    const items = [ 'option1', 'option2' ];
    const onChange = (change: any) => {};
    
    // Act
    const wrapper = render(<Dropdown title={title} items={items} onChange={onChange}/>);

    // Assert
    expect(wrapper.text()).toContain(title);
  });

  it('should handle changes', () => {
    // Arrange
    const props = {
      title: 'title', 
      items: [ 'option1', 'option2' ],
      onChange: jest.fn()
    };
    const wrapper = mount(<Dropdown {...props}/>);
    const changeSimulation = { target: { value: 1 } };
    // Act
    wrapper.find('.uc-dd-list').simulate('change', changeSimulation);
    
    // Assert
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});