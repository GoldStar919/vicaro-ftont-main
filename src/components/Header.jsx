import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/authReducer';
import { getAllCompany } from '../redux/locationReducer';
import { setCompanyAndGlobal, setSelectedCompany, setMenuCompanyAndGlobal, setUserCompanyAndGlobal, setNoSavedEditedWineMenuPage } from '../redux/globalReducer';
import { getProductsByFilter, getProductTotalCount } from '../redux/productReducer';
import { getMenusByFilter, getMenuTotalCount } from '../redux/menuReducer';
import { getUsersByFilter, getUserTotalCount } from '../redux/userReducer';
import { useTranslation } from "react-i18next";

import { HiCog, HiLogout } from "react-icons/hi";
import { Navbar, Avatar, Dropdown } from "flowbite-react"
import Cart from "./Cart";
import OrderDetail from "./OrderDetail";
import Language from "./Language";
import { openSnackBar } from '../redux/snackBarReducer';

function Header() {
    const { t } = useTranslation();
    const { authState, locationState, globalState } = useSelector((state) => state);
    const { loggedIn, userInfo } = authState;
    const { companies } = locationState;
    const { noSavedEditedWineMenuPage } = globalState;

    const [isShow, setIsShow] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setIsShow(loggedIn);
    })

    useEffect(() => {
        dispatch(getAllCompany());
        dispatch(setCompanyAndGlobal(userInfo?.company));
        dispatch(setSelectedCompany(userInfo?.role == 0 ? "Global" : "Your Company"))
    }, [userInfo])

    const logoutSite = () => {
        if (noSavedEditedWineMenuPage == false) {
            if (window.confirm("Leave Site?\n\nChanges you made may not be saved.") == true) {
                dispatch(setNoSavedEditedWineMenuPage(true));
                dispatch(logout()).then(() => {
                    dispatch(openSnackBar({ message: t("msg_success_logout"), status: 'success' }));
                    navigate('/signin');
                });
            }
        } else {
            dispatch(logout()).then(() => {
                dispatch(openSnackBar({ message: t("msg_success_logout"), status: 'success' }));
                navigate('/signin');
            });
        }
    }

    const setCompanyForProduct = async (company, isGlobal, position) => {
        await dispatch(setCompanyAndGlobal({ company, isGlobal, position }));
        await dispatch(getProductsByFilter({ ...globalState.condition, company: company, isGlobal: isGlobal ? "global" : "company", currentPage: 0 }));
        await dispatch(getProductTotalCount({ ...globalState.condition, company: company, isGlobal: isGlobal ? "global" : "company", currentPage: 0 }));
    }

    const setCompanyForMenu = async (company, isGlobal, position) => {
        await dispatch(setMenuCompanyAndGlobal({ company, isGlobal, position }));
        await dispatch(getMenusByFilter({ ...globalState.menuCondition, company: company, isGlobal: isGlobal ? "global" : "company", currentPage: 0 }));
        await dispatch(getMenuTotalCount({ ...globalState.menuCondition, company: company, isGlobal: isGlobal ? "global" : "company", currentPage: 0 }));
    }

    const setCompanyForUser = async (company, isGlobal, position) => {
        await dispatch(setUserCompanyAndGlobal({ company, isGlobal, position }));
        await dispatch(getUsersByFilter({ ...globalState.userCondition, company: company, isGlobal: isGlobal ? "global" : "company", currentPage: 0 }));
        await dispatch(getUserTotalCount({ ...globalState.userCondition, company: company, isGlobal: isGlobal ? "global" : "company", currentPage: 0 }));
    }

    const navigateWithoutSave = (whereGO) => {
        if (noSavedEditedWineMenuPage == false) {
            if (window.confirm("Leave Site?\n\nChanges you made may not be saved.") == true) {
                dispatch(setNoSavedEditedWineMenuPage(true));
                navigate(whereGO);
            }
        } else {
            navigate(whereGO);
        }
    }

    return (

        isShow && <div className="max-w-[75%] m-auto">
            <Navbar
                fluid={true}
                rounded={true}
                className="bg-white"
            >
                <Navbar.Brand>
                    <img
                        src="/faviconicontext_onLight.svg"
                        className="mr-3 h-16 sm:h-18"
                        alt="Flowbite Logo"
                    />
                    {/* <span className="flex items-center align-middle mb-6 text-3xl font-bold text-sitetx-50 dark:text-white">
                        vicaro•
                    </span> */}
                </Navbar.Brand>

                <div className="flex md:order-2">
                    <Language />
                    {
                        window.location.href.indexOf("menuedit") != -1 ? <OrderDetail />
                        :
                        <Cart />
                    }
                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {userInfo?.name}
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {userInfo?.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item icon={HiCog}>
                            {t("setting")}
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => logoutSite()} icon={HiLogout}>
                            {t("signout")}
                        </Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                {userInfo?.role == 0 ?   //admin
                    <Navbar.Collapse>
                        <Dropdown
                            arrowIcon={true}
                            inline={true}
                            dismissOnClick={false}
                            label={t("products")}
                        // label={<span className="hover:text-gray-200 text-sitetx-100">Products</span>}
                        // label={<span onClick={() => navigate('products')}>Products</span>}
                        >

                            <Dropdown.Item onClick={() => { navigateWithoutSave('products'); setCompanyForProduct(userInfo?.company, true, "Global") }}>
                                {t("global")}
                            </Dropdown.Item>
                            {
                                companies?.length > 0 && companies.map((data, index) =>
                                    <Dropdown.Item key={index} onClick={() => { navigateWithoutSave('products'); setCompanyForProduct(data._id, false, data.name) }}>
                                        {data.name}
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown>
                        <Dropdown
                            arrowIcon={true}
                            inline={true}
                            // label={<span onClick={() => navigate('menu')}>Wine-Menus</span>}
                            label={t("wine_menus")}
                        // onClick={() => navigate('menu')}
                        >
                            <Dropdown.Item onClick={() => { navigateWithoutSave('menu'); setCompanyForMenu(userInfo?.company, true, "Global") }}>
                                {t("global")}
                            </Dropdown.Item>
                            {
                                companies?.length > 0 && companies.map((data, index) =>
                                    <Dropdown.Item key={index} onClick={() => { navigateWithoutSave('menu'); setCompanyForMenu(data._id, false, data.name) }}>
                                        {data.name}
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown>
                        <Dropdown
                            arrowIcon={true}
                            inline={true}
                            label={t("companies&users")}
                        // onClick={() => navigate('company')}
                        >
                            <Dropdown.Item onClick={() => navigateWithoutSave('company')}>
                                {t("global")}
                            </Dropdown.Item>
                            {
                                companies?.length > 0 && companies.map((data, index) =>
                                    <Dropdown.Item key={index} onClick={() => { navigateWithoutSave('user'); setCompanyForUser(data._id, false, data.name) }}>
                                        {data.name}
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown>
                        <Dropdown
                            arrowIcon={true}
                            inline={true}
                            label={t("database")}
                            onClick={() => navigateWithoutSave('#')}
                        >
                            <Dropdown.Item>
                                {t("global")}
                            </Dropdown.Item>
                            {
                                companies?.length > 0 && companies.map((data, index) =>
                                    <Dropdown.Item key={index}>
                                        {data.name}
                                    </Dropdown.Item>
                                )
                            }
                        </Dropdown>
                    </Navbar.Collapse>
                    :
                    <Navbar.Collapse>
                        <Navbar.Link onClick={() => navigateWithoutSave("products")} className="cursor-pointer">{t("products")}</Navbar.Link>
                        <Navbar.Link onClick={() => navigateWithoutSave("menu")} className="cursor-pointer">{t("wine_menus")}</Navbar.Link>
                        {userInfo?.role == 1 ?
                            <Dropdown
                                arrowIcon={true}
                                inline={true}
                                label="Companys & Users"
                            >
                                <Dropdown.Item onClick={() => navigateWithoutSave('company')}>
                                    {t("company")}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => navigateWithoutSave('user')}>
                                    {t("user")}
                                </Dropdown.Item>
                            </Dropdown>
                            :
                            <Navbar.Link onClick={() => navigateWithoutSave("user")} className="cursor-pointer">{t("companies&users")}</Navbar.Link>
                        }
                        {/* <Navbar.Link onClick={() => navigateWithoutSave("#")} className="cursor-pointer">{t("database")}</Navbar.Link> */}
                    </Navbar.Collapse>
                }

            </Navbar>


            {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Replace with your content -->
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>
          <!-- /End replace -->
        </div>
      </main> */}
        </div>
    );
}

export default Header;
