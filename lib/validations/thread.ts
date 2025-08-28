import * as z from "zod";

export const threadValidation=z.object({
    thread:z.string().nonempty().min(3,'Minimum 3 characters'),
    accountId:z.string()
})

export const commentValidation=z.object({
    comment:z.string().nonempty().min(3,'Minimum 3 characters'),
    accountId:z.string()
})
