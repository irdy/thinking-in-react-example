interface Data {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

export const skus: Data[] = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

export interface Sku {
  price: string;
  stocked: boolean;
  name: string;
}

export interface DataGroupByCategories<T> {
  category: string;
  items: T[];
}

export const skusGroupByCategories: DataGroupByCategories<Sku>[] = skus
  .reduce<DataGroupByCategories<Sku>[]>((acc, data) => {
    const { category, ...sku } = data;
    const entry = acc.find((entry) => entry.category === data.category);
    if (entry) {
      entry.items = entry.items.concat(sku);
    } else {
      acc.push({
        category,
        items: [sku]
      });
    }
    return acc;
  }, []);