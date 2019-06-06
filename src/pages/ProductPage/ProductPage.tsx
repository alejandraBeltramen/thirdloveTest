import React from 'react';
import './ProductPage.scss';
import ProductVariants from '../../components/ProductVariants/ProductVariants';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import ProductImages from '../../components/ProductImages/ProductImages';
import { BraImage, RawBraImage, BraVariant } from '../../models/Bra';
import * as _ from 'lodash';
import { PRODUCT_URL, HTTPS, COLORS, MIN_STOCK } from './ProductPageConstansts';

type ProductPageProps = {};
type ProductPageState = {
  // available colors to be displayed in the color picker
  colors: string[]
  // color that is currently selected
  selectedColor: string,
  // inventory for the current selected color, band and cup size
  stock: number,
  // collection of the current band sizes by the selected color
  bandSizes: string[],
  // band size that is currently selected
  selectedBandSize: any,
  // collection of the current band sizes by the selected color and band size
  cupSizes: string[],
  // cup size that is currently selected
  selectedCupSize: string,
  // data structure to handle the products assigned by color, bra and cupsize
  productMap: any,
  // title of the page
  title: string,
  // details of the product
  productDetails: any,
  // collection of images of the product
  images: BraImage[],
  // price of the product
  price: string,
};

export default class ProductPage extends React.Component<ProductPageProps, ProductPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      colors: COLORS,
      stock: 12,
      selectedColor: COLORS[0],
      bandSizes: [],
      selectedBandSize: '',
      cupSizes: [],
      selectedCupSize: '',
      productMap: {},
      title: '',
      productDetails: '',
      images: [],
      price: ''
    }
  }

  componentWillMount() {
    fetch(PRODUCT_URL)
      .then(data => data.json())
      .then(data => this.processData(data.product))
      .catch(error => console.log('Error while fetching data', error));
  }

  /**
   * Executed when is selected a color.
   * Updates the available band and cup sizes for this new color.
   * @param color new selected color
   */
  handleColorChange(color: string): void {
    const { productMap } = this.state;
    this.updateProductSelection(productMap, color);
    this.setState({ selectedColor: color });
  }

  /**
   * Executed when is selected a band size.
   * Updates the available cup sizes for this new band size.
   * @param bandSize new selected band size
   */
  handleBandSizeChange(bandSize: string): void {
    const { productMap, selectedColor } = this.state;
    const cupSizes = this.getCupSizesByBandSize(productMap, this.state.selectedColor, bandSize);
    const selectedCupSize = _.head(cupSizes);
    this.setState({
      selectedBandSize: bandSize,
      cupSizes: cupSizes,
      selectedCupSize: selectedCupSize,
      stock: productMap[selectedColor][bandSize][selectedCupSize].stock
    });
  }

  /**
   * Executed when is selected a new cup size.
   * Updates the available stock for the new selected cup size.
   * @param cupSize new selected cup size
   */
  handleCupSizeChange(cupSize: string): void {
    const { productMap, selectedColor, selectedBandSize } = this.state;
    this.setState({
      selectedCupSize: cupSize,
      stock: productMap[selectedColor][selectedBandSize][cupSize].stock
    });
  }

  /**
   * Executed when the buy button is clicked. It adds the selected
   * product to the cart.
   */
  handleAddToBugClick(): void {
    const { title, selectedBandSize, selectedCupSize } = this.state;
    const message = `Added a ${title} - ${selectedBandSize}${selectedCupSize} to the cart`;
    alert(message);
  }

  /**
   * It receives raw data from a product and it handles
   * to initialize the current state of product selection
   * @param data raw data received from the API
   */
  processData(data: any) {
    const productMap = this.createProductMap(data.variants);
    this.updateProductSelection(productMap, this.state.selectedColor);

    this.setState({ 
      title: data.title,
      productDetails: data.body_html,
      images: this.getImages(data.images),
      productMap: productMap,
      price: this.getPrice(data.variants)
    });
  }

  /**
   * It receives raw data from a product and it proccess that data
   * to generate a data structure useful in the UI. It avoids those
   * variants that do not have enough stock.
   * @param variants to be mapped into the product map
   */
  createProductMap(variants: BraVariant[]): [] {
    const productMap: any = {};
    _.each(variants, (variant: BraVariant) => {
      if(variant.inventory_quantity >= MIN_STOCK) {
        productMap[variant.option1] = productMap[variant.option1] ? productMap[variant.option1] : {};
        const bandSize = this.getBandSize(variant.option2);
        const cupSize = this.getCupSize(variant.option2);
        
        if(!productMap[variant.option1][bandSize]) {
          productMap[variant.option1][bandSize] = {
            name: bandSize
          }
        }
        if(!productMap[variant.option1][bandSize][cupSize]) {
          productMap[variant.option1][bandSize][cupSize] = {
            name: cupSize,
            stock: variant.inventory_quantity
          }
        }
      }
    });

    return productMap;
  }

  /**
   * Updates the band and cup sizes by the new selected color.
   * @param productMap 
   * @param selectedColor the new selected color
   */
  updateProductSelection(productMap: any[], selectedColor: any): void {
    const bandSizes = this.getBandSizesByColor(productMap, selectedColor);
    const selectedBandSize = _.head(bandSizes);
    const cupSizes = this.getCupSizesByBandSize(productMap, selectedColor, selectedBandSize);
    const selectedCupSize = _.head(cupSizes);

    this.setState({ 
      bandSizes: bandSizes,
      selectedBandSize: selectedBandSize,
      cupSizes: cupSizes,
      selectedCupSize: selectedCupSize,
      stock: productMap[selectedColor][selectedBandSize][selectedCupSize].stock
    });
  }

  /**
   * Gets the available band sizes by the new selected color.
   * @param productMap 
   * @param selectedColor 
   */
  getBandSizesByColor(productMap: any[], selectedColor: any): any[] {
    return _.map(productMap[selectedColor], (bandSize) => (bandSize.name));
  }

  /**
   * Gets the available cup sizes by a selected band size and color
   * @param productMap 
   * @param selectedColor 
   * @param selectedBandSize 
   */
  getCupSizesByBandSize(productMap: any[], selectedColor: any, selectedBandSize: any): any[] {
    const bandSizes = _.omit(productMap[selectedColor][selectedBandSize], 'name');
    return _.map(bandSizes, (cupSize) => (cupSize.name));
  }

  /**
   * Maps a raw image into an image object useful
   * @param rawImages 
   */
  getImages(rawImages: RawBraImage[]): BraImage[] {
    return _.map(rawImages, (rawImage: RawBraImage) => ({
      main: `${HTTPS}${rawImage.src1000}`,
      thumbnail: `${HTTPS}${rawImage.src100}`
    }));
  }

  /**
   * Gets the band size from a single size.
   * E.g.: size 38B => 38
   * @param size 
   */
  getBandSize(size: string): string {
    return size.substring(0,2);
  }

  /**
   * Gets the cup size from a single size.
   * E.g.: size 38B => B
   * @param size 
   */
  getCupSize(size: string): string {
    return size.substring(2,3);
  }

  /**
   * Gets the clear bra price from a bra variant. If there is no 
   * bra variant available to get the price, default value will be '-'.
   * E.g.: price 68.00 => 68
   * @param variants 
   */
  getPrice(variants: BraVariant[]): string {
    const rawPrice = _.get(_.head(variants), 'price') || '';
    return rawPrice.slice(0, rawPrice.indexOf('.'));
  }

  /**
   * Rendering of the component itself
   */
  render() {
    const { 
      colors,
      selectedColor,
      bandSizes,
      cupSizes,
      stock,
      title,
      price,
      images,
      productDetails
    } = this.state;
    return (
      <section className="product-page">
        <div className="pp-product">
          <header className="pp__header">
            <h1 className="pp__header__title">{ title }</h1>
            <div className="pp__header__price"><div>${ price }</div></div>
          </header>

          <div className="pp__images">
            <ProductImages images={images}></ProductImages>
          </div>

          <ProductVariants colors={ colors }
                           selectedColor={ selectedColor }
                           bandSizes={ bandSizes }
                           cupSizes={ cupSizes }
                           stock={ stock }
                           handleColorChange={ (color) => this.handleColorChange(color) }
                           handleBandSizeChange={ (bandSize) => this.handleBandSizeChange(bandSize) }
                           handleCupSizeChange={ (cupSize) => this.handleCupSizeChange(cupSize) }
                           handleAddToBugClick={ () => this.handleAddToBugClick() }>
          </ProductVariants>
        </div>

        <ProductDetails details={productDetails}></ProductDetails>        
      </section>
    );
  }
}