const postedBy = (parent, args, context) => {
    console.log(parent.id);

    const result = context.prisma.report.findUnique({
        where: {
            id: parent.id
        }
    })


    return result.postedBy();
}

module.exports = {
    postedBy
}