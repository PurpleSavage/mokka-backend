export class Validators{
    static get email(){
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    }
    static get phoneNumber(){
        return /^\+?[1-9]\d{1,14}$/
    }
    static maxCharacters(reason:string){
        return reason.length<60
    }
}