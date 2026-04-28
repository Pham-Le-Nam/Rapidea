import { getMeApi, searchApi } from "@/api";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { LogOutIcon, SearchIcon, UserIcon } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import rapideiLogo from "/rapidea.png";

type SearchItem = {
    id: string;
    title: string;
    subtitle?: string;
    link: string;
    avatarName?: string;
    thumbnailName?: string;
}

type SearchResults = {
    users: SearchItem[];
    courses: SearchItem[];
    posts: SearchItem[];
}

const emptyResults: SearchResults = {
    users: [],
    courses: [],
    posts: [],
};

function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState<any>(null);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResults>(emptyResults);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement | null>(null);
    const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);

    const getPhotoUrl = (value?: string) => {
        if (!value) return "";

        if (value.startsWith("http")) {
            return value;
        }

        return `${import.meta.env.VITE_PHOTO_STORAGE}${value}`;
    }

    const avatarUrl = getPhotoUrl(profile?.avatarUrl || profile?.avatar?.name)
        || `${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`;

    useEffect(() => {
        if (!isLoggedIn) {
            setProfile(null);
            return;
        }

        const loadProfile = async () => {
            try {
                const response = await getMeApi();
                setProfile(response.profile);
            } catch (error) {
                console.error("Couldn't load current user", error);
            }
        }

        loadProfile();
    }, [isLoggedIn]);

    useEffect(() => {
        const trimmedQuery = query.trim();
        let isActive = true;

        if (!trimmedQuery) {
            setResults(emptyResults);
            setIsSearchOpen(false);
            return;
        }

        const timeout = window.setTimeout(async () => {
            try {
                const response = await searchApi(trimmedQuery);

                if (!isActive) return;

                setResults({
                    users: response.users ?? [],
                    courses: response.courses ?? [],
                    posts: response.posts ?? [],
                });
                setIsSearchOpen(true);
            } catch (error) {
                if (!isActive) return;

                console.error("Couldn't search", error);
                setResults(emptyResults);
            }
        }, 250);

        return () => {
            isActive = false;
            window.clearTimeout(timeout);
        };
    }, [query]);

    useEffect(() => {
        const closeSearch = (event: MouseEvent) => {
            if (!searchRef.current?.contains(event.target as Node)) {
                setIsSearchOpen(false);
                setIsMobileSearchOpen(false);
            }
        }

        document.addEventListener("mousedown", closeSearch);
        return () => document.removeEventListener("mousedown", closeSearch);
    }, []);

    useEffect(() => {
        if (isMobileSearchOpen) {
            mobileSearchInputRef.current?.focus();
        }
    }, [isMobileSearchOpen]);

    useEffect(() => {
        closeSearch();
    }, [location.pathname]);

    const handleLogout = () => {
        setQuery("");
        setResults(emptyResults);
        closeSearch();
        logout();
        navigate("/login");
    }

    const closeSearch = () => {
        setIsSearchOpen(false);
        setIsMobileSearchOpen(false);
    }

    const selectSearchResult = () => {
        setQuery("");
        setResults(emptyResults);
        closeSearch();
    }

    const hasResults = results.users.length > 0 || results.courses.length > 0 || results.posts.length > 0;

    return (
        <nav className="sticky top-0 z-10 flex items-center gap-3 bg-white px-6 py-4 shadow-md md:px-70">
            <Link to="/" className="shrink-0">
                <img src={rapideiLogo} className="size-9 rounded-full" />
            </Link>

            <div ref={searchRef} className="relative flex flex-1 justify-start lg:justify-center">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => {
                        setIsMobileSearchOpen((isOpen) => !isOpen);
                        setIsSearchOpen(!!query.trim());
                    }}
                >
                    <SearchIcon className="size-5" />
                </Button>

                <div className="relative hidden w-full max-w-96 lg:block">
                    <SearchInput
                        query={query}
                        setQuery={setQuery}
                        setIsSearchOpen={setIsSearchOpen}
                    />

                    {isSearchOpen && query.trim() && (
                        <div className="absolute left-0 right-0 top-11 z-50 max-h-120 overflow-y-auto rounded-md border bg-white p-2 shadow-lg">
                            {hasResults ? (
                                <>
                                    <SearchGroup title="Users" items={results.users} onSelect={selectSearchResult} />
                                    <SearchGroup title="Courses" items={results.courses} onSelect={selectSearchResult} />
                                    <SearchGroup title="Posts" items={results.posts} onSelect={selectSearchResult} />
                                </>
                            ) : (
                                <div className="px-2 py-4 text-center text-sm text-gray-500">
                                    No results
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {isMobileSearchOpen && (
                    <div className="fixed left-1/2 top-[72px] z-50 w-[min(calc(100vw-2rem),32rem)] -translate-x-1/2 lg:hidden">
                        <div className="rounded-md border bg-white p-2 shadow-lg">
                            <SearchInput
                                query={query}
                                setQuery={setQuery}
                                setIsSearchOpen={setIsSearchOpen}
                                inputRef={mobileSearchInputRef}
                            />

                            {isSearchOpen && query.trim() && (
                                <div className="mt-2 max-h-100 overflow-y-auto rounded-md border bg-white p-2">
                                    {hasResults ? (
                                        <>
                                            <SearchGroup title="Users" items={results.users} onSelect={selectSearchResult} />
                                            <SearchGroup title="Courses" items={results.courses} onSelect={selectSearchResult} />
                                            <SearchGroup title="Posts" items={results.posts} onSelect={selectSearchResult} />
                                        </>
                                    ) : (
                                        <div className="px-2 py-4 text-center text-sm text-gray-500">
                                            No results
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex shrink-0 items-center gap-3">
                {!isLoggedIn && (
                    <Button asChild className="bg-main hover:bg-main-hover">
                        <Link to="/login">Login</Link>
                    </Button>
                )}

                {isLoggedIn && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <img src={avatarUrl} className="size-9 rounded-full border object-cover" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            {profile?.username && (
                                <DropdownMenuItem asChild>
                                    <Link to={`/profile/${profile.username}`} className="w-full">
                                        <UserIcon className="size-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                            )}

                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOutIcon className="size-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    );
}

function SearchInput({
    query,
    setQuery,
    setIsSearchOpen,
    inputRef,
}: {
    query: string;
    setQuery: (value: string) => void;
    setIsSearchOpen: (value: boolean) => void;
    inputRef?: RefObject<HTMLInputElement | null>;
}) {
    return (
        <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
            <Input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onFocus={() => query.trim() && setIsSearchOpen(true)}
                placeholder="Search users, courses, posts"
                className="pl-9"
            />
        </div>
    );
}

function SearchGroup({
    title,
    items,
    onSelect,
}: {
    title: string;
    items: SearchItem[];
    onSelect: () => void;
}) {
    if (items.length === 0) return null;

    return (
        <div className="py-1">
            <div className="px-2 py-1 text-xs font-semibold uppercase text-gray-500">
                {title}
            </div>
            <div className="flex flex-col">
                {items.map((item) => (
                    <Link
                        key={`${title}-${item.id}`}
                        to={item.link}
                        onClick={onSelect}
                        className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-gray-100"
                    >
                        <SearchResultImage item={item} />
                        <span className="min-w-0 flex flex-col">
                            <span className="truncate font-medium">{item.title}</span>
                            {item.subtitle && (
                                <span className="truncate text-xs text-gray-500">{item.subtitle}</span>
                            )}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

function SearchResultImage({ item }: { item: SearchItem }) {
    const imageName = item.avatarName || item.thumbnailName;

    if (!imageName) {
        return <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-500">R</div>;
    }

    return (
        <img
            src={imageName.startsWith("http") ? imageName : `${import.meta.env.VITE_PHOTO_STORAGE}${imageName}`}
            className="size-8 shrink-0 rounded-full border object-cover"
        />
    );
}

export default Navbar;
