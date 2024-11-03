import { z } from "zod"

export const createRoomSchema = z.object({
    room_number: z.number().min(1),
    room_name: z.string().min(2).max(50),
    room_price: z.number().min(1).max(50),
    room_capacity: z.number().min(1).max(50),
    room_size: z.number().min(1).max(50),
    room_description: z.string().min(2).max(50),
});
