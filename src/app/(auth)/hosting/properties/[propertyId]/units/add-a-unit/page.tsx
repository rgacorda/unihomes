"use client";

import React from "react";
import { createEmptyUnit } from "@/actions/unit/create-empty-unit";
import { Button } from "@/components/ui/button";
import { ChevronRight, Copy, House, HousePlus } from "lucide-react";

function AddUnitPage({params}: {params: {propertyId: string}}) {
    return (
        <div className="max-w-3xl mx-auto py-16">
            <div className="flex flex-col justify-between max-w-[623px] mx-auto overflow-visible">
                <div className="mb-8 max-w-[623px]">
                    <h1 className="text-[2rem] leading-9 font-normal break-words">Create a unit</h1>
                </div>
                <div className="w-full">
                    <div className="pb-16 w-full ">
                        <h2 className="mb-4 text-[1.375rem] leading-[1.625rem]">Finish your listing</h2>
                        <div role="group" className="pb-3 w-full ">
                            <Button className="text-[1rem] leading-5 font-normal w-full justify-start py-11 px-5" variant="outline">
                                <span className="flex flex-row items-center justify-start">
                                    <span className="mr-2">
                                        <House className="size-6" />
                                    </span>
                                    <span className="flex-1 ">Current listing</span>
                                </span>
                            </Button>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="w-full">
                            <h2 className="mb-4 text-[1.375rem] leading-[1.625rem]">Create a new unit</h2>

                            <div role="group">
                                <div className="w-full">
                                    <div className="py-6 border-b">
                                        <div className="flex items-center">
                                            <div className="mr-4">
                                                <HousePlus size={32} />
                                            </div>
                                            <div className="flex flex-col justify-center flex-auto w-full">
                                                <Button
                                                    variant="ghost"
                                                    className="text-[1rem] leading-5 font-normal hover:bg-transparent"
                                                    onClick={async () => {
                                                        await createEmptyUnit(params.propertyId);
                                                    }}
                                                >
                                                    <span className="text-left inline-flex justify-between items-start w-full min-h-5">
                                                        <div>Create new unit</div>
                                                        <span>
                                                            <ChevronRight size={16} />
                                                        </span>
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="py-6 border-b">
                                        <div className="flex items-center">
                                            <div className="mr-4">
                                                <Copy size={32} />
                                            </div>
                                            <div className="flex flex-col justify-center flex-auto w-full">
                                                <Button variant="ghost" className="text-[1rem] leading-5 font-normal hover:bg-transparent">
                                                    <span className="text-left inline-flex justify-between items-start w-full min-h-5">
                                                        <div>Create from an existing listing</div>
                                                        <span>
                                                            <ChevronRight size={16} />
                                                        </span>
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUnitPage;
