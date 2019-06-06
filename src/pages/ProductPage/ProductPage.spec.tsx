import React from 'react';
import ProductPage from './ProductPage';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { BraVariant, BraImage } from '../../models/Bra';

const mockResponse = (status: number, statusText: any, response: any) => {
  return new (window as any).Response(response, {
    status: status,
    statusText: statusText,
    headers: {'Content-type': 'application/json'}
  });
};


describe('Pages - Product Page', () => {
  it('should be rendered without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductPage/>, div);
  });

  describe('Initialization', () => {
    let wrapper: any;
    beforeEach(() => {
      wrapper = shallow(<ProductPage/>)
    });

    it('should handle error while fetching the data', () => {
      // Arrange
      jest.spyOn(ProductPage.prototype, 'processData');
      (global as any).fetch = jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve(
            mockResponse(200, null, JSON.stringify({}))
          )
        );

      // Act
      mount(<ProductPage/>);

      // Assert
      expect(ProductPage.prototype.processData).not.toHaveBeenCalled();
    });

    it('should get band size', () => {
      // Arrange

      // Act
      const bandSize = wrapper.instance().getBandSize('32B');

      // Assert
      expect(bandSize).toEqual('32');
    });

    it('should get cup size', () => {
      // Arrange

      // Act
      const cupSize = wrapper.instance().getCupSize('32B');

      // Assert
      expect(cupSize).toEqual('B');
    });

    describe('price', () => {
      it('should get price', () => {
        // Arrange
        const variants: BraVariant[] = [
          { id: 1, price: '68.00', option1: '', option2: '', inventory_quantity: 1 }
        ];

        // Act
        const price = wrapper.instance().getPrice(variants);
  
        // Assert
        expect(price).toEqual('68');
      });

      it('should handle when there is no variants', () => {
        // Arrange
        const variants: BraVariant[] = [];

        // Act
        const price = wrapper.instance().getPrice(variants);
  
        // Assert
        expect(price).toEqual('');
      });
    });

    it('should get images', () => {
      // Arrange
      const expectedImages: BraImage[] = [
        {main: 'https://main', thumbnail: 'https://thumb' }
      ];
      const rawImages = [{
        src100: 'thumb',
        src600: 'other',
        src1000: 'main'
      }];

      // Act
      const images = wrapper.instance().getImages(rawImages);

      // Assert
      expect(images).toEqual(expectedImages);
    });

    it('should get cup sizes by a specific color and band size', () => {
      // Arrange
      const selectedColor = 'naked-3';
      const selectedBandSize = '34';
      const productMap = {
        'naked-3': {
          '34': {
            'C': {
              'name': 'C',
              'stock': '200'
            },
            'name': '34'
          }
        }
      };
      const expectedCupSizes = ['C'];

      // Act
      const cupSizes = wrapper.instance().getCupSizesByBandSize(productMap, selectedColor, selectedBandSize);

      // Assert
      expect(cupSizes).toEqual(expectedCupSizes);
    });

    it('should get band sizes by a selected color', () => {
      // Arrange
      const selectedColor = 'naked-3';
      const productMap = {
        'naked-3': {
          '34': {
            'c': {
              'name': 'C',
              'stock': '200'
            },
            'name': '34'
          }
        }
      };
      const expectedBandSizes = ['34'];

      // Act
      const bandSizes = wrapper.instance().getBandSizesByColor(productMap, selectedColor);

      // Assert
      expect(bandSizes).toEqual(expectedBandSizes);
    });

    it('should update the band and cup sizes on new selected color', () => {
      // Arrange
      const selectedColor = 'naked-3';
      const productMap = {
        'naked-3': {
          '34': {
            'C': {
              'name': 'C',
              'stock': '200'
            },
            'name': '34'
          }
        }
      };
      jest.spyOn(ProductPage.prototype, 'getBandSizesByColor');
      jest.spyOn(ProductPage.prototype, 'getCupSizesByBandSize');

      // Act
      wrapper.instance().updateProductSelection(productMap, selectedColor);

      // Assert
      expect(ProductPage.prototype.getBandSizesByColor).toHaveBeenCalledTimes(1);
      expect(ProductPage.prototype.getCupSizesByBandSize).toHaveBeenCalledTimes(1);
    });

    it('should create product map', () => {
      // Arrange
      // Arrange
      const variants: BraVariant[] = [
        { id: 1, price: '10.00', option1: 'naked-1', option2: '32F', inventory_quantity: 100 },
        { id: 2, price: '20.00', option1: 'naked-2', option2: '34D', inventory_quantity: 9 },
        { id: 3, price: '30.00', option1: 'naked-3', option2: '34C', inventory_quantity: 200 }
      ];
      const expectedProductMap = {
        'naked-1': {
          '32': {
            'F': {
              'name': 'F',
              'stock': 100
            },
            'name': '32',
          }
        },
        'naked-3': {
          '34': {
            'C': {
              'name': 'C',
              'stock': 200
            },
            'name': '34'
          }
        }
      };

      jest.spyOn(ProductPage.prototype, 'getBandSize');
      jest.spyOn(ProductPage.prototype, 'getCupSize');

      // Act
      const productMap = wrapper.instance().createProductMap(variants);

      // Assert
      expect(ProductPage.prototype.getBandSize).toHaveBeenCalledTimes(2);
      expect(ProductPage.prototype.getCupSize).toHaveBeenCalledTimes(2);
      expect(productMap).toEqual(expectedProductMap);
    });

    it('should process data', () => {
      // Arrange
      const mockedData = {
        title: 'title',
        body_html: 'html',
        images: [
          { src100: 'src100-1', src1000: 'src1000-1' },
          { src100: 'src100-2', src1000: 'src1000-2' }
        ],
        variants: [
          { price: '10.00', option1: 'naked-1', option2: '32F', inventory_quantity: '100' },
          { price: '20.00', option1: 'naked-2', option2: '34D', inventory_quantity: '9' },
          { price: '30.00', option1: 'naked-3', option2: '34C', inventory_quantity: '200' }
        ]
      };
      jest.spyOn(ProductPage.prototype, 'createProductMap');
      jest.spyOn(ProductPage.prototype, 'updateProductSelection');
      jest.spyOn(ProductPage.prototype, 'getImages');
      jest.spyOn(ProductPage.prototype, 'getPrice');

      // Act
      wrapper.instance().processData(mockedData);

      // Assert
      expect(ProductPage.prototype.createProductMap).toHaveBeenCalledTimes(1);
      expect(ProductPage.prototype.updateProductSelection).toHaveBeenCalledTimes(1);
      expect(ProductPage.prototype.getImages).toHaveBeenCalledTimes(1);
      expect(ProductPage.prototype.getPrice).toHaveBeenCalledTimes(1);
    });

    it('should handle errors while fetching data', () => {

    });

    it('should avoid those products that dont have enough stock', () => {
      
    });
  });

  describe('Handlers', () => {
    let wrapper: any;
    beforeEach(() => {
      const mockedData = { 
        product: {
          title: 'title',
          body_html: 'html',
          images: [
            { src100: 'src100-1', src1000: 'src1000-1' },
            { src100: 'src100-2', src1000: 'src1000-2' }
          ],
          variants: [
            { price: '10.00', option1: 'naked-1', option2: '32F', inventory_quantity: '100' },
            { price: '20.00', option1: 'naked-2', option2: '34D', inventory_quantity: '9' },
            { price: '30.00', option1: 'naked-3', option2: '34C', inventory_quantity: '200' }
          ]
        }
      };

      (global as any).fetch = jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve(
            mockResponse(200, null, JSON.stringify(mockedData))
          )
        );
      wrapper = mount(<ProductPage/>);
    });

    it('should handle click on add to bag button', () => {
      // Arrange
      jest.spyOn(window, 'alert');
      const expectedMessage = 'Added a title - 32F to the cart';

      // Act
      wrapper.instance().handleAddToBugClick();

      // Assert
      expect(alert).toHaveBeenCalledTimes(1);
      expect(alert).toHaveBeenCalledWith(expectedMessage);
    });

    it('should handle cup size change', () => {
      // Arrange
      
      // Act
      wrapper.instance().handleCupSizeChange('F');

      // Assert
      expect(wrapper.state('selectedCupSize')).toEqual('F');
      expect(wrapper.state('stock')).toEqual('100');
    });

    it('should handle band size change', () => {
      // Arrange
      const expectedCupSizes = ['F'];
      const expectedSelectedCupSize = 'F';
      const expectedStock = '100';

      // Act
      wrapper.instance().handleBandSizeChange('32');

      // Assert
      expect(wrapper.state('selectedBandSize')).toEqual('32');
      expect(wrapper.state('cupSizes')).toEqual(expectedCupSizes);
      expect(wrapper.state('selectedCupSize')).toEqual(expectedSelectedCupSize);
      expect(wrapper.state('stock')).toEqual(expectedStock);
    });

    it('should handle color change', () => {
      // Arrange

      // Act
      wrapper.instance().handleColorChange('naked-3');

      // Assert
      expect(wrapper.state('selectedColor')).toEqual('naked-3');
    });
  });
});