import { useState, useEffect } from 'react'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Log from './components/Log'
import LogAction from './components/LogAction'
import { apiGetLog } from '@/services/LogService'
import {
    UPDATE_TICKET,
    COMMENT,
    COMMENT_MENTION,
    ASSIGN_TICKET,
    ADD_TAGS_TO_TICKET,
    ADD_FILES_TO_TICKET,
    CREATE_TICKET,
    SIGN_IN,
    SIGN_OUT,
    SEND,
    USER_CREATED,
    USER_UPDATED,
} from '@/components/view/Activity/constants'

const defaultSelectedType = [
    UPDATE_TICKET,
    COMMENT,
    COMMENT_MENTION,
    ASSIGN_TICKET,
    ADD_TAGS_TO_TICKET,
    ADD_FILES_TO_TICKET,
    CREATE_TICKET,
    SIGN_IN,
    SIGN_OUT,
    USER_CREATED,
    USER_UPDATED,
    SEND,
]

const ActivityLog = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [loadable, seLoadable] = useState(true)
    const [activities, setActivities] = useState([])
    const [page, setPage] = useState(1)
    const [per_page, setPer_Page] = useState(20)
    const [showMentionedOnly, setShowMentionedOnly] = useState(false)
    const [selectedType, setSelectedType] = useState(defaultSelectedType);

    // Transform API response to match expected component structure
    const transformApiResponse = (apiLogs) => {
        if (!Array.isArray(apiLogs)) return []

        // Group logs by date
        const groupedByDate = apiLogs.reduce((acc, log) => {
            const date = new Date(log.timestamp)
            const dateKey = Math.floor(date.getTime() / 1000) // Convert to Unix timestamp
            const dayKey = Math.floor(dateKey / 86400) * 86400 // Group by day

            if (!acc[dayKey]) {
                acc[dayKey] = {
                    id: dayKey.toString(),
                    date: dayKey,
                    events: []
                }
            }

            // Transform individual log to event format
            const event = {
                type: log.activity_type.toUpperCase().replace(/-/g, '_'), // Convert 'sign-in' to 'SIGN_IN'
                dateTime: dateKey,
                description: log.details,
                userName: `User ${log.user_id}`, // Placeholder since we don't have user names
                userImg: null, // No avatar data from API
                id: log.id,
                ipAddress: log.ip_address,
                userAgent: log.user_agent,
                metadata: log.activity_metadata
            }

            acc[dayKey].events.push(event)
            return acc
        }, {})

        // Convert to array and sort by latest date first
        const groupedByDateObj = Object.values(groupedByDate).sort(
            (a, b) => b.date - a.date
        )
        return Object.values(groupedByDateObj)
    }

    const getLogs = async (index = 1, pageSize = 20) => {
        setIsLoading(true)
        try {
            const resp = await apiGetLog({
                page: index,
                per_page: pageSize,
            })

            const apiLogs = resp.logs || resp.data || []
            const transformedActivities = transformApiResponse(apiLogs)

            // Merge new logs into existing by day and avoid duplicate event IDs
            setActivities((prev) => {
                const merged = [...prev]

                transformedActivities.forEach((newGroup) => {
                    const existingGroupIndex = merged.findIndex(g => g.date === newGroup.date)

                    if (existingGroupIndex > -1) {
                        const existingEvents = merged[existingGroupIndex].events
                        const newUniqueEvents = newGroup.events.filter(
                            e => !existingEvents.some(ev => ev.id === e.id)
                        )
                        merged[existingGroupIndex].events = [...existingEvents, ...newUniqueEvents]
                    } else {
                        merged.push(newGroup)
                    }
                })

                return merged.sort((a, b) => b.date - a.date)
            })

            seLoadable(resp.loadable ?? transformedActivities.length > 0)
        } catch (error) {
            console.error('Error fetching logs:', error)
            seLoadable(false)
        }
        setIsLoading(false)
    }



    useEffect(() => {
        getLogs(page, per_page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFilterChange = (selected) => {
        setShowMentionedOnly(false)
        if (selectedType.includes(selected)) {
            setSelectedType((prevData) =>
                prevData.filter((prev) => prev !== selected),
            )
        } else {
            setSelectedType((prevData) => [...prevData, ...[selected]])
        }
    }

    const handleLoadMore = () => {
        const newIndex = page + 1
        setPage(newIndex)
        getLogs(newIndex, per_page)
    }

    const handleCheckboxChange = (bool) => {
        setShowMentionedOnly(bool)
        if (bool) {
            setSelectedType([COMMENT_MENTION])
        } else {
            setSelectedType(defaultSelectedType)
        }
    }

    return (
        <AdaptiveCard>
            <div className="max-w-[800px] mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3>Activity log</h3>
                    <LogAction
                        selectedType={selectedType}
                        showMentionedOnly={showMentionedOnly}
                        onFilterChange={handleFilterChange}
                        onCheckboxChange={handleCheckboxChange}
                    />
                </div>
                <Log
                    isLoading={isLoading}
                    loadable={loadable}
                    activities={activities}
                    filter={selectedType}
                    onLoadMore={handleLoadMore}
                />
            </div>
        </AdaptiveCard>
    )
}

export default ActivityLog
