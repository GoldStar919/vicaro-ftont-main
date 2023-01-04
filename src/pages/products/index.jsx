import React, { useEffect } from "react";
import BreadCrumNav from "../../components/BreadCrumbNav";
import ProductTable from "../../components/Products/ProductTable";
import { useTranslation } from "react-i18next";

function Product() {
  const { t } = useTranslation();

  useEffect(() => {
  })


  return (
    <div className="max-w-[75%] m-auto">
      <BreadCrumNav type={t("products")} />
      <div className=" bg-white rounded-2xl">
        <ProductTable />
      </div>
    </div>
  );
}

export default Product;
