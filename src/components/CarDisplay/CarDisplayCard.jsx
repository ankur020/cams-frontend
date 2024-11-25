import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios';
import { ToastError, ToastSuccess } from '@/services/toastNotification';
import { ToastIcon } from 'react-hot-toast';
const CarDisplayCard = ({car,getAllCars}) => {
    const [deleting, setDeleting] = useState(false);
    const handleDelete = async (id) => {
      setDeleting(true)
      try {
        // cars/deleteCar/67364c20577aeebad3bd7370
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}cars/deleteCar/${id}`,
          {
            withCredentials: true, // Include cookies in the request
          }
        );
        ToastSuccess("Car Deleted")
        location.reload();

      } catch (error) {
        ToastError("Could not delete car")
        console.log(error);
      }
      setDeleting(false);
    };
  return (
    <div key={car._id} className="relative w-full  rounded-sm border border-stroke  p-4 shadow-md dark:border-strokedark dark:bg-boxdark justify-center flex flex-col items-center ">
            <div className="relative w-full flex items-center   min-h-80 min-w-80  max-w-100 max-h-80 py-2  ">
              <img src={car?.images[0]} alt={car?.filename} className="rounded " />
            </div>
            <p className="text-gray-600 text-lg font-normal">{car?.title}</p>
            <div className="flex gap-5 py-2">
              <div className="mt-2">
                <Link
                  href={`/myCars/${car._id}`}
                  className="hidden items-center justify-center rounded-md border border-primary px-10 py-2 text-center font-medium text-primary hover:bg-opacity-90 dark:inline-flex lg:px-8 xl:px-10"
                >
                  View
                </Link>
                <Link
                  target="_blank"
                  href={`${car?.url}`}
                  className="inline-flex items-center justify-center bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 dark:hidden lg:px-8 xl:px-10"
                >
                  View
                </Link>
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  onClick={() => handleDelete(car._id)}
                  className="hidden items-center justify-center rounded-md border border-red px-10 py-2 text-center font-medium text-red hover:bg-opacity-90 dark:inline-flex lg:px-6 xl:px-8"
                  disabled={deleting}
                >
                  {deleting ? "Deleting" : "Delete"}
                </button>
                <button
                  type="submit"
                  onClick={handleDelete}
                  className="inline-flex items-center justify-center bg-meta-3 px-10 py-2 text-center font-medium text-white hover:bg-opacity-90 dark:hidden lg:px-6 xl:px-8"
                  disabled={deleting}
                >
                  {deleting ? "Deleting" : "Delete"}
                </button>
              </div>
            </div>
          </div>
  )
}

export default CarDisplayCard
