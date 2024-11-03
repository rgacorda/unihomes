import { z } from "zod"

export const editLessorAccountSchema = z.object({
    name: z.string().min(2).max(50),
    address: z.string().min(2).max(50),
    logo: z.number().min(1).max(50),
    type: z.string().min(1).max(50),
    about: z.string().min(1).max(50),
    
});
