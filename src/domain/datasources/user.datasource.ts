export abstract class UserDataSource{
    abstract textProofreader():Promise<string>
    abstract audioGeneration():Promise<string>
}