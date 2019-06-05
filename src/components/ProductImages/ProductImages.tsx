import React from 'react';
import './ProductImages.scss';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { BraImage } from '../../models/Bra';
import * as _ from 'lodash';

type ProductImagesProps = {
  images: BraImage[]
};
type ProductImagesState = {
  main: JSX.Element[],
  thumbnails: JSX.Element[],
  currentIndex: number
};

export default class ProductImages extends React.Component<ProductImagesProps, ProductImagesState> {
  constructor(props: ProductImagesProps) {
    super(props);
    this.state = {
      main: this.props.images.map(this.renderMainImage),
      thumbnails: this.props.images.map(this.renderThumb),
      currentIndex: 0
    }
  }

  componentWillReceiveProps(nextProps: ProductImagesProps) {
    this.setState({ 
      main: nextProps.images.map(this.renderMainImage),
      thumbnails: nextProps.images.map(this.renderThumb)
    })
  }

  handleOnDragStart(e: any) {
    return e.preventDefault();
  }

  slideTo = (i: number) => this.setState({ currentIndex: i });

  onSlideChanged = (e: any) => this.setState({ currentIndex: e.item });

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

  renderDot = (item: any, i:number) => {
    const classes = (this.state.currentIndex === i) ? 'pi-image-dots__dot selected' : 'pi-image-dots__dot';

    return (
      <div key={i} className={classes} onClick={() => this.slideTo(i)}/>
    );
  }

  renderMainImage = (image: BraImage) => (
    <img className="pi__wrapper__image" src={image.main} alt="Bra"></img>
  );

  render() {
    const { main, thumbnails, currentIndex } = this.state;

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
                         swipeDisabled={(window.screen.width * window.devicePixelRatio)>= 1024}>
          </AliceCarousel>
        </div>
        <ul className="pi-image-dots">{ main.map(this.renderDot) }</ul>
      </div>
    );
  }
}