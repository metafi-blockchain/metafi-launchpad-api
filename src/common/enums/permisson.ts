export enum PERMISSION {
    READ = 'read',
    WRITE = 'Write',
    CREATE = 'Create',
    DELETE = 'Delete',
}

//role này để quản lý member, setup role proposal và vote
export enum MEMBER_ROLES {
    USER = "USER",
    OWNER = "OWNER", //
    ADMIN = "ADMIN",
    SUPPORTER = "SUPPORTER"
}