// Domain Revision Interface - Type Definition
import RevStatusEnum from "./rev-status-enum";

interface RevisionInterface {
    entityId: string;
    entityType: string;
    revStatus: RevStatusEnum;
    snapshotData: object;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

export default RevisionInterface;
