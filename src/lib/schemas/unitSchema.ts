import z from "zod";

export const unitSchema = z.object({
    price: z.number({ required_error: "Please enter a price.", message: "Please enter a valid price." }).min(1, { message: "Please enter a price." }).max(100000, {message: "Price must not exceed 100, 000 pesos"}),
    title: z.string({required_error: "Please enter a title."}).min(2, { message: "Title cannot be less than 2 characters." }).max(50, "Title cannot exceed 50 characters."),
    privacy_type: z.string().min(2, { message: "Please select a privacy type." }),
    bedrooms: z.number({ required_error: "Please enter a bedroom number.", message: "Please enter a valid number of bedrooms." }).min(1, { message: "Please enter a valid number of bedrooms." }),
    occupants: z.number({ required_error: "Please enter a occupant count.", message: "Please enter a valid number of occupants." }).min(1, { message: "Please enter a valid number of occupants." }),
    beds: z.number({ required_error: "Please enter a number of beds.", message: "Please enter a valid number of beds." }).min(1, { message: "Please enter a valid number of beds." }),
    outside_view: z.boolean().default(false),
    room_size: z.number({ required_error: "Please enter a room size.", message: "Please enter a valid room size." }).min(1, { message: "Room size should not be less than 1." }).max(9999, { message: "Maximum size exceeded." }),
    amenities: z
        .array(
            z.object(
                {
                    value: z.string().transform((val) => parseInt(val)),
                    label: z.string(),
                },
                {
                    required_error: "Please select at least one amenity.",
                }
            ),
            { required_error: "Please select at least one amenity.", message: "Please select at least one amenity." }
        )
        .min(1, "At least one amenity must be selected."),

    additional_amenities: z
        .array(
            z.object(
                {
                    id: z.string(),
                    text: z
                        .string({ message: "Please enter a valid amenity." })
                        .min(1, { message: "Amenity name too short." })
                        .max(52, { message: "Amenity name too long." }),
                },
                {
                    message: "Amenity object shape is invalid.",
                }
            ),
            {
                message: "Amenity is not an array.",
            }
        )
        .optional(),
    image: z.array(z.string({ required_error: "Please add at least one image." })).min(1, "At least one image must be added.").nonempty({ message: "Please add at least one image." }),
});


export const unitTitleSchema = z.object({
    unit_title: z.string().min(1, { message: "Please enter a title." }).max(52),
});

export const unitTypeSchema = z.object({
    privacy_type: z.string().min(2, { message: "Please select a privacy type." }),
    room_size: z
        .number({ required_error: "Please enter a valid room size.", message: "Please enter a valid room size." })
        .min(1, { message: "Please enter a valid room size." })
        .max(9999, { message: "Please enter a valid room size." }),
});

export const unitSpecificationSchema = z.object({
    bedrooms: z
        .number({ required_error: "Please enter a bedroom number.", message: "Please enter a valid bedroom number." })
        .min(1, { message: "Please enter a valid number of bedrooms." })
        .max(14, { message: "Are you sure you have that many bedrooms. Maximum amount of bedrooms is 14." }),
    occupants: z
        .number({ required_error: "Please enter a occupant count.", message: "Please enter a valid occupant count." })
        .min(1, { message: "Please enter a valid number of occupants." })
        .max(14, { message: "Are you sure you have that many occupants." }),
    beds: z
        .number({ required_error: "Please enter a number of beds.", message: "Please enter a valid number of beds." })
        .min(1, { message: "Please enter a valid number of beds." })
        .max(14, { message: "Are you sure you have that many beds." }),
});

export const unitAmenitySchema = z.object({
    amenities: z
        .array(
            z.object(
                {
                    value: z.string().transform((val) => parseInt(val)),
                    label: z.string(),
                },
                {
                    required_error: "Please select at least one amenity.",
                }
            ),
            { required_error: "Please select at least one amenity.", message: "Please select at least one amenity." }
        )
        .min(1, "At least one amenity must be selected."),

    additional_amenities: z
        .array(
            z.object(
                {
                    id: z.string(),
                    text: z
                        .string({ message: "Please enter a valid amenity." })
                        .min(1, { message: "Amenity name too short." })
                        .max(52, { message: "Amenity name too long." }),
                },
                {
                    message: "Amenity object shape is invalid.",
                }
            ),
            {
                message: "Amenity is not an array.",
            }
        )
        .optional(),
});

export const unitPriceSchema = z.object({
    price: z
    .union([z.string(), z.number()])
    .transform((value) => {
        const parsed = typeof value === "string" ? parseFloat(value) : value;
        return isNaN(parsed) ? undefined : parsed;
    })
    .refine((value) => typeof value === "number" && value >= 1, {
        message: "Price must not be less than 1.",
    }).refine((value) => typeof value === "number" && value <= 100000, {
        message: "Price must not exceed 100, 000.",
    }),
});




export type UnitData = z.infer<typeof unitSchema>;

export type UnitTitleData = z.infer<typeof unitTitleSchema>;
export type UnitTypeData = z.infer<typeof unitTypeSchema>;
export type UnitSpecificationData = z.infer<typeof unitSpecificationSchema>;
export type UnitAmenityData = z.infer<typeof unitAmenitySchema>;
export type UnitPriceData = z.infer<typeof unitPriceSchema>;
