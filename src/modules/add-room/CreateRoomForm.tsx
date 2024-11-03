"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { map, z } from "zod";
import { createRoomSchema } from "@/lib/schemas/createRoomSchema";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    useFormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, MoveLeft, MoveRight } from "lucide-react";

type CreateRoomSchema = z.infer<typeof createRoomSchema>;

const CreateRoomForm = () => {
    const createRoomForm = useForm<CreateRoomSchema>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            room_number: 0,
            room_capacity: 0,
            room_price: 0,
            room_size: 0
        },
    });

    function onSubmit(values: CreateRoomSchema) {
        console.log(values);
    }

    return (
        <div>
            <Form {...createRoomForm}>
                <form
                    onSubmit={createRoomForm.handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-3"
                >
                    {/* number */}
                    <FormField
                        control={createRoomForm.control}
                        name="room_number"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Room Number</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        {...createRoomForm.register(
                                            "room_number",
                                            { valueAsNumber: true }
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* room name */}
                    <FormField
                        control={createRoomForm.control}
                        name="room_name"
                        render={({ field }) => (
                            <FormItem className="col-span-9">
                                <FormLabel>Room Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* room price */}
                    <FormField
                        control={createRoomForm.control}
                        name="room_price"
                        render={({ field }) => (
                            <FormItem className="col-span-4">
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        {...createRoomForm.register(
                                            "room_price",
                                            { valueAsNumber: true }
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* capacity */}
                    <FormField
                        control={createRoomForm.control}
                        name="room_capacity"
                        render={({ field }) => (
                            <FormItem className="col-span-4">
                                <FormLabel>Capacity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        {...createRoomForm.register(
                                            "room_capacity",
                                            { valueAsNumber: true }
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* size */}
                    <FormField
                        control={createRoomForm.control}
                        name="room_size"
                        render={({ field }) => (
                            <FormItem className="col-span-4">
                                <FormLabel>Size</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        {...createRoomForm.register(
                                            "room_size",
                                            { valueAsNumber: true }
                                        )}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* description */}

                    <FormField
                        control={createRoomForm.control}
                        name="room_description"
                        render={({ field }) => (
                            <FormItem className="col-span-full">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="col-span-full">
                        <Button type="submit" className="w-full md:w-max">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreateRoomForm;
