import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import CompanyTableToolbar from "./CompanyTableToolbar";
import CompanyTableNavbar from "./CompanyTableNavbar";
import CompanyTablePagination from "./CompanyTablePagination";
import CompanyTableItem from "./CompanyTableItem";
import { getCompaniesByFilter, getCompanyTotalCount } from '../../redux/companyReducer';
import { setCompanySearchCondition } from '../../redux/globalReducer';
import Loading from "../Global/Loading";
import { useTranslation } from "react-i18next";

function CompanyTable() {
    const { t } = useTranslation();
    const { authState, globalState, companyState } = useSelector((state) => state);
    const { userInfo } = authState;
    const { companiesByFilter, getCompaniesByFilterState, getCompanyTotalCountState } = companyState;

    const dispatch = useDispatch();

    const [condition, setCondition] = useState({
        filterArray: [],
        showCount: 10,
        sortby: "Date Created",
        currentPage: 0,
        activeState: "active",
        isGlobal: userInfo?.role == 0 ? "global" : "company",
        company: userInfo?.company,
        role: userInfo?.role,
        user_id: userInfo?.id
    });

    useEffect(() => {
        dispatch(getCompaniesByFilter(condition));
        dispatch(setCompanySearchCondition({ ...condition }));
    }, [])

    useEffect(() => {
        if (globalState.companyCondition.company) {
            setCondition({ ...globalState.companyCondition });
            dispatch(getCompanyTotalCount(globalState.companyCondition));
        }
    }, [globalState.companyCondition])

    const setHandleCondition = (key, value) => {
        condition[`${key}`] = value;
        setCondition({ ...condition });

        dispatch(setCompanySearchCondition({ ...condition }));
    }

    function getFilterCompany() {//filter
        dispatch(getCompaniesByFilter(condition))
    }

    return (
        <div>
            {(getCompaniesByFilterState || getCompanyTotalCountState) && <Loading />}
            <CompanyTableToolbar setCondition={setHandleCondition} getData={getFilterCompany} condition={condition} />
            <CompanyTableNavbar setCondition={setHandleCondition} getData={getFilterCompany} />

            <div>
                <div className="overflow-x-auto overflow-y-hidden relative shadow-md sm:rounded-lg px-16">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            {
                                companiesByFilter && companiesByFilter.length > 0 ? companiesByFilter.map((data, index) =>
                                    <CompanyTableItem key={data._id} data={data} condition={condition} pos={index} />
                                ) : <tr><td>{t("nodata")}</td></tr>
                            }
                        </tbody>
                    </table>
                </div>

            </div>

            <CompanyTablePagination setCondition={setHandleCondition} getData={getFilterCompany} condition={condition} />
        </div>
    );
}

export default CompanyTable;
