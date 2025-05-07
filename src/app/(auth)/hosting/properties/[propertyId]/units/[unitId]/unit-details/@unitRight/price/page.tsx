import React from "react";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ArrowLeft } from "lucide-react";
import { getUnitPrice } from "@/actions/unit/getUnitById";
import UnitPriceForm from "./_components/UnitPriceForm";

async function UnitPricePage({ params }: { params: { propertyId: string; unitId: string } }) {
    const data = await getUnitPrice(params.unitId);
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
                            <span className="p-1 px-0 text-[2rem] leading-9 tracking-[-0.04rem] font-[500]">Unit Pricing</span>
                        </h2>
                    </div>
                </div>
            </header>

            <div className="flex items-center justify-center grow py-6 airBnbDesktop:pt-0 airBnbDesktop:pb-10">
                <div className="airBnbDesktop:mx-auto airairBnbBigDesktop:w-[608px] min-[1128px]:w-[512px] airBnbDesktop:w-[464px] ">
                    <UnitPriceForm price={data.price} unitId={params.unitId} />
                </div>
            </div>
        </section>
    );
}

export default UnitPricePage;
