import RevisionInterface from "../revision/revision-interface";

interface FolderInterface {
    id: string|null,
    name: string,
    parent: (string | null),
    position: number,
    revision: () => RevisionInterface[],
}

export default FolderInterface;
