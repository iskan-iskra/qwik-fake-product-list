import {
  $,
  component$,
  useComputed$,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { useAsyncRequest, useMultipleSelect, useSingleSelect } from "@hooks";
import { TiCatalog, TiProduct, TiProductListsDic } from "@types";
import { fetchJson, measureExecutionTime, withDelay } from "@utils";
import { AppButton, AppCard, AppError, AppList, AppLoader } from "@components";
import style from "./style.module.css";

export default component$(() => {
  const productCatalog = useStore<TiCatalog<TiProductListsDic, TiProduct[]>>({
    singleSelect: [],
    multiSelect: [],
  });

  const fetchJsonWithDelay = withDelay<TiProduct[]>(fetchJson);

  const getProductCatalog = $(async () => {
    const [data1, data2] = await Promise.all([
      fetchJsonWithDelay("/mock-data-1.json"),
      fetchJsonWithDelay("/mock-data-2.json"),
    ]);
    productCatalog.multiSelect = data1;
    productCatalog.singleSelect = data2;
  });

  const getProductCatalogWithTimeMeasure =
    measureExecutionTime(getProductCatalog);

  const { errorMessage, isLoading, requestHandler } = useAsyncRequest(
    getProductCatalogWithTimeMeasure
  );

  const {
    selectedList: selectedProductList,
    selectRestrictionCount: selectedProductListRestrictionCount,
    addItem: addToSelectedProductList,
    removeItem: removeFromSelectedProductList,
    clearSelected: clearSelectedProductList,
    isAvailable: isAvailableForAddToSelectedProductList,
  } = useMultipleSelect<TiProduct, "id">("id", 6);

  const {
    selected: selectedProduct,
    addItem: selectProduct,
    removeItem: unselectProduct,
    isAvailable: isAvailableProduct,
  } = useSingleSelect<TiProduct, "id">("id");

  const selectedProductListCount = useComputed$<string | null>(() =>
    selectedProductList.length
      ? `selected: ${selectedProductList.length} / ${selectedProductListRestrictionCount}`
      : null
  );

  useTask$(() => {
    requestHandler();
  });

  return (
    <>
      <header class={style.header}>
        <AppList
          title={<h3>selected:</h3>}
          list={
            !!selectedProduct && (
              <AppCard
                name={selectedProduct.name}
                actions={
                  <AppButton onClick$={unselectProduct}>remove</AppButton>
                }
              />
            )
          }
        />
        <AppList
          title={<h3>selected-list:</h3>}
          list={
            !!selectedProductList.length &&
            selectedProductList.map((item) => (
              <AppCard
                key={item.id}
                name={item.name}
                actions={
                  <AppButton
                    onClick$={() => removeFromSelectedProductList(item)}
                  >
                    remove
                  </AppButton>
                }
              />
            ))
          }
          listActions={
            !!selectedProductList.length && (
              <>
                <h4>{selectedProductListCount.value}</h4>

                <AppButton onClick$={clearSelectedProductList}>clear</AppButton>
              </>
            )
          }
        />
      </header>

      {isLoading && <AppLoader />}

      {errorMessage && <AppError>{errorMessage}</AppError>}

      {!isLoading && !errorMessage && productCatalog && (
        <main class={style.main}>
          <AppList
            title={<h3>Items single-select:</h3>}
            list={productCatalog.singleSelect.map((item) => (
              <AppCard
                key={item.id}
                name={item.name}
                actions={
                  <AppButton
                    disabled={!isAvailableProduct(item)}
                    onClick$={() => selectProduct(item)}
                  >
                    select
                  </AppButton>
                }
              />
            ))}
          />
          <AppList
            title={<h3>Items multi-select:</h3>}
            list={productCatalog.multiSelect.map((item) => (
              <AppCard
                key={item.id}
                name={item.name}
                actions={
                  <AppButton
                    disabled={!isAvailableForAddToSelectedProductList(item)}
                    onClick$={() => addToSelectedProductList(item)}
                  >
                    add to list
                  </AppButton>
                }
              />
            ))}
          />
        </main>
      )}
    </>
  );
});
