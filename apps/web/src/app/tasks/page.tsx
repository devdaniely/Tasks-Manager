import React from "react";
import Taskbox from "../components/Taskbox";
//import type { GetServerSideProps } from "next";
  
const page = () => {
  return(
    <div>
      <h1>task Page</h1>
      <Taskbox />
    </div>
  )
}

/*
export async function getServerSideProps() {

  const request = await fetch('http://localhost:3000/api/newpage', {cache: "no-store"});
  const data = await request.json();

  return {
    props: { data },
  };
}
  */

export default page;