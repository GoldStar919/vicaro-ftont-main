import React, { useEffect } from "react";
import BreadCrumNav from "../../components/BreadCrumbNav";
import MenuTable from "../../components/Menu/MenuTable"
import { useTranslation } from "react-i18next";

function Menu() {
  const { t } = useTranslation();

  useEffect(() => {
  })


  return (
    <div className="max-w-[75%] m-auto">
      <BreadCrumNav type={t("wine_menus")} />
      <div className=" bg-white rounded-2xl">
        <MenuTable />
      </div>
    </div>
  );
}

export default Menu;
