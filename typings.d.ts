import {ObjectId} from "bson";

export interface Figure {
    _id: ObjectId
    mainName: string
    faction?: string
    image: string | static
}