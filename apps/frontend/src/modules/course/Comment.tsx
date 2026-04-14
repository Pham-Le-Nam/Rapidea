

type CommentProps = {
    className?: string;
    user?: any;
    post: any;
}

function CommentSection ({ 
    className = "w-full mt-3 border-2 p-2 rounded-xl",
    user,
    post
} : CommentProps) {
    return (
        <div className={className}>
            This is the comment section
        </div>
    )
}

export default CommentSection;