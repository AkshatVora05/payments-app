const zod = require('zod');

const updateUserZod = zod.object({
    newPassword: zod.string().optional(),
    newFirstname: zod.string().optional(),
    newLastname: zod.string().optional()
})

const getUsersZod = zod.string();

module.exports = {
    updateUserZod,
    getUsersZod
}