export const UPDATE_TICKET = 'UPDATE-TICKET'
export const COMMENT = 'COMMENT'
export const ADD_TAGS_TO_TICKET = 'ADD-TAGS-TO-TICKET'
export const ADD_FILES_TO_TICKET = 'ADD-FILES-TO-TICKET'
export const COMMENT_MENTION = 'COMMENT-MENTION'
export const ASSIGN_TICKET = 'ASSIGN-TICKET'
export const CREATE_TICKET = 'CREATE-TICKET'

// Real API activity types
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const SEND = "SEND"
export const USER_CREATED = 'USER_CREATED'
export const USER_UPDATED = 'USER_UPDATED'
export const GENERIC_ACTIVITY = 'GENERIC_ACTIVITY'

export const avatarType = [
    UPDATE_TICKET,
    COMMENT,
    COMMENT_MENTION,
    ASSIGN_TICKET,
    SIGN_IN,
    SIGN_OUT,
    SEND,
    USER_CREATED,
    USER_UPDATED,
    GENERIC_ACTIVITY,
]
export const iconType = [
    ADD_TAGS_TO_TICKET, 
    ADD_FILES_TO_TICKET, 
    CREATE_TICKET,
    SIGN_IN,
    SIGN_OUT,
    SEND,
    USER_CREATED,
    USER_UPDATED,
]
