export type ModelName = "GPT" | "GEMINI" | "CLAUDE"

export class TextEntity{
    constructor(
        public id :string,
        public content:string,
        public userId: string,
        public model:ModelName
    ){}
}