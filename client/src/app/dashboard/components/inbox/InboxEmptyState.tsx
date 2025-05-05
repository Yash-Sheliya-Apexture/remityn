// frontend/src/components/inbox/InboxEmptyState.tsx
import { Inbox } from 'lucide-react';

export const InboxEmptyState: React.FC = () => {
    return (
        <div className="text-center py-16 text-muted-foreground border border-dashed rounded-lg">
            <Inbox className="size-12 mx-auto mb-4 text-gray-400" />
            <p className="font-medium">Your inbox is empty.</p>
            <p className="text-sm">Messages from the platform will appear here.</p>
        </div>
    );
};