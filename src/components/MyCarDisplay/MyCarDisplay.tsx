import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import CarDisplayCard from "@/components/CarDisplay/CarDisplayCard";
import { redirect } from 'next/navigation'
const MyCarDisplay = ({ cars , getAllCars }: { cars: any[] , getAllCars : any }) => {
  console.log(cars)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {cars?.map((car) => (
          <CarDisplayCard getAllCars car={car}/>
        ))}
      </div>
    </>
  );
};

export default MyCarDisplay;
