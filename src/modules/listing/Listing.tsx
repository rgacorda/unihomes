'use client';
import React from 'react';
import ResponsiveLayout from '@/components/ResponsiveLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowDownUp, Search } from 'lucide-react';
import ListingCard from './ListingCard';

import { MultiSelect } from '@/components/multi-select';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

const householdAmenities = [
    { value: "wifi", label: "WiFi" },
    { value: "air_conditioning", label: "Air Conditioning" },
    { value: "heating", label: "Heating" },
    { value: "washing_machine", label: "Washing Machine" },
    { value: "dryer", label: "Dryer" },
    { value: "dishwasher", label: "Dishwasher" },
    { value: "refrigerator", label: "Refrigerator" },
    { value: "microwave", label: "Microwave" },
    { value: "oven", label: "Oven" },
    { value: "stove", label: "Stove" },
    { value: "television", label: "Television" },
    { value: "iron", label: "Iron" },
    { value: "vacuum_cleaner", label: "Vacuum Cleaner" },
    { value: "coffee_maker", label: "Coffee Maker" },
    { value: "kettle", label: "Kettle" },
    { value: "toaster", label: "Toaster" },
    { value: "blender", label: "Blender" },
    { value: "hair_dryer", label: "Hair Dryer" },
    { value: "bed_linen", label: "Bed Linen" },
    { value: "towels", label: "Towels" },
];


function Listing() {
	const [selectedFilter, setSelectedFilter] = React.useState<string[]>([]);
	return (
        <ResponsiveLayout className="h-screen mb-32 ">
            <div className="grid grid-cols-2 gap-7">
                <div className="flex col-span-2 py-3 md:flex-row md:justify-between flex-col">
                    <div className="flex">
                        <Input
                            type="text"
                            className="h-9 rounded-r-none mb-3 md:mb-0"
                            placeholder="Address"
                        />
                        <Button asChild size={"sm"} className="rounded-l-none">
                            <span>
                                <Search className="w-4 h-auto mr-1" />
                                Search
                            </span>
                        </Button>
                    </div>
                    <div className="flex">
                        <MultiSelect
                            options={householdAmenities}
                            onValueChange={setSelectedFilter}
                            defaultValue={selectedFilter}
                            placeholder="Select filters"
                            variant="inverted"
                            maxCount={5}
                        />
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="font-bold text-xl">666 rooms found</h1>
                        <Button variant={"outline"}>
                            <div className="flex flex-row gap-1 items-center">
                                <span>Sort by price</span>
                                <ArrowDownUp className="w-4 h-auto" />
                            </div>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-3">
                        <ListingCard />
                        <ListingCard />
                        <ListingCard />
                        <ListingCard />
                        <div className="mt-3 md:col-span-2 place-self-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="/#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="/#" isActive>
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="/#">
                                            2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="/#">
                                            3
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext href="/#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <img
                        src="/luckyHomes.png"
                        alt="lucky homes"
                        className="bg-cover w-full h-auto rounded-xl"
                    />
                </div>
            </div>
        </ResponsiveLayout>
    );
}

export default Listing;
