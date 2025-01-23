"use client";
import React, { useState, ReactNode } from "react";
import Header from "@/components/Header-Basic";

export default function OutLayout({
  children,
}: {
  children: React.ReactNode;
}) {  
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <Header />
      
      <div className="login-out bg-white" >       

        {/* <!-- ===== Main Content Start ===== --> */}
        <main className="w-1/3 h-full">
          <div className="mt-25">
            {children}
          </div>
        </main>
        {/* <!-- ===== Main Content End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}