"use client";

import React from "react";

import { createBranchSchema } from "@/lib/schemas/createBranchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

import { MultiSelect } from "@/components/multi-select";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";

type CreateBranchSchema = z.infer<typeof createBranchSchema>;

const placesInBaguio = [
    { value: "burnham_park", label: "Burnham Park" },
    { value: "mines_view", label: "Mines View Park" },
    { value: "session_road", label: "Session Road" },
    { value: "botanical_garden", label: "Botanical Garden" },
    { value: "camp_john_hay", label: "Camp John Hay" },
    { value: "wright_park", label: "Wright Park" },
    { value: "the_mansion", label: "The Mansion" },
    { value: "tam_awan_village", label: "Tam-Awan Village" },
    { value: "ben_cab_museum", label: "BenCab Museum" },
    { value: "our_lady_of_lourdes_grotto", label: "Our Lady of Lourdes Grotto" },
    { value: "strawberry_farm", label: "Strawberry Farm" },
    { value: "lion_head", label: "Lion's Head" },
    { value: "good_shepherd", label: "Good Shepherd Convent" },
    { value: "philippine_military_academy", label: "Philippine Military Academy" },
    { value: "igorot_stone_kingdom", label: "Igorot Stone Kingdom" },
    { value: "bell_church", label: "Bell Church" },
    { value: "ukay_ukay_shops", label: "Ukay-Ukay Shops" },
    { value: "bencab_museum", label: "BenCab Museum" },
    { value: "diplomat_hotel", label: "Diplomat Hotel" },
];

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


const AddBranchForm = () => {
    // fetch all nearby places and put in state para magamit with backend

    const createBranchForm = useForm<CreateBranchSchema>({
        resolver: zodResolver(createBranchSchema),
        defaultValues: {
            name: "",
            address: "",
            nearby_places: [],
            ameneties: [],
            house_rules: "",
        },
    });

    function onSubmit(values: CreateBranchSchema) {
        console.log(values);
    }

    return (
        <div className="mt-6">
            <Form {...createBranchForm}>
                <form
                    onSubmit={createBranchForm.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-4">
                            {/* branch name */}
                            <FormField
                                control={createBranchForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Branch Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-8">
                            {/* address */}
                            <FormField
                                control={createBranchForm.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            {/* nearby places */}
                            <FormField
                                control={createBranchForm.control}
                                name="nearby_places"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nearby Places</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                options={placesInBaguio}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                variant="inverted"
                                                animation={2}
                                                maxCount={3}
                                                placeholder="Nearby Places"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            {/* ameneties */}
                            <FormField
                                control={createBranchForm.control}
                                name="ameneties"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ameneties</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                options={householdAmenities}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                variant="inverted"
                                                animation={2}
                                                maxCount={3}
                                                placeholder="Ameneties"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-full">
                            {/* house rules */}
                            <FormField
                                control={createBranchForm.control}
                                name="house_rules"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>House Rules</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default AddBranchForm;
