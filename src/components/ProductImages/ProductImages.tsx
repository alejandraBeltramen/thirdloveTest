import React from 'react';
import './ProductImages.scss';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { BraImage } from '../../models/Bra';
import * as _ from 'lodash';
import { DESKTOP_WIDTH } from '../../pages/ProductPage/ProductPageConstansts';

type ProductImagesProps = {
  // images to be rendered
  images: BraImage[]
};
type ProductImagesState = {
  // main images to be displayed when they are selected
  main: JSX.Element[],
  // seconday images to indicate the selected image
  thumbnails: JSX.Element[],
  // the index that matches the selected image
  currentIndex: number,
  // boolean to indicate if the swipping between images is enabled or not
  swipeDisabled: boolean
};

export default class ProductImages extends React.Component<ProductImagesProps, ProductImagesState> {
  constructor(props: ProductImagesProps) {
    super(props);
    this.state = {
      main: this.props.images.map(this.renderMainImage),
      thumbnails: this.props.images.map(this.renderThumb),
      currentIndex: 0,
      swipeDisabled: this.isSwipeEnabled()
    }
  }

  componentWillReceiveProps(nextProps: ProductImagesProps) {
    this.setState({ 
      main: nextProps.images.map(this.renderMainImage),
      thumbnails: nextProps.images.map(this.renderThumb)
    })
  }

  /**
   * Updates the index when a new image is selected by clicking
   * @param i the index of the new selected image
   */
  slideTo = (i: number) => this.setState({ currentIndex: i });

  /**
   * Updates the index when a new image is selected by sliding
   * @param e the event generated on sliding
   */
  onSlideChanged = (e: any) => this.setState({ currentIndex: e.item });

  /**
   * Validate if the carousel should allow swipping
   */
  isSwipeEnabled = () => window.innerWidth >= DESKTOP_WIDTH;

  /**
   * Renders a single thumbnail
   * @param image the image that the thumbnail will display
   * @param i key
   */
  renderThumb = (image: any, i: number) => {
    let index = 0;
    if(_.get(this.state, 'currentIndex')) {
      index = this.state.currentIndex;
    }
    const classes = (index === i) ? 'pi-image-list__thumbnail selected' : 'pi-image-list__thumbnail';

    return (
      <img src={image.thumbnail} className={classes} onClick={() => this.slideTo(i)} key={i}  alt="Bra"></img>
    );
  }

  /**
   * Dot element to navigate between the images in the carousel
   * @param item image that refers to
   * @param i key
   */
  renderDot = (item: any, i:number) => {
    const classes = (this.state.currentIndex === i) ? 'pi-image-dots__dot selected' : 'pi-image-dots__dot';

    return (
      <div key={i} className={classes} onClick={() => this.slideTo(i)}/>
    );
  }

  /**
   * Renders the image that will be displayed when is selected
   * @param image image to be displayed
   */
  renderMainImage = (image: BraImage) => (
    <img className="pi__wrapper__image" src={image.main} alt="Bra"></img>
  );

  /**
   * Rendering of the component itfself
   */
  render() {
    const { main, thumbnails, currentIndex, swipeDisabled } = this.state;

    return (
      <div className="product-images">
        <ul className="pi-image-list">{ thumbnails }</ul>
        <div className="pi__wrapper">
          <AliceCarousel mouseDragEnabled
                         items={main}
                         buttonsDisabled={true}
                         slideToIndex={currentIndex}
                         onSlideChanged={this.onSlideChanged}
                         dotsDisabled={true}
                         onResized={() => this.setState({swipeDisabled: this.isSwipeEnabled()})}
                         swipeDisabled={swipeDisabled}>
          </AliceCarousel>
        </div>
        <ul className="pi-image-dots">{ main.map(this.renderDot) }</ul>
      </div>
    );
  }
}