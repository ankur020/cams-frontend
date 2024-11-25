"use client";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "@/context/Authcontext";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MyCarDisplay from "@/components/MyCarDisplay/MyCarDisplay";
import Loader from "@/components/common/Loader";
import { ToastSuccess, ToastError } from "@/services/toastNotification";

const MyCarsPage = () => {
  const [carDetails, setCarDetails] = useState([]);
  const authContext = useContext(AuthContext);
  const [name, setName] = useState("");
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updated,setUpdate]=useState(false);

  const handleCreateTeam = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}teams/create-team`,
        { name },
        { withCredentials: true }
      );
      if (response.status === 200) {
        ToastSuccess("Team Created");
        setName("");
        setAdded(!added);
      }
    } catch (error: any) {
      console.error(error.response?.data || error);
      ToastError("Error Occurred");
      setName("");
    }
  };

  const getAllCars = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}cars/getAllCars`,
        { withCredentials: true }
      );
      setCarDetails(response.data.data || []);
    } catch (error: any) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!authContext?.user) {
      authContext?.setUserUsingtokens();
    }
    getAllCars();
  }, [added, authContext]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="My Cars" />

      {loading ? <Loader /> : <MyCarDisplay cars={carDetails} getAllcars={getAllCars} />}
    </DefaultLayout>
  );
};

export default MyCarsPage;
