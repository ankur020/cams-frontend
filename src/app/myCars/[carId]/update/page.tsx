"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UpdateCarForm from "@/components/UpdateCarForm/UpdateCarForm";
import AuthContext from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/common/Loader";
import Image from "next/image";
import { ToastError } from "@/services/toastNotification";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Buttons from "@/app/ui/buttons/page";
import Link from "next/link";
const SingleTeamPage = () => {
  SwiperCore.use<any>(Navigation);
  const params = useParams<any>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [carDetails, setCarDetails] = useState<any>({});
  const [error, setError] = useState(false);
  const authContext = useContext(AuthContext);
  const getCar = async () => {
    setLoading(true);
    console.log(params.ca)
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}cars/getSingleCar/${params?.carId}`,
        { withCredentials: true },
      );
      console.log(response.data.data);
      setCarDetails(response.data.data);
      setError(false);
    } catch (error: any) {
      ToastError("Could not get Car");
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }

    getCar();
  }, []);
  return (
    <DefaultLayout>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="flex w-[100%] flex-col items-center justify-center gap-1">
          <Image width={400} height={400} src={"/error.png"} alt="error pic" />
          <h1 className="text-2xl font-bold">Something went wrong !</h1>
        </div>
      ) : (
        <>
          <Breadcrumb pageName={`MyCars / ${carDetails.title ? carDetails?.title : "car"} / update `} />
          <UpdateCarForm car={carDetails}/>
        </>
      )}
    </DefaultLayout>
  );
};

export default SingleTeamPage;
