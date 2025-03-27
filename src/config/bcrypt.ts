import { compareSync, hashSync } from 'bcrypt';  
// patrón adaptador , esto se realiza ya que si se quiere cambiar a otra librería para encriptar, solo se tenga que hacer el cambio
//en este archivo


export class BcryptAdapter{
    static hash(password:string):string{
        return hashSync(password,10)
    }
    static compare(password:string,hashed:string):boolean{
        return compareSync(password,hashed)
    }
}