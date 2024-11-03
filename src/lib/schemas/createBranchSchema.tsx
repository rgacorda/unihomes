
import { z } from "zod"

export const createBranchSchema = z.object({
  name: z.string().min(2).max(50),
  address: z.string().min(2).max(50),
  nearby_places: z.array(z.string().min(1)).min(1).nonempty("Please select at least one place."),
  ameneties: z.array(z.string().min(1)).min(1).nonempty("Please select at least one."),
  house_rules: z.string().min(2).max(50),
})
