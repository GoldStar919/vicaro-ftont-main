import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
// import { logout } from '../redux/authReducer';
import { Footer } from "flowbite-react"
import { useTranslation } from "react-i18next";

function FooterSite() {
  const { t } = useTranslation();
  const { authState } = useSelector((state) => state);
  const { loggedIn } = authState;

  const [isShow, setIsShow] = useState(false);
  const nowDate = new Date();

  useEffect(() => {
    setIsShow(loggedIn);
  })

  // const logoutSite = () => {
  //   dispatch(logout()).then(navigate('/signin'));
  // }

  return (

    isShow && <Footer container={true} className="max-w-[75%] m-auto">
      <Footer.Copyright
        href="#"
        by={t("project_name")}
        year={nowDate.getFullYear()}
      />
      <Footer.LinkGroup>
        <Footer.Link href="#">
          {t("about")}
        </Footer.Link>
        <Footer.Link href="#">
          {t("privacy_policy")}
        </Footer.Link>
        <Footer.Link href="#">
          {t("licensing")}
        </Footer.Link>
        <Footer.Link href="#">
          {t("contact")}
        </Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

export default FooterSite;
