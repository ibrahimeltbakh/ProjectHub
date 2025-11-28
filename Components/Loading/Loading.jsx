import React from "react";
import { ClipLoader } from "react-spinners";
export default function Loading() {
  return (
    <div className="container m-auto flex justify-center items-center mt-10 min-h-screen">
      <ClipLoader color="#155DFC" />
    </div>
  );
}
