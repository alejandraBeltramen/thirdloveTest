import React from 'react';
import './ProductPage.scss';
import ProductVariants from '../../components/ProductVariants/ProductVariants';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import ProductImages from '../../components/ProductImages/ProductImages';
import { BraImage, RawBraImage, BraVariant } from '../../models/Bra';
import * as _ from 'lodash';
import { PRODUCT_URL, HTTPS, COLORS, MIN_STOCK } from './ProductPageConstansts';

type ProductPageProps = {
};
type ProductPageState = {
  colors: string[]
  selectedColor: string,
  stock: number,
  bandSizes: string[],
  selectedBandSize: any,
  cupSizes: string[],
  selectedCupSize: string,
  productMap: any,
  title: string,
  productDetails: any,
  images: BraImage[],
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

  handleColorChange(color: string) {
    const { productMap } = this.state;
    this.updateProductSelection(productMap, color);
    this.setState({ selectedColor: color });
  }

  handleBandSizeChange(bandSize: string) {
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

  handleCupSizeChange(cupSize: string) {
    const { productMap, selectedColor, selectedBandSize } = this.state;
    this.setState({
      selectedCupSize: cupSize,
      stock: productMap[selectedColor][selectedBandSize][cupSize].stock
    });
  }

  handleAddToBugClick() {
    const { title, selectedBandSize, selectedCupSize } = this.state;
    const message = `Added a ${title} - ${selectedBandSize}${selectedCupSize} to the cart`;
    alert(message);
  }

  /**
   * It receives raw data from a product and it proccess that data
   * to generate a data structure useful in the UI
   * @param data 
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
   * to generate a data structure useful in the UI
   * @param productMap 
   * @param variants 
   */
  createProductMap(variants: BraVariant[]) {
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

  updateProductSelection(productMap: any[], selectedColor: any) {
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

  getBandSizesByColor(productMap: any[], selectedColor: any): any[] {
    return _.map(productMap[selectedColor], (bandSize) => (bandSize.name));
  }

  getCupSizesByBandSize(productMap: any[], selectedColor: any, selectedBandSize: any): any[] {
    const bandSizes = _.omit(productMap[selectedColor][selectedBandSize], 'name');
    return _.map(bandSizes, (cupSize) => (cupSize.name));
  }

  getImages(rawImages: []): BraImage[] {
    return _.map(rawImages, (rawImage: RawBraImage) => ({
      main: `${HTTPS}${rawImage.src1000}`,
      thumbnail: `${HTTPS}${rawImage.src100}`
    }));
  }

  getBandSize(size: string): string {
    return size.substring(0,2);
  }

  getCupSize(size: string): string {
    return size.substring(2,3);
  }

  /**
   * Gets the clear bra price from a bra variant. If there is no 
   * bra variant available to get the price, default value will be '-'
   * @param variants 
   */
  getPrice(variants: BraVariant[]): string {
    const rawPrice = _.get(_.head(variants), 'price', '-');
    return rawPrice.slice(0, rawPrice.indexOf('.'));
  }

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