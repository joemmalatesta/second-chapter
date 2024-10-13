"use client"; // This allows the component to use hooks

import Image from "next/image";
import { useState } from "react";
import LoginModal from "./components/loginModal";
import Geolocation from "./components/Geolocation";
import NewBookModal from "./components/NewBookModal";

export default function Home() {
  return (
    <main>
      {/* <LoginModal /> */}
      <Geolocation />
      <NewBookModal />
    </main>
  );
}
