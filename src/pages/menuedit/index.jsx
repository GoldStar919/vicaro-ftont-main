import React, { useEffect } from "react";
import BreadCrumNav from "../../components/BreadCrumbNav";
import MenuEdit from "../../components/MenuEdit/MenuEdit"
import { useTranslation } from "react-i18next";

function EditMenu() {
  const { t } = useTranslation();

  useEffect(() => {
  }, [])

  return (
    <div className="max-w-[75%] m-auto">
      <BreadCrumNav type={t("menu_edit")} />
      <div className=" bg-white rounded-2xl">
        <MenuEdit />
      </div>
    </div>
  );
}

export default EditMenu;
