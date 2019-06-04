import React from 'react';
import './Dropdown.scss';

type DropdownProps = {
  title: string,
  items: any[],
  onChange(change: any): void
};
type DropdownState = {
  title: string
};

export default class Dropdown extends React.Component<DropdownProps, DropdownState> {
  constructor(props: DropdownProps) {
    super(props);
    this.state = {
      title: this.props.title
    }
  }

  renderOption(item: string, i: number) {
    return (
      <option key={i} className="uc-dd-list__item">
        { item }
      </option>
    );
  }

  render() {
    const {items, onChange} = this.props;
    const {title} = this.state;
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