import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import acronym from '@/utils/acronym'
import classNames from '@/utils/classNames'
import useRandomBgColor from '@/utils/hooks/useRandomBgColor'
import { TbUser, TbTag, TbFileText, TbTicket, TbRefresh, TbLogin, TbLogout, TbUserPlus, TbUserEdit } from 'react-icons/tb'
import {
    ADD_TAGS_TO_TICKET,
    ADD_FILES_TO_TICKET,
    UPDATE_TICKET,
    CREATE_TICKET,
    SIGN_IN,
    SIGN_OUT,
    USER_CREATED,
    USER_UPDATED,
    avatarType,
    iconType,
} from './constants'

const Icon = ({ type }) => {
    switch (type) {
        case ADD_TAGS_TO_TICKET:
            return <TbTag />
        case ADD_FILES_TO_TICKET:
            return <TbFileText />
        case UPDATE_TICKET:
            return <TbRefresh />
        case CREATE_TICKET:
            return <TbTicket />
        case SIGN_IN:
            return <TbLogin />
        case SIGN_OUT:
            return <TbLogout />
        case USER_CREATED:
            return <TbUserPlus />
        case USER_UPDATED:
            return <TbUserEdit />
        default:
            return <TbUser />
    }
}

const ActivityAvatar = ({ data }) => {
    const color = useRandomBgColor()

    const defaultAvatarProps = useMemo(
        () => ({ size: 35, shape: 'circle' }),
        [],
    )

    if (data && avatarType.includes(data.type)) {
        const avatarProps = data.userImg
            ? { src: data.userImg }
            : { className: classNames(color(data.userName || '')) }

        return (
            <Avatar {...avatarProps} {...defaultAvatarProps}>
                <span className="text-gray-900 font-bold">
                    {acronym(data.userName || '')}
                </span>
            </Avatar>
        )
    }

    if (data && iconType.includes(data.type)) {
        return (
            <Avatar
                className="text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-700"
                icon={<Icon type={data.type} />}
                {...defaultAvatarProps}
            />
        )
    }

    return null
}

export default ActivityAvatar
