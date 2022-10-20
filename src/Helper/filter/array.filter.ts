export class ArrayFilter{
    static getIdForInClause(arrayObject , parameter){
        const finalArray = arrayObject.map(function (obj) {
            return obj.parameter;
        });
        return finalArray
    }   
}