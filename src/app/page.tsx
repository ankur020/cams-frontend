"use client";
import Link from "next/link";
import Image from "next/image";
import AuthContext from "@/context/Authcontext";
import { useContext } from "react";

export default function Home() {
  const authcontext = useContext(AuthContext);
  return (
    <>
      <div className="min-h-screen w-full bg-black dark:text-white">
        <section className="min-w-100 justify-between items-center">
          <div className="px-2 sm:px-14 md:pt-6">
            <nav className="flex items-center justify-between px-1 py-2">
              <div className="flex items-center">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="flex gap-3 text-2xl font-semibold text-white"
                  >
                    <Image
                      width={32}
                      height={32}
                      src={"/images/logo/logo-icon.svg"}
                      alt="Logo"
                      priority
                    />
                    <div>CAMS</div>
                  </Link>
                </div>

              </div>
              {authcontext?.user == null ? (
                <div className=" flex gap-2  whitespace-nowrap  rounded-xl  py-3">
                  <Link
                    href={"/auth/signin"}
                    className="text rounded-lg border  border-primary bg-transparent px-4 py-1 text-primary"
                  >
                    Login
                  </Link>
                  <Link
                    href={"/auth/signup"}
                    className="text rounded-lg border  border-primary bg-transparent px-4 py-1 text-primary"
                  >
                    Signup
                  </Link>
                </div>
              ) : (
                <Link
                  href={"/myCars"}
                  className="text rounded-lg border  border-primary bg-transparent px-4 py-1 text-primary"
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </div>

          <div className="px-6 py-28 sm:px-14 xl:px-40">
            <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex max-w-xl flex-col text-left sm:items-center sm:text-center lg:items-start lg:text-left">
                <h1 className="text-5xl font-bold tracking-tight text-white  sm:text-6xl md:text-7xl lg:max-w-lg ">
                  CAR MANAGEMENT SYSTEM
                </h1>
                <p className="text-gray-300 font-inter pr-12 pt-7 text-base leading-relaxed text-white sm:pr-0 sm:text-lg lg:max-w-lg">
                  The Car Management System allows users to create, view, edit, and delete car listings. Each car listing includes up to 10 images, a title, a description, and tags such as car type, company, and dealer. This system includes secure user authentication and only allows users to manage their own car listings. Users can also search for cars based on attributes such as title, tags, and more.
                </p>
                <div className="flex min-w-full flex-col space-y-4 pt-10 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                  <Link
                    href={"/auth/signin"}
                    className="bg-green whitespace-nowrap rounded-xl border border-primary px-6 py-3 font-bold text-primary"
                  >
                    TRY IT OUT
                  </Link>
                </div>

              </div>
              <div className="w-full pt-10 md:flex md:justify-center lg:block lg:pl-20 lg:pt-0">
                <Image
                  width={500}
                  height={400}
                  src={"/illustration-1.svg"}
                  alt="Logo"
                  priority
                />
              </div>
            </div>
          </div>
        </section>



        <footer className=" dark:bg-gray-800 rounded-lg pt-2  shadow">
          <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-center">
              © 2024{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                CAMS By Ankur Yadav
              </a>
              . All Rights Reserved.
            </span>
            <ul className="text-gray-500 dark:text-gray-400 mt-3 flex flex-wrap items-center text-sm font-medium sm:mt-0"></ul>
          </div>
        </footer>
      </div>
    </>
  );
}
