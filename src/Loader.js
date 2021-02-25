import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import constant from './constant';
// import Constants from '../Helpers/Constants';
// import * as Actions from '../Redux/action';
// import Fonts from '../Helpers/Fonts';
// import { useSelector, useDispatch } from "react-redux";
// const dispatch = useDispatch();

const Loader = (props) => {
  // const loading = useSelector(state => state.isLoading);

  // const setLoader = (value) => {
  //   dispatch(Actions.setLoading(value));
  // }

  return (
    <Spinner size="large"
      visible={props.loading}
      color={constant.theme}
      textContent={'Please wait . . .'}
      textStyle={{ color: "white", fontWeight: "700" }}
    />
  )
}

export default Loader;