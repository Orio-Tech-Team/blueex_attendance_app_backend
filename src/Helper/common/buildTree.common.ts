export async function buildTree(elements , parent = null){
    let branch = []
    for (var i in elements){
        if(elements[i].parent_id === parent){
            var children = await buildTree(elements,elements[i].id)
            if(children.length){
                elements[i].children = children
            }
            branch.push(elements[i])
        }
    }
    return branch
}