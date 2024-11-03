"use client";

import React from "react";

import { editLessorAccountSchema } from "@/lib/schemas/editLessorAccountSchema";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
   
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

type EditLessorAccountSchema = z.infer<typeof editLessorAccountSchema>;

const AccountSettings = () => {
    
    const editAccountSettingsForm = useForm<EditLessorAccountSchema>({
        resolver: zodResolver(editLessorAccountSchema),
        defaultValues: {
        },
    });

    function onSubmit(values: EditLessorAccountSchema) {
        console.log(values);
    }

    return (
        <div className="col-span-full">
            <Form {...editAccountSettingsForm}>
                <form
                    onSubmit={editAccountSettingsForm.handleSubmit(onSubmit)}
                    className="grid grid-cols-12 gap-3"
                >
                    {/* name */}
                    <FormField
                        control={editAccountSettingsForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="col-span-4">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* address */}
                    <FormField
                        control={editAccountSettingsForm.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem className="col-span-8">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* logo */}
                    <FormField
                        control={editAccountSettingsForm.control}
                        name="logo"
                        render={({
                            field: { value, onChange, ...fieldProps },
                        }) => (
                            <FormItem className="col-span-4">
                                <FormLabel>Logo</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        {...fieldProps}
                                        onChange={(event) =>
                                            onChange(
                                                event.target.files &&
                                                    event.target.files[0]
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* property type */}
                    <FormField
                        control={editAccountSettingsForm.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="col-span-4">
                                <FormLabel>Property Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Apartment">
                                            Apartment
                                        </SelectItem>
                                        <SelectItem value="Condominium">
                                            Condominium
                                        </SelectItem>
                                        <SelectItem value="Dormitory">
                                            Dormitory
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* about */}
                    <FormField
                        control={editAccountSettingsForm.control}
                        name="about"
                        render={({ field }) => (
                            <FormItem className="col-span-full">
                                <FormLabel>About</FormLabel>
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
                        <Button type="submit" className="w-full md:w-max">
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default AccountSettings