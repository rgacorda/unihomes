import { Image, MapPin, PhilippinePeso } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import React from "react";
import Banner from "./Banner";
import ResponsiveLayout from "@/components/ResponsiveLayout";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import ViewImage from "./ViewImage";

function Property() {
    return (
        <ResponsiveLayout className="my-32">
            <div className="grid grid-cols-12">
                <div className="col-span-8 grid grid-cols-12 gap-3 mr-11">
                    {/* images */}
                    <ViewImage
                        className="col-span-9"
                        trigger={
                            <img
                                src="https://picsum.photos/600/400"
                                alt="property image"
                                className="rounded-xl h-auto"
                            />
                        }
                    >
                        <Carousel className="w-screen h-screen">
                            <CarouselContent>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="basis-[100%]" // Make each item take the full width
                                    >
                                        <div className="flex items-center justify-center h-screen w-screen">
                                            <img
                                                src="https://picsum.photos/1000"
                                                alt="property image"
                                                className="object-cover w-full h-full" // Make image fill the screen
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-[2rem] top-1/2 transform -translate-y-1/2 z-10" />
                            <CarouselNext className="absolute right-[2rem] top-1/2 transform -translate-y-1/2 z-10" />
                        </Carousel>
                    </ViewImage>

                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        orientation="vertical"
                        className="col-span-3"
                    >
                        <CarouselContent className=" h-[400px] mb-4 py-4 flex flex-col gap-3">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/4 pt-0"
                                >
                                    <CarouselItem className="pt-0">
                                        {" "}
                                        <img
                                            src="https://picsum.photos/600/400"
                                            alt="property image"
                                            className="rounded-xl h-auto"
                                        />
                                    </CarouselItem>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    {/* title and poster */}
                    <div className="col-span-full mt-9">
                        <div className="space-y-5">
                            <div>
                                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                    Lorem ipsum dolor sit amet consectetur.
                                </h1>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row gap-1 items-center">
                                        <PhilippinePeso className="w-7 h-auto" />
                                        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                                            999 999
                                        </h2>
                                    </div>

                                    <div className="flex flex-row gap-1 items-center">
                                        <MapPin className="w-5 h-auto" />
                                        <p className="text-lg text-muted-foreground">
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3 items-center">
                                    <div className="flex flex-col items-end">
                                        <p className="text-xl leading-7 [&:not(:first-child)]:mt-6">
                                            Jose Rizzal
                                        </p>
                                        <p className="text-md text-muted-foreground">
                                            example@email.com
                                        </p>
                                    </div>
                                    <Avatar className="h-20 w-auto">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* property details */}
                    <div className="col-span-full">
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Quidem temporibus, sunt, cum provident
                            inventore possimus in vitae voluptate voluptatibus
                            aliquid, laboriosam perferendis velit veritatis a
                            iusto. Perspiciatis eius repellendus suscipit id vel
                            veritatis quod quae nisi dolore odit dignissimos
                            accusantium laudantium a consequatur nostrum,
                            tenetur atque excepturi quos obcaecati delectus?
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Adipisci, quod officia, nam sint incidunt hic,
                            laboriosam labore dolorem nemo ratione rerum sit
                            deleniti distinctio odio!
                        </p>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Adipisci id ipsam placeat.
                        </p>
                    </div>
                </div>
                <div className=" col-span-4 flex flex-col gap-9">
                    {/* general */}
                    <div className="flex flex-col ">
                        <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            General
                        </h4>
                        <div className="flex flex-row items-center gap-3 my-3">
                            <Image className="h-9 w-auto" />
                            <div>
                                <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
                                    Ameneties
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                    Amenemenemeneties Lorem, ipsum dolor.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-3 my-3">
                            <Image className="h-9 w-auto" />
                            <div>
                                <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
                                    Ameneties
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                    Amenemenemeneties Lorem, ipsum dolor.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-3 my-3">
                            <Image className="h-9 w-auto" />
                            <div>
                                <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
                                    Ameneties
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                    Amenemenemeneties Lorem, ipsum dolor.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* other info */}
                    <div>
                        <div className="flex flex-col ">
                            <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                Other Information
                            </h4>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center gap-3 my-3">
                                    <Image className="h-9 w-auto" />
                                    <div>
                                        <small className="text-sm font-medium leading-none">
                                            lorem
                                        </small>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-3 my-3">
                                    <Image className="h-9 w-auto" />
                                    <div>
                                        <small className="text-sm font-medium leading-none">
                                            lorem
                                        </small>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-3 my-3">
                                    <Image className="h-9 w-auto" />
                                    <div>
                                        <small className="text-sm font-medium leading-none">
                                            lorem
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* nearby places */}
                    <div>
                        <div className="flex flex-col ">
                            <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                Nearby Places
                            </h4>
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-row items-center gap-3 my-3">
                                    <Image className="h-9 w-auto" />
                                    <div>
                                        <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
                                            Place 1
                                        </h5>
                                        <p className="text-sm text-muted-foreground">
                                            999m away
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-3 my-3">
                                    <Image className="h-9 w-auto" />
                                    <div>
                                        <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
                                            Place 1
                                        </h5>
                                        <p className="text-sm text-muted-foreground">
                                            999m away
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-3 my-3">
                                    <Image className="h-9 w-auto" />
                                    <div>
                                        <h5 className="scroll-m-20 text-lg font-semibold tracking-tight">
                                            Place 1
                                        </h5>
                                        <p className="text-sm text-muted-foreground">
                                            999m away
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* map */}
                    <div>
                        <img
                            src="/luckyHomes.png"
                            alt="lucky homes"
                            className="bg-cover w-full h-auto rounded-xl shadow-xl"
                        />
                    </div>
                </div>
                <div className="col-span-8 mt-9 mr-11">
                    <Banner />
                </div>
            </div>
        </ResponsiveLayout>
    );
}

export default Property;
