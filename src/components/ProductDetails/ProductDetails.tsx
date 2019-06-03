import React from 'react';
import './ProductDetails.scss';

type ProductDetailsProps = {
	details: any
};
type ProductDetailsState = {};

export default class ProductDetails extends React.Component<ProductDetailsProps, ProductDetailsState> {
  createDetails() {
    return {__html: this.props.details};
  }
	render() {
		return(
			<section className="product-details">

				<h2 className="pd__title">DETAILS</h2>
				<div dangerouslySetInnerHTML={this.createDetails()}></div>
			</section>
		);
	}
}