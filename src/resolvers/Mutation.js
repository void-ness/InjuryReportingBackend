const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (parent, args, context) => {
    let user = await context.prisma.user.findUnique({
        where: {
            email: args.email
        }
    });

    if (user) {
        throw new Error("User already Exists");
    }

    const password = await bcrypt.hash(args.password, 10);

    user = await context.prisma.user.create({
        data: {
            ...args,
            password
        }
    })

    const token = jwt.sign({ userId: user.id }, SECRET_KEY);

    return {
        token,
        user
    }
}

const login = async (parent, args, context) => {
    const user = await context.prisma.user.findUnique({
        where: {
            email: args.email
        }
    });

    if (!user) {
        throw new Error("User does not exist");
    }

    const validUser = await bcrypt.compare(args.password, user.password);

    if (!validUser) {
        throw new Error("Invalid Credentials");
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY);

    return {
        token,
        user
    }
}

const addReport = async (parent, args, context) => {
    const { userId } = context;

    if (!userId) {
        throw new Error("Unauthorized Access");
    }

    const data = {
        name: args.name.toLowerCase(),
        postedById: userId,
        createdAt: args.createdAt ? new Date(args.createdAt) : new Date(),
        injuryDate: args.injuryDate ? new Date(args.injuryDate) : new Date(),
    }


    const newReport = await context.prisma.report.create({
        data
    })

    return newReport;
}

const updateReport = async (parent, args, context) => {
    const { userId } = context;

    if (!userId) {
        throw new Error("Unauthorized Access");
    }

    const data = {};

    if (args.name) {
        data.name = args.name.toLowerCase()
    }

    if (args.createdAt) {
        data.createdAt = new Date(args.createdAt)
    }

    if (args.injuryDate) {
        data.injuryDate = new Date(args.injuryDate)
    }

    const newReport = await context.prisma.report.update({
        where: {
            id: args.reportId
        },
        data
    })

    return newReport;
}

const deleteReport = async (parent, args, context) => {
    const { userId } = context;

    if (!userId) {
        throw new Error("Unauthorized Access");
    }

    const deletedReport = await context.prisma.report.delete({
        where: {
            id: args.reportId
        }
    });

    return deletedReport
}

module.exports = {
    login,
    signup,
    addReport,
    updateReport,
    deleteReport
}