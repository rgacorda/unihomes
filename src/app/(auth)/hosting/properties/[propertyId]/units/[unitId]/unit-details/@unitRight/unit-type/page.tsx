import React from "react";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ArrowLeft } from "lucide-react";

import { getUnitTypeDetails } from "@/actions/unit/getUnitById";

import AdditionalUnitDetailsForm from "./_components/AdditionalUnitDetailsForm";

async function AdditionalUnitDetails({ params }: { params: { propertyId: string; unitId: string } }) {
    const data = await getUnitTypeDetails(params.unitId);
    return (
        <section className="flex flex-col h-[calc(100vh-68px)] w-full px-6 airBnbDesktop:overflow-x-hidden airBnbDesktop:overflow-y-auto airBnbTablet:px-10 min-[1128px]:px-20 airBnbBigDesktop:px-0">
            <header className="airBnbDesktop:mx-auto airBnbDesktop:sticky airBnbDesktop:z-[3] airBnbDesktop:top-0 airBnbDesktop:grow-0 airBnbDesktop:shrink-0 airBnbDesktop:basis-auto airBnbDesktop:pb-5 airBnbDesktop:pt-11 bg-background">
                <div className="flex items-center justify-between w-full px-10 py-6 airBnbDesktop:gap-6 airBnbDesktop:w-[464px] airBnbDesktop:p-0 airBnbBigDesktop:w-[608px] min-[1128px]:w-[512px]">
                    <div className="flex justify-center items-center gap-2">
                        <Link
                            href={`/hosting/properties`}
                            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "rounded-full airBnbDesktop:hidden")}
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <h2 className="m-0 p-0 text-[1em]">
                            <span className="p-1 px-0 text-[2rem] leading-9 tracking-[-0.04rem] font-[500]">Unit type</span>
                        </h2>
                    </div>
                </div>
            </header>

            <div className="grow py-6 airBnbDesktop:pt-0 airBnbDesktop:pb-10">
                <div className="airBnbDesktop:mx-auto airairBnbBigDesktop:w-[608px] min-[1128px]:w-[512px] airBnbDesktop:w-[464px]">
                    <div className="font-normal">
                        <div className="text-base leading-5 tracking-normal my-4 lg:mt-0">
                            Change your unit&apos;s room size and property type here. Click save when you&apos;re done. 
                        </div>
                    </div>
                    <AdditionalUnitDetailsForm unitId={params.unitId} unitDetails={data} />
                </div>
            </div>
        </section>
    );
}

export default AdditionalUnitDetails;
