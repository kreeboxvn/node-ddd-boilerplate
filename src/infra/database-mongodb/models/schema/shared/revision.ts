// Revision Schema - For Mongo DB

import {Schema} from "mongoose";
import RevStatusEnum from "../../../../../domain/revision/rev-status-enum";

const RevisionSchema = new Schema({
  id: String,
  createdAt: String,
  createdBy: String,
  entityId: Schema.Types.ObjectId,
  entityType: String,
  // revStatus: RevStatusEnum,
  revStatus: {
    type: Schema.Types.String,
    enum: Object.values(RevStatusEnum),
  },
  snapshotData: Object,
  updatedAt:
    {
      type: Date,
      default: new Date()
    },
  updatedBy:
    {
      type: Date,
      default: new Date()
    },
});

export default RevisionSchema;
