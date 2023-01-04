import React, { useEffect } from "react";
import BreadCrumNav from "../../components/BreadCrumbNav";
import UserTable from "../../components/User/UserTable"
import { useTranslation } from "react-i18next";

function User() {
  const { t } = useTranslation();

  useEffect(() => {
  })


  return (
    <div className="max-w-[75%] m-auto">
      <BreadCrumNav type={t("user")} />
      <div className=" bg-white rounded-2xl">
        <UserTable />
      </div>
    </div>
  );
}

export default User;
