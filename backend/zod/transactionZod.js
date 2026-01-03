const zod = require('zod');

const transferZod = zod.object({
    to: zod.string(),
    amount: zod.number().min(1)
});

module.exports = {
    transferZod
}