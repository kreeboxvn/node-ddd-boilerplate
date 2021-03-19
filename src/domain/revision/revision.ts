import RevisionInterface from "./revision-interface";
import RevStatusEnum from "./rev-status-enum";

class Revision implements RevisionInterface {
  public id!: string;
  public createdAt!: string;
  public createdBy!: string;
  public entityId!: string;
  public entityType!: string;
  public revStatus!: RevStatusEnum;
  public snapshotData!: object;
  public updatedAt!: string;
  public updatedBy!: string;
}

export default Revision
