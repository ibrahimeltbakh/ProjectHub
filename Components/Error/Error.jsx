import React from "react";

export default function Error({ error }) {
  return (
    <div className="container m-auto flex justify-center items-center mt-10 min-h-screen">
      <h3>
        {error?.message || "Something went wrong. Please try again later."}
      </h3>
    </div>
  );
}
