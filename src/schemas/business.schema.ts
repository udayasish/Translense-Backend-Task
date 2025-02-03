import { z } from "zod";

export const businessValidation = z.object({
    businessName: z.string().min(2),
    country: z.string().min(2),
    state: z.string().min(2),
    city: z.string().min(2),
    address: z.string().min(5),
    openingTime: z.string().regex(/^\d{1,2}:\d{2} (AM|PM)$/),
    closingTime: z.string().regex(/^\d{1,2}:\d{2} (AM|PM)$/),
    email: z.string().email(),
    mobile: z.string().length(10),
  });

  export const updateBusinessValidation = businessValidation.partial();