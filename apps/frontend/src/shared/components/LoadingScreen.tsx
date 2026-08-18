type LoadingScreenProps = {
    label?: string;
}

function LoadingScreen({ label = "Loading..." }: LoadingScreenProps) {
    return (
        <div className="flex min-h-40 w-full items-center justify-center rounded-md border bg-white p-6 text-sm text-gray-500">
            <div className="flex items-center gap-3">
                <span className="size-5 animate-spin rounded-full border-2 border-gray-300 border-t-main" />
                <span>{label}</span>
            </div>
        </div>
    );
}

export default LoadingScreen;
