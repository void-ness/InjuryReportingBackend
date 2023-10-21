const reports = (parent, args, context) => {
    const result = context.prisma.user.findUnique({
        where: {
            id: parent.id
        }
    })

    return result.reports();
}

module.exports = {
    reports
}