import descriptionLogo from "/description.jpg";

export function Description() {
    return (
        <div className="flex p-3 w-full max-md:max-w-sm md:w-[min(100%,40rem)] flex-col items-center flex-wrap">
            <h1 className="text-2xl font-bold mb-2">
                Welcome to <a href="/" className="text-main">Rapedeia</a>
            </h1>
            <h2 className="text-xl font-semibold text-black mb-1">
                Learn and grow together
            </h2>
            <h2 className="text-lg text-black">
                Upload your courses or join existing ones. There is nothing you cannot learn here. If there is, be the first one.
            </h2>
            <img src={descriptionLogo} alt="Description Logo" className="hidden mt-4 w-full md:block" />
        </div>
    )
}