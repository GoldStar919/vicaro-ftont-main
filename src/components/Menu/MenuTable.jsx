import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import MenuTableToolbar from "./MenuTableToolbar";
import MenuTableNavbar from "./MenuTableNavbar";
import MenuTablePagination from "./MenuTablePagination";
import MenuTableItem from "./MenuTableItem";
import { getMenusByFilter, getMenuTotalCount } from '../../redux/menuReducer';
import { setMenuSearchCondition } from '../../redux/globalReducer';
import Loading from "../Global/Loading";
import { useTranslation } from "react-i18next";

function MenuTable() {
    const { t } = useTranslation();
    const { authState, globalState, menuState } = useSelector((state) => state);
    const { userInfo } = authState;
    const { menusByFilter, getMenusByFilterState, getMenuTotalCountState } = menuState;
    // const { id, company } = userInfo;

    const dispatch = useDispatch();

    const [condition, setCondition] = useState({
        filterArray: [],
        showCount: 10,
        sortby: "Date Created",
        currentPage: 0,
        activeState: "my",
        isGlobal: userInfo?.role == 0 ? "global" : "company",
        company: userInfo?.company,
        role: userInfo?.role,
        user_id: userInfo?.id
    });

    useEffect(() => {
        dispatch(getMenusByFilter(condition));
        dispatch(setMenuSearchCondition({ ...condition }));
    }, [])

    useEffect(() => {
        if (globalState.menuCondition.company) {
            setCondition({ ...globalState.menuCondition });
            dispatch(getMenuTotalCount(globalState.menuCondition));
        }
    }, [globalState.menuCondition])

    const setHandleCondition = (key, value) => {
        condition[`${key}`] = value;
        setCondition({ ...condition });

        dispatch(setMenuSearchCondition({ ...condition }));
    }

    function getFilterMenu() {//filter
        dispatch(getMenusByFilter(condition))
    }

    return (
        <div>
            {getMenusByFilterState || getMenuTotalCountState && <Loading />}
            <MenuTableToolbar setCondition={setHandleCondition} getData={getFilterMenu} condition={condition} />
            <MenuTableNavbar setCondition={setHandleCondition} getData={getFilterMenu} />

            <div>
                <div className="overflow-x-auto overflow-y-hidden relative shadow-md sm:rounded-lg px-16">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            {
                                menusByFilter && menusByFilter.length > 0 ? menusByFilter.map((data, index) =>
                                    <MenuTableItem key={data._id} data={data} condition={condition} pos={index} />
                                ) : <tr><td>{t("nodata")}</td></tr>
                            }
                        </tbody>
                    </table>
                </div>

            </div>

            <MenuTablePagination setCondition={setHandleCondition} getData={getFilterMenu} condition={condition} />
        </div>
    );
}

export default MenuTable;
