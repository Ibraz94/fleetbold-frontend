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
]

const ActivityLog = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [loadable, seLoadable] = useState(true)
    const [activities, setActivities] = useState([])
    const [activityIndex, setActivityIndex] = useState(1)
    const [showMentionedOnly, setShowMentionedOnly] = useState(false)
    const [selectedType, setSelectedType] = useState(defaultSelectedType)

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
        
        return Object.values(groupedByDate)
    }

    const getLogs = async (index) => {
        setIsLoading(true)
        try {
            const resp = await apiGetLog({ activityIndex: index })
            
            // Handle real API response structure
            const apiLogs = resp.logs || resp.data || []
            console.log('Raw API response:', resp)
            console.log('Extracted logs:', apiLogs)
            
            const transformedActivities = transformApiResponse(apiLogs)
            console.log('Transformed activities:', transformedActivities)
            
            setActivities((prevActivities) => [...prevActivities, ...transformedActivities])
            seLoadable(resp.loadable ?? (transformedActivities.length > 0))
        } catch (error) {
            console.error('Error fetching logs:', error)
            // Handle error gracefully - don't update activities on error
            seLoadable(false)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getLogs(activityIndex)
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
        setActivityIndex((prevIndex) => prevIndex + 1)
        getLogs(activityIndex + 1)
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
