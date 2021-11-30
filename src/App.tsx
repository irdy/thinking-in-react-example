import React from 'react';
import { Table, TableCell, TableRow, TableRowLikeHeading } from "./ui/table";
import { Sku, skusGroupByCategories } from "./sku-store";
import { Search } from "./ui/search";
import { Utils } from "./utils";
import { Filters } from "./filters";

enum SkuFormNames {
  SKU_FILTERS_SEARCH = 'sku-filters-search',
  SKU_FILTER_IN_STOCK = 'sku-filter-in-stock'
}

type SkuFormValues = Record<SkuFormNames, string | boolean>;

function App() {
  const tableHeadingsRef = React.useRef<string[]>(["Name", "Price"]);

  const [skuFormValues, setSkuFormValues] = React.useState<SkuFormValues>({
    [SkuFormNames.SKU_FILTERS_SEARCH]: "",
    [SkuFormNames.SKU_FILTER_IN_STOCK]: false
  });

  const onFormValueChange = React.useCallback((e) => {
    const target = e.target;
    const {name} = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setSkuFormValues({
      ...skuFormValues,
      [name]: value
    })
  }, [skuFormValues, setSkuFormValues]);

  const searchFilterValue = skuFormValues[SkuFormNames.SKU_FILTERS_SEARCH];
  const inStockFilterValue = skuFormValues[SkuFormNames.SKU_FILTER_IN_STOCK];

  /**
   *  Filter Function.
   *  - Firstly, filter by search-string
   *  - Secondly, optional filter by in-stock flag.
   *  -- If in-stock checked match all entries with "stocked" is `true`
   *  -- Else (in-stock is not checked) skip filter (return true)
   * @param sku
   */
  const filterItems = (sku: Sku) => {
    return sku["name"].toLocaleLowerCase().includes((searchFilterValue as string).toLocaleLowerCase())
      && (inStockFilterValue ? sku["stocked"] === inStockFilterValue : true)
  }

  return (
    <div className={`container`}>
      <div className={"flex-center"}>
        <form className="sku-filters">
          <div className="form-group">
            <Search
              className={`${SkuFormNames.SKU_FILTERS_SEARCH} text-mid`}
              value={skuFormValues[SkuFormNames.SKU_FILTERS_SEARCH] as string}
              onChange={onFormValueChange}
              name={SkuFormNames.SKU_FILTERS_SEARCH}
            />
          </div>
          <div className="form-group">
            <input
              className={`${SkuFormNames.SKU_FILTER_IN_STOCK}`}
              checked={skuFormValues[SkuFormNames.SKU_FILTER_IN_STOCK] as boolean}
              name={SkuFormNames.SKU_FILTER_IN_STOCK}
              id="sku-filter-in-stock"
              type="checkbox"
              onChange={onFormValueChange}
            />
            <label htmlFor="sku-filter-in-stock">
              {Utils.translate("Only show products in stock")}
            </label>
          </div>
        </form>
      </div>

      <div className={"flex-center"}>
        <Table extraClass={"skus-table"} tableHeadings={tableHeadingsRef.current}>
          {
            Filters
              .filterSku(skusGroupByCategories, filterItems)
              .filter((group) => {
                return group.items.length > 0 // show only categories with items
              })
              .map((group) => {
                return (
                  <React.Fragment key={group.category}>
                    <TableRowLikeHeading columnCount={2}>
                      {group.category}
                    </TableRowLikeHeading>
                    {
                      group.items.map((sku) => (
                        <TableRow key={sku.name}>
                          <TableCell>
                            <span className={!sku.stocked ? 'skus-table-out-of-stock' : ''}>{sku.name}</span>
                          </TableCell>
                          <TableCell>
                            {sku.price}
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </React.Fragment>
                )
              })
          }
        </Table>
      </div>
    </div>
  );
}

export default App;
