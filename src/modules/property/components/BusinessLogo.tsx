"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import G1 from "../../../../public/Logo.png";
import Image from "next/image";

export function BusinessLogo() {
  return (
    <>
      <Card className="h-[150px] w-[150px] border-none">
        <CardContent className="flex aspect-square items-center justify-center p-0">
          <Image
            src={G1}
            alt="Logo"
            className="object-cover w-full h-full rounded-md"
          ></Image>
        </CardContent>
      </Card>
    </>
  );
}
