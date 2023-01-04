import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByFilter, getProductTotalCount } from '../../redux/productReducer';
import { setProductSearchCondition } from '../../redux/globalReducer';
import ProductTableToolbar from "./ProductTableToolbar";
import ProductTableNavbar from "./ProductTableNavbar";
import ProductTablePagination from "./ProductTablePagination";
import ProductTableItem from "./ProductTableItem";
import Loading from "../Global/Loading";
import { useTranslation } from "react-i18next";

function ProductTable() {
    const { t } = useTranslation();
    const { authState, globalState, productState } = useSelector((state) => state);
    const { userInfo } = authState;
    const { productsByFilter, getProductsByFilterState, getProductTotalCountState } = productState;

    const dispatch = useDispatch();

    const [condition, setCondition] = useState({
        filterArray: [],
        showCount: 10,
        sortby: "Categorys",
        currentPage: 0,
        activeState: "active",
        isGlobal: userInfo?.role == 0 ? "global" : "company",
        company: userInfo?.company,
        role: userInfo?.role,
        user_id: userInfo?.id
    });

    useEffect(() => {

        dispatch(getProductsByFilter(condition));
        dispatch(setProductSearchCondition({ ...condition }));
        // dispatch(getProductTotalCount(condition));
    }, [])

    useEffect(() => {
        if (globalState.condition.company) {
            setCondition({ ...globalState.condition });
            dispatch(getProductTotalCount(globalState.condition));
        }
    }, [globalState.condition])



    const setHandleCondition = (key, value) => {
        condition[`${key}`] = value;
        setCondition({ ...condition });

        dispatch(setProductSearchCondition({ ...condition }));
    }

    function getFilterProduct() {//filter
        dispatch(getProductsByFilter(condition));
    }

    return (
        <div>
            {(getProductsByFilterState || getProductTotalCountState) && <Loading />}
            <ProductTableToolbar setCondition={setHandleCondition} getData={getFilterProduct} condition={condition} />
            <ProductTableNavbar setCondition={setHandleCondition} getData={getFilterProduct} />

            <div>
                <div className="overflow-x-auto overflow-y-hidden relative shadow-md sm:rounded-lg px-16">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            {
                                productsByFilter && productsByFilter.length > 0 ? productsByFilter.map((data, index) =>
                                    <ProductTableItem key={data._id} data={data} condition={condition} pos={index} />
                                ) : <tr><td>{t("nodata")}</td></tr>
                            }
                        </tbody>
                    </table>
                </div>

            </div>

            <ProductTablePagination setCondition={setHandleCondition} getData={getFilterProduct} condition={condition} />
        </div>
    );
}

export default ProductTable;
