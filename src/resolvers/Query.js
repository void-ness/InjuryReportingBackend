const info = () => {
    return "Welcome to injury tracking system - backend"
}

const report = async (parent, args, context) => {
    const { userId } = context;
    if (!userId) {
        throw new Error("Unauthorized Access")
    }

    let where = args.filter ? {
        OR: [
            {
                name: { contains: args.filter }
            }
        ]
    } : {};

    if (args.filterDate) {
        where = {
            ...where,
            AND: [
                {
                    [args.filterDate.cat]: {
                        gte: args.filterDate.startDate ? new Date(args.filterDate.startDate) : new Date()
                    }
                },
                {
                    [args.filterDate.cat]: {
                        lte: args.filterDate.endDate ? new Date(args.filterDate.endDate) : new Date()
                    }
                }
            ]
        }
    }

    const data = await context.prisma.report.findMany({
        where: {
            ...where,
            postedById: userId,
        },
        orderBy: args.orderBy
    })

    return data;
}

module.exports = {
    info, report
}