import rateLimit from "express-rate-limit";

// rate limiting are used to prevent abuse of the API or brute force attacks or ddos attacks

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
})

export const pexelLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
})

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 100 : 1000, // 100 in prod, 1000 in dev
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
})

export const geminiLimiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5,
    message: {
        status: 429,
        message: "Please wait 2 minutes before trying again."
    },
    standardHeaders: true,
    legacyHeaders: false
})