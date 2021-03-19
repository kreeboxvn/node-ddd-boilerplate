// MongoDB Interfaces

import {Document, Model} from "mongoose";
import RevisionInterface from "../../../domain/revision/revision-interface";

export interface IRevisionDocument extends RevisionInterface, Document {}
export interface IRevisionModel extends Model<IRevisionDocument> {}