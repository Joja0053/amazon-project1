import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct (productId) {
  let matchingProduct;

    products.forEach(product => {
        if(product.id === productId) {
            matchingProduct = product;
        }
    });

    return matchingProduct;
}

class Product {
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getRating() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML(){
    return "";
  }
}

class Clothing extends Product {
  
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    super.extraInfoHTML();
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `;
  }
}

export let products = []

export function loadProductFetch() {
  const promise = fetch("https://supersimplebackend.dev/products").then(response => {
    return response.json();
  }).then(productsData => {
    products = productsData.map(productDetails => {
      if(productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    })
  });

  return promise;
}
