export class CreatedDocumentFilter{
    
    public static filter(document) : Promise<any>{
        delete document.created_at
        delete document.updated_at
        delete document.status
        delete document.is_deleted
        return document
    }
}