import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import UserTableToolbar from "./UserTableToolbar";
import UserTableNavbar from "./UserTableNavbar";
import UserTablePagination from "./UserTablePagination";
import UserTableItem from "./UserTableItem";
import { getUsersByFilter, getUserTotalCount } from '../../redux/userReducer';
import { setUserSearchCondition } from '../../redux/globalReducer';
import Loading from "../Global/Loading";
import { useTranslation } from "react-i18next";

function UserTable() {
    const { t } = useTranslation();
    const { authState, globalState, userState } = useSelector((state) => state);
    const { userInfo } = authState;
    const { usersByFilter, getUsersByFilterState, getUserTotalCountState } = userState;

    const dispatch = useDispatch();

    const [condition, setCondition] = useState({
        filterArray: [],
        showCount: 10,
        sortby: "Date Created",
        currentPage: 0,
        activeState: "company",
        isGlobal: userInfo?.role == 0 ? "global" : "company",
        company: userInfo?.company, //userInfo?.company,
        role: userInfo?.role,
        user_id: userInfo?.id
    });

    useEffect(() => {
        if (userInfo?.role != 0) {
            dispatch(getUsersByFilter(condition));
            dispatch(setUserSearchCondition({ ...condition }));
        }
    }, [])

    useEffect(() => {
        if (globalState.userCondition.company) {
            setCondition({ ...globalState.userCondition });
            dispatch(getUserTotalCount(globalState.userCondition));
        }
    }, [globalState.userCondition])

    const setHandleCondition = (key, value) => {
        condition[`${key}`] = value;
        setCondition({ ...condition });

        dispatch(setUserSearchCondition({ ...condition }));
    }

    function getFilterUser() {//filter
        dispatch(getUsersByFilter(condition))
    }

    return (
        <div>
            {(getUsersByFilterState || getUserTotalCountState) && <Loading />}
            <UserTableToolbar setCondition={setHandleCondition} getData={getFilterUser} condition={condition} />
            <UserTableNavbar setCondition={setHandleCondition} getData={getFilterUser} />

            <div>
                <div className="overflow-x-auto overflow-y-hidden relative shadow-md sm:rounded-lg px-16">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            {
                                usersByFilter && usersByFilter.length > 0 ? usersByFilter.map((data, index) =>
                                    <UserTableItem key={data._id} data={data} condition={condition} pos={index} />
                                ) : <tr><td>{t("nodata")}</td></tr>
                            }
                        </tbody>
                    </table>
                </div>

            </div>

            <UserTablePagination setCondition={setHandleCondition} getData={getFilterUser} condition={condition} />
        </div>
    );
}

export default UserTable;
