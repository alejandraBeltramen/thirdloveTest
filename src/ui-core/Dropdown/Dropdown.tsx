import React from 'react';
import './Dropdown.scss';

type DropdownProps = {
  // label to be displayed as a name of the dropdown
  title: string,
  // options of the dropdown
  items: any[], 
  onChange(change: any): void
};
type DropdownState = {};

export default class Dropdown extends React.Component<DropdownProps, DropdownState> {
  /**
   * Rendering of each option of the dropdown
   * @param item option to be rendered
   * @param i key
   */
  renderOption(item: string, i: number): JSX.Element {
    return (
      <option key={i} className="uc-dd-list__item">
        { item }
      </option>
    );
  }

  /**
   * Rendering of the component itself
   */
  render() {
    const { items, onChange, title } = this.props;
    return (
      <div className="uc-dropdown">
        <div className="uc-dd__title">
          { title }
        </div>
        <div className="uc-dd__select">
          <select className="uc-dd-list" onChange={(event) => onChange(event.target.value)}>
            { items.map((item: string, i: number) => this.renderOption(item, i)) }
          </select>
          <i className="uc-dd-icon"></i>
        </div>
      </div>
    );
  }
}