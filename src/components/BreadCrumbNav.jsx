import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import { Breadcrumb } from "flowbite-react"
import { HiHome } from "react-icons/hi";
import { useTranslation } from "react-i18next";

function BreadCrumbNav(props) {
    const { t } = useTranslation();
    const { globalState, productState, menuState, companyState } = useSelector((state) => state);

    // const { company, role } = userInfo;
    const { selectedCompany } = globalState;

    useEffect(() => {
        // dispatch(getProductTotalCount({ company, role }))
    }, [])

    const { type } = props;
    return (
        <div className="flex justify-between items-center m-4">
            <div>
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item
                        icon={HiHome}
                    >
                        {type}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {selectedCompany} {type}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="text-sm float-left text-sitetx-100">{t("total")} {type == t("products") ? productState.count : type == t("wine_menus") ? menuState.count : type == t("company") && companyState.count} {type}</div>
            </div>
            <div className="flex flex-wrap items-center gap-2">

            </div>
        </div>
    );
}

export default BreadCrumbNav;
