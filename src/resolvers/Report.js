const postedBy = (parent, args, context) => {
    const result = context.prisma.user.findUnique({
        where: {
            id: parent.postedById
        }
    })


    return result;
}

module.exports = {
    postedBy
}