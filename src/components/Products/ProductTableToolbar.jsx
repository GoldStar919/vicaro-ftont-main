import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { HiOutlineSearch } from "react-icons/hi";
import { FaRegTimesCircle, FaTimes } from "react-icons/fa"
import NewProduct from "./NewProduct";
import AddFilter from "./AddFilter";
import { openSnackBar } from '../../redux/snackBarReducer';
import { useTranslation } from "react-i18next";
import { TextInput } from "flowbite-react"

function ProductTableToolbar(props) {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getProductTotalCount({ company, role }))
    }, [])

    const [search, setSearch] = useState("");   //search bar text 
    const [filterArray, setFilterArray] = useState([]);

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

    const keyDownSearch = (e) => {
        var flag = false;
        if (e.keyCode == 13) {
            if (search.trim()) {
                if (filterArray.length > 0) {
                    filterArray.map(data => {
                        if (data.type == "text" && data.value == search.trim()) {
                            flag = true;
                        } else {
                            flag = false;
                        }
                    })
                }
                if (!flag) {
                    setFilterArray([...filterArray, { type: "text", value: search.trim() }]);
                    setSearch("");

                    const { setCondition, getData } = props;
                    setCondition("filterArray", [...filterArray, { type: "text", value: search.trim() }]);
                    setCondition("currentPage", 0);
                    getData();
                } else {
                    dispatch(openSnackBar({ status: "error", message: t("msg_filter_name_exist") }));
                }
            }
        }
    }

    const addFilterArray = (data) => {
        var tmpFilterArray = [];
        for (let filter in data) {
            if (filter == "alc_vol" || filter == "wine_acid" || filter == "residual_sugar") {
                if (data[`${filter}`][0] != 0 || data[`${filter}`][1] != 100)
                    tmpFilterArray = [...tmpFilterArray, { type: filter, value: data[`${filter}`][0] + "," + data[`${filter}`][1] }];
            } else if (data[`${filter}`] && data[`${filter}`].length > 0) {
                data[`${filter}`].map((item) => {
                    var flag = false;
                    if (filterArray.length > 0) {
                        for (let i = 0; i < filterArray.length; i++) {
                            if (filterArray[i].type == filter && filterArray[i].value == item.label) {
                                flag = true;
                                break;
                            } else {
                                flag = false;
                                break;
                            }
                        }
                    }
                    if (!flag) {
                        tmpFilterArray = [...tmpFilterArray, { type: filter, value: item.label, id: item.value }];
                    } else {
                        // dispatch(openSnackBar({ status: "error", message: t("msg_filter_name_exist") }));
                    }
                })
            }

        }
        setFilterArray([...filterArray, ...tmpFilterArray]);
        const { setCondition, getData } = props;
        setCondition("filterArray", [...filterArray, ...tmpFilterArray]);
        setCondition("currentPage", 0);
        getData();
    }

    const removeSelectedFilter = (index) => {
        filterArray.splice(index, 1);
        setFilterArray([...filterArray]);

        const { setCondition, getData } = props;
        setCondition("filterArray", [...filterArray]);
        setCondition("currentPage", 0);
        getData();
    }

    const removeAllFilter = () => {
        setFilterArray([]);

        const { setCondition, getData } = props;
        setCondition("filterArray", []);
        setCondition("currentPage", 0);
        getData();
    }

    return (
        <div>
            <div className="grid grid-cols-3">
                <div className="p-8 col-span-2 ">
                    <TextInput
                        id="searchProduct"
                        type="search"
                        sizing="lg"
                        placeholder={t("what_are_looking")}
                        required={true}
                        icon={HiOutlineSearch}
                        value={search}
                        onChange={(e) => changeSearch(e)}
                        onKeyDown={(e) => keyDownSearch(e)}
                    />
                </div>
                <div className="flex gap-4 p-9 col-span-1">
                    <AddFilter addFilterArray={addFilterArray} />
                    <NewProduct condition={props.condition} />
                </div>
            </div>
            <div className="flex gap-4">
                {
                    filterArray?.length > 0 &&
                    <div className="flex pl-12 pt-3" >
                        <FaRegTimesCircle onClick={() => removeAllFilter()} className="mr-2 h-4 w-4 text-sitebg-50" />
                        <u className="text-xs text-sitebg-50">{t("remove_all_tag")}</u>
                    </div>
                }
                <div className="flex flex-wrap gap-4">
                    {
                        filterArray.map((data, i) =>
                            <div key={i} className="bg-gray-200 text-gray-700 font-medium leading-tight rounded-xl shadow-md cursor-pointer">
                                <div className="flex p-2">
                                    <p>{data.type != "text" && `${data.type}:`}
                                        <b className="text-sm"> "{data.value}"</b>
                                    </p>
                                    <FaTimes onClick={() => removeSelectedFilter(i)} className="ml-2 h-4 w-4 mt-1" />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductTableToolbar;
