import { Sku, DataGroupByCategories } from "./sku-store";

export class Filters {
  static filterSku(skuGroupByCategories: DataGroupByCategories<Sku>[], filterItems: (sku: Sku) => boolean) {
    return skuGroupByCategories
      .map((entry) => {
        return {
          category: entry.category,
          items: entry.items.filter(filterItems)
        }
      })
  }
}
