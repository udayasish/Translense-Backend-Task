import { z } from "zod";

export const ownerValidation = z.object({
    fullName: z.string().min(2),
    country: z.string().min(2),
    state: z.string().min(2),
    city: z.string().min(2),
    address: z.string().min(5),
    
    email: z.string().email(),
    mobile: z.string().length(10),
  });

  export const updateOwnerValidation = ownerValidation.partial();