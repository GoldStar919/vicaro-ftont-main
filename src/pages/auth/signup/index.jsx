import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
// import { registerUser } from '../../../redux/authReducer';
import { useDispatch } from 'react-redux'
import { openSnackBar } from '../../../redux/snackBarReducer';
import { useTranslation } from "react-i18next";
import Validator from 'validator';

export default function Index() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const clickSignUpBtn = () => {
    if (email == '') {
      dispatch(openSnackBar({ status: "warning", message: t("msg_fill_email") }))
      return false;
    } else {
      if (!Validator.isEmail(email)) {
        dispatch(openSnackBar({ status: "warning", message: t("msg_invalid_email") }))
        return false;
      }
    }
    if (password == '') {
      dispatch(openSnackBar({ status: "warning", message: t("msg_fill_password") }))
      return false;
    }
    return true;
  }

  return (
    <div className='flex p-6 items-center justify-center text-2xl'>
      <div>
        <h1 className='text-3xl my-6 text-center' >{t("signup_page")}</h1>
        <div>
          <TextField fullWidth label="Email" id="fullWidth1" onChange={e => setEmail(e.target.value)} />
          <TextField fullWidth label="Password" id="fullWidth" type="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <div className='mt-3 justify-center flex'>
          <div className='mx-2'>
            <Button variant='contained' color="primary" onClick={() => clickSignUpBtn()}>{t("signup")}</Button>
          </div>
          <Link className='mx-2' to="/signin">
            <Button variant='contained' color="secondary" >{t("go_to_login_page")}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
