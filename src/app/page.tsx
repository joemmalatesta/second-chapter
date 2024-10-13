"use client"; // This allows the component to use hooks

import Image from "next/image";
import { useEffect, useState } from "react";
import LoginModal from "./components/loginModal";
import Geolocation from "./components/Geolocation";
import NewBookModal from "./components/NewBookModal";
import BooksList from "./components/BooksList";

export default function Home() {

  return (
    <main>
      {/* <LoginModal />
      <Geolocation /> */}
      <NewBookModal />
      <BooksList />
    </main>
  );
}
