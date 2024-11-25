"use client";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/Authcontext";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MyCarDisplay from "@/components/MyCarDisplay/MyCarDisplay";
import { ToastSuccess, ToastError } from "@/services/toastNotification";
import Loader from "@/components/common/Loader";
import CreateCarForm from "@/components/CreateNewCarForm/CreateCarForm";

const MyCarsPage = () => {

  const authContext = useContext(AuthContext);


  useEffect(() => {
    if (!authContext?.user) {
      authContext?.setUserUsingtokens();
    }
    
  }, [authContext]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Cars" />
     
      <CreateCarForm/>
    </DefaultLayout>
  );
};

export default MyCarsPage;
