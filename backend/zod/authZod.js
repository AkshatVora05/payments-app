const zod = require('zod');

const registerZod = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
});

const loginZod = zod.object({
    username: zod.string(),
    password: zod.string()
})

module.exports = { 
    registerZod,
    loginZod
}