import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from "flowbite-react"
import { HiOutlineShoppingCart, HiOutlineCheckCircle, HiHome, HiOutlineTrash } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai"
import { removeAllProductInCart, setCartItemActive } from '../redux/locationReducer';
import { getProductsByFilter, getProductTotalCount } from '../redux/productReducer';
import CartItem from "./Global/CartItem";
import swal from 'sweetalert2';
import { openSnackBar } from '../redux/snackBarReducer';
import { useTranslation } from "react-i18next";
import AddProductInToWineMenu from "./AddProductInToWineMenu";
import Loading from "./Global/Loading";

function ProductTable() {
    const { t } = useTranslation();
    const { globalState, locationState } = useSelector((state) => state);

    const { carts, setCartItemActiveState, getProductsByFilterState } = locationState;
    const { condition } = globalState;
    // const { company, role } = userInfo;
    const dispatch = useDispatch();

    useEffect(() => {
    }, [])

    const emptyCart = () => {
        if (carts.length > 0) {
            swal.fire({
                title: t("swal_are_you_sure"),
                text: t("swal_del_all_product_cart"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: t("swal_delete")
            })
                .then(async result => {
                    if (result.isConfirmed) {
                        let res = await dispatch(removeAllProductInCart());
                        if (res != false) {
                            dispatch(openSnackBar({ message: t("msg_success_remove_all_product_cart"), status: 'success' }));
                        }
                    }
                });
        } else {
            dispatch(openSnackBar({ status: "error", message: "There is no product in basket." }));
        }
    }

    const setActive = () => {
        if (carts.length > 0) {
            swal.fire({
                title: t("swal_are_you_sure"),
                text: t("swal_active_all_product"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: t("swal_active_all")
            })
                .then(async result => {
                    if (result.isConfirmed) {
                        var activeList = []
                        carts.map((data, index) => {
                            activeList = [...activeList, data._id];
                        });

                        let res = await dispatch(setCartItemActive({
                            list: activeList, type: true, dozen: "multi", isGlobal: condition.isGlobal,
                            company: condition.company, role: condition.role, user_id: condition.user_id
                        }));
                        if (res != false) {
                            dispatch(openSnackBar({ message: `${t("success")} ${t("active")} ${t("msg_all_product_cart")}`, status: 'success' }));
                            await dispatch(getProductsByFilter(condition));
                            await dispatch(getProductTotalCount(condition));
                        }

                    }
                });

        } else {
            dispatch(openSnackBar({ status: "error", message: "There is no product in basket." }));
        }
    }

    const setInActive = () => {
        if (carts.length > 0) {
            swal.fire({
                title: t("swal_are_you_sure"),
                text: t("swal_inactive_all_product"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: t("swal_inactive_all")
            })
                .then(async result => {
                    if (result.isConfirmed) {
                        var inActiveList = []
                        carts.map((data, index) => {
                            inActiveList = [...inActiveList, data._id];
                        });

                        let res = await dispatch(setCartItemActive({
                            list: inActiveList, type: false, dozen: "multi", isGlobal: condition.isGlobal,
                            company: condition.company, role: condition.role, user_id: condition.user_id
                        }));
                        if (res != false) {
                            dispatch(openSnackBar({ message: `${t("success")} ${t("inactive")} ${t("msg_all_product_cart")}`, status: 'success' }));
                            await dispatch(getProductsByFilter(condition));
                            await dispatch(getProductTotalCount(condition));
                        }
                    }
                });
        } else {
            dispatch(openSnackBar({ status: "error", message: "There is no product in basket." }));
        }
    }

    const [modalShow, setModalShow] = useState(false);

    return (

        <React.Fragment>
            <div className=" pr-4">
                <Button onClick={() => setModalShow(true)} className="bg-sitebg-50">
                    <HiOutlineShoppingCart className="mr-2 h-6 w-6" />
                    {t("basket")}
                    <div className="bg-white text-sitebg-50 px-2 ml-2 rounded-full">
                        {carts.length}
                    </div>
                </Button>
            </div>
            <Modal
                show={modalShow}
                size="5xl"
                popup={true}
                onClose={() => setModalShow(false)}
            >
                <Modal.Header>
                    {t("basket")}
                </Modal.Header>
                <hr />
                <Modal.Body>
                    {(setCartItemActiveState || getProductsByFilterState) && <Loading />}
                    <div className="py-6">
                        <div>
                            <div className="overflow-x-auto overflow-y-auto relative shadow-md sm:rounded-lg" style={{ maxHeight: "70vh" }}>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <tbody>
                                        {

                                            carts && carts.length > 0 ? carts.map((data, index) =>
                                                <CartItem key={data._id} data={data} pos={index} />
                                            ) : <tr><td>{t("nodata")}</td></tr>
                                        }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <hr />
                <Modal.Footer>
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div>
                                <Button onClick={() => setActive()} className="bg-green-100 text-green-500 hover:bg-green-200">
                                    <HiOutlineCheckCircle className="mr-2 h-5 w-5" />
                                    {t("set_active")}
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="bg-red-100 text-red-500 hover:bg-red-300"
                                    onClick={() => setInActive()}
                                >
                                    <AiOutlineCloseCircle className="mr-2 h-5 w-5" />
                                    {t("set_inactive")}
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="bg-sitebg-200 text-sitetx-200 hover:bg-gray-300"
                                    onClick={() => emptyCart()}
                                >
                                    <HiOutlineTrash className="mr-2 h-5 w-5" />
                                    {t("empty_basket")}
                                </Button>
                            </div>
                        </div>
                        <AddProductInToWineMenu closePrevModal={setModalShow} />
                    </div>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default ProductTable;
