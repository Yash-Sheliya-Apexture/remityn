// frontend/src/components/inbox/InboxMessageDetailView.tsx
import React from 'react';
import type { InboxMessage } from '../../../services/inbox';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronLeft, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface InboxMessageDetailViewProps {
    message: InboxMessage;
    onBack: () => void;
    onDelete: (messageId: string) => void;
    isDeleting: boolean;
}

export const InboxMessageDetailView: React.FC<InboxMessageDetailViewProps> = ({
    message,
    onBack,
    onDelete,
    isDeleting
}) => {
    return (
        <Card className="border shadow-lg animate-in fade-in duration-300">
            <CardHeader className="border-b pb-3">
                <div className="flex justify-between items-start gap-4">
                    {/* Message Title/Meta */}
                    <div className='flex-grow overflow-hidden'>
                        <CardTitle className="text-lg mb-1 text-mainheading dark:text-white break-words">
                            {message.subject}
                        </CardTitle>
                        <CardDescription className="text-xs">
                            From: {message.sender || 'System'} • Received: <time dateTime={message.sentAt}>{formatDistanceToNow(new Date(message.sentAt), { addSuffix: true })}</time>
                        </CardDescription>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={() => onDelete(message._id)}
                            aria-label="Delete message"
                            disabled={isDeleting}
                        >
                             {isDeleting ? (
                                <RefreshCw className="size-4 animate-spin" />
                             ) : (
                                <Trash2 className="size-4" />
                             )}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onBack}
                            aria-label="Back to inbox list"
                        >
                            <ChevronLeft className="mr-1 h-4 w-4" /> Back
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
                {/* Render body safely */}
                <div
                    className="text-sm whitespace-pre-wrap text-foreground leading-relaxed message-body"
                    // If body *can* contain HTML, sanitize it here!
                    // Example using dangerouslySetInnerHTML (USE WITH CAUTION and a SANITIZER)
                    // dangerouslySetInnerHTML={{ __html: sanitizeHtml(message.body) }}
                    >
                    {message.body} {/* Assuming plain text for now */}
                </div>
            </CardContent>
        </Card>
    );
};