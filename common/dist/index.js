"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.createSchema = exports.signInschema = exports.signUpschema = void 0;
const zod_1 = require("zod");
exports.signUpschema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3),
    name: zod_1.z.string()
});
exports.signInschema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3)
});
exports.createSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updateSchema = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
