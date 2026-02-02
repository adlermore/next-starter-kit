'use client'

import { JsonContext } from "@/context/JsonContext";
import { useContext } from "react";

export default function Footer() {
  const { contacts } = useContext(JsonContext);
  console.log('contacts', contacts);

  return (
    <footer className="p-20">
      <div className="custom_container">
        Footer
      </div>
    </footer>
  )
}
