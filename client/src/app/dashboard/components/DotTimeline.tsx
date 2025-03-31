// frontend/src/components/DotTimeline.tsx
import React from 'react';
import { format } from 'date-fns';

interface TimelineEvent {
    time: string;
    description: string;
    isCompleted?: boolean;
}

interface DotTimelineProps {
    events: TimelineEvent[];
}

export const DotTimeline: React.FC<DotTimelineProps> = ({ events }) => {
    return (
        <ul className="relative">
            {events.map((event, index) => (
                <li key={index} className="mb-6 ml-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <span className="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{format(new Date(event.time), 'MMMM d at h:mm aa')}</span>
                    <p className="text-gray-700 mt-1">{event.description}</p>
                    {event.isCompleted && (
                        <span className="text-sm text-green-600 font-semibold block mt-1">Completed</span>
                    )}
                </li>
            ))}
        </ul>
    );
};