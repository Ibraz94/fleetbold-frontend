import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { useSessionUser } from '@/store/authStore'
import { Link } from 'react-router'
import {
    PiUserDuotone,
    PiGearDuotone,
    PiPulseDuotone,
    PiSignOutDuotone,
} from 'react-icons/pi'
import { useAuth } from '@/auth'
import ThemeConfigurator from '@/components/template/ThemeConfigurator'
import { useCallback } from 'react'
import useDarkMode from '@/utils/hooks/useDarkMode'
import Switcher from '@/components/ui/Switcher'

const dropdownItemList = [
    {
        label: 'Account Setting',
        path: '/concepts/account/settings',
        icon: <PiUserDuotone />,
    },
    {
        label: 'Activity Log',
        path: '/concepts/account/activity-log',
        icon: <PiPulseDuotone />,
    },
    {
        label: 'Theme',
        path: '/concepts/account/theme',
        icon: <PiGearDuotone />,
    },
]

const _UserDropdown = () => {
    const { avatar, userName, email } = useSessionUser((state) => state.user)

    const { signOut } = useAuth()
    const [isDark, setIsDark] = useDarkMode()

    const handleSignOut = () => {
        signOut()
    }

    const onSwitchChange = useCallback(
        (checked, e) => {
            e.stopPropagation() // Prevent dropdown from closing
            setIsDark(checked ? 'dark' : 'light')
        },
        [setIsDark],
    )

    const avatarProps = {
        ...(avatar ? { src: avatar } : { icon: <PiUserDuotone /> }),
    }

    return (
        <Dropdown
            className="flex"
            toggleClassName="flex items-center"
            renderTitle={
                <div className="cursor-pointer flex items-center">
                    <Avatar size={32} {...avatarProps} />
                </div>
            }
            placement="bottom-end"
        >
            <Dropdown.Item variant="header">
                <div className="py-2 px-3 flex items-center gap-3">
                    <Avatar {...avatarProps} />
                    <div>
                        <div className="font-bold text-gray-900 dark:text-gray-100">
                            {userName || 'Anonymous'}
                        </div>
                        <div className="text-xs">
                            {email || 'No email available'}
                        </div>
                    </div>
                </div>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            {dropdownItemList.map((item) => {
                if (item.label === 'Theme') {
                    return (
                        <Dropdown.Item
                            key={item.label}
                            eventKey={item.label}
                            className="px-2"
                        >
                            <div className="flex gap-2 items-center justify-between w-full">
                                <span className="flex gap-2 items-center">
                                    <span className="text-xl">{item.icon}</span>
                                    <span>{item.label}</span>
                                </span>
                                <div 
                                    className="scale-75" 
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Switcher
                                        defaultChecked={isDark}
                                        onChange={onSwitchChange}
                                    />
                                </div>
                            </div>
                        </Dropdown.Item>
                    )
                }
                return (
                    <Dropdown.Item
                        key={item.label}
                        eventKey={item.label}
                        className="px-0"
                    >
                        <Link className="flex h-full w-full px-2" to={item.path}>
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </Dropdown.Item>
                )
            })}
            <Dropdown.Item variant="divider" />
            <Dropdown.Item
                eventKey="Sign Out"
                className="gap-2"
                onClick={handleSignOut}
            >
                <span className="text-xl">
                    <PiSignOutDuotone />
                </span>
                <span>Sign Out</span>
            </Dropdown.Item>
        </Dropdown>
    )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
