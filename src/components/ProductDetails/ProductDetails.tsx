import React from 'react';
import './ProductDetails.scss';

type ProductDetailsProps = {
	// raw content to be rendered as a clean html
	details: any
};
type ProductDetailsState = {};

export default class ProductDetails extends React.Component<ProductDetailsProps, ProductDetailsState> {
	/** 
	 * Returns the content to be displayed as html
	*/
  createDetails(): any {
    return { __html: this.props.details };
	}
	
	/**
	 * Render of the component itself
	 */
	render() {
		return(
			<section className="product-details">

				<h2 className="pd__title">DETAILS</h2>
				<div dangerouslySetInnerHTML={this.createDetails()}></div>
			</section>
		);
	}
}