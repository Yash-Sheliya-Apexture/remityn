// frontend/src/components/inbox/InboxMessageListItem.tsx
import React from 'react';
import type { InboxMessage } from '../../../services/inbox';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, MailOpen, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface InboxMessageListItemProps {
    message: InboxMessage;
    onSelect: (message: InboxMessage) => void;
    onDelete: (messageId: string) => void;
    isDeleting: boolean;
}

export const InboxMessageListItem: React.FC<InboxMessageListItemProps> = React.memo(({
    message,
    onSelect,
    onDelete,
    isDeleting
}) => {
    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click when deleting
        onDelete(message._id);
    };

    return (
        <Card
            onClick={() => onSelect(message)}
            className={cn(
                "cursor-pointer hover:shadow-md transition-shadow duration-150 border relative overflow-hidden",
                !message.isRead ? "border-primary/30" : "border-border/50"
            )}
            aria-label={`Select message from ${message.sender || 'System'} with subject ${message.subject}`}
        >
            <CardContent className={cn(
                "p-4 flex items-start gap-4",
                !message.isRead && "pl-6" // Adjust padding for indicator
            )}>
                {/* Icon */}
                <div className={cn(
                        "flex justify-center items-center w-10 h-10 rounded-3xl bg-primarybox ",
                        !message.isRead ? "text-primary" : "text-muted-foreground"
                    )} aria-hidden="true">
                    {!message.isRead ? <Mail className="size-5" /> : <MailOpen className="size-5" />}
                </div>

                {/* Message Info */}
                <div className="flex-grow overflow-hidden mr-10 w-[calc(100%-110px)]"> {/* Space for delete button */}
                     <div className="flex justify-between items-baseline mb-1 text-xs">
                        <p className={cn(
                            "font-medium text-muted-foreground truncate",
                            !message.isRead && "text-foreground/90 dark:text-foreground/80"
                        )} title='Website name'>
                            From: Website Name
                        </p>
                        <time dateTime={message.sentAt} className="text-muted-foreground flex-shrink-0 ml-2 whitespace-nowrap">
                            {formatDistanceToNow(new Date(message.sentAt), { addSuffix: true })}
                        </time>
                    </div>
                    <p className={cn(
                        "text-sm font-semibold truncate text-mainheading dark:text-white",
                        !message.isRead && "font-bold"
                    )} title={message.subject}>
                        {message.subject}
                    </p>
                    <p className={cn(
                        "text-sm text-muted-foreground/80 dark:text-muted-foreground/70 line-clamp-1 mt-1",
                        !message.isRead && "text-foreground/70 dark:text-foreground/60"
                    )}>
                        {message.body}
                    </p>
                </div>

                {/* Delete Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 z-10"
                    onClick={handleDeleteClick}
                    aria-label={`Delete message: ${message.subject}`}
                    disabled={isDeleting}
                >
                    {isDeleting ? (
                        <RefreshCw className="size-4 animate-spin" />
                    ) : (
                        <Trash2 className="size-4" />
                    )}
                </Button>
            </CardContent>
        </Card>
    );
});

InboxMessageListItem.displayName = 'InboxMessageListItem'; // Add display name for React DevTools