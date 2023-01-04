import React, { useEffect } from "react";
import BreadCrumNav from "../../components/BreadCrumbNav";
import CompanyTable from "../../components/Company/CompanyTable"
import { useTranslation } from "react-i18next";

function Company() {
  const { t } = useTranslation();

  useEffect(() => {
  })


  return (
    <div className="max-w-[75%] m-auto">
      <BreadCrumNav type={t("company")} />
      <div className=" bg-white rounded-2xl">
        <CompanyTable />
      </div>
    </div>
  );
}

export default Company;
