"use client";
import { useContext, useEffect } from "react";
import Image from "next/image";
import AuthContext from "@/context/Authcontext";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChangePasswordForm from "@/components/ChangePassword/ChangePasswordForm";
import ChangePersonalInfo from "@/components/ChangePersonalInformation/ChangePersonalInfo";

const Settings = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext?.user == null) {
      authContext?.setUserUsingtokens();
    }
  }, [authContext?.user, authContext]);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5" >
            <ChangePersonalInfo />
          </div>
        <div className="col-span-5 ">
          <ChangePasswordForm />
        </div>
        </div>




      </div>
    </DefaultLayout>
  );
};

export default Settings;
