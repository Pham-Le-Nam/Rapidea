import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    addSocialLinkApi,
    deleteSocialLinkApi,
    followUserApi,
    getFollowApi,
    getProfileApi,
    getSocialLinkApi,
    unfollowUserApi,
    updateProfileApi,
    updateSocialLinkApi,
    uploadPhotoApi,
} from "@/api";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import facebookLogo from '/facebook.png'
import instagramLogo from '/instagram.png'
import twitterLogo from '/twitter.png'
import linkedinLogo from '/linkedin.png'
import githubLogo from '/github.png'
import tiktokLogo from '/tiktok.png'
import youtubeLogo from '/youtube.png'
import discordLogo from '/discord.png'
import telegramLogo from '/telegram.png'
import otherwebsiteLogo from '/otherwebsite.png'
import { Education } from "./Education";
import Experience from "./Experience";
import Project from "./Project";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { CameraIcon } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";

function Profile() {
    type SocialLink = {
        id: string;
        platform: keyof typeof socialIcons;
        url: string;
    };

    const { username } = useParams()
    const [name, setName] = useState("");
    const [headline, setHeadline] = useState("");
    const [bio, setBio] = useState("");
    const [profile, setProfile] = useState<any>();
    const [coursesCount, setCoursesCount] = useState(0);
    const [postsCount, setPostsCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [subscribersCount, setSubscribersCount] = useState(0);
    const [ratingCount, setRatingCount] = useState("");
    const [rating, setRating] = useState(0);
    const [avatarUrl, setAvatarUrl] = useState(`${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`);
    const [backgroundUrl, setBackgroundUrl] = useState(`${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`)
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [isUser, setIsUser] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const { logout } = useAuth();

    const socialIcons = {
        'FACEBOOK': facebookLogo,
        'INSTAGRAM': instagramLogo,
        'TWITTER': twitterLogo,
        'LINKEDIN': linkedinLogo,
        'GITHUB': githubLogo,
        'TIKTOK': tiktokLogo,
        'YOUTUBE': youtubeLogo,
        'DISCORD': discordLogo,
        'TELEGRAM': telegramLogo,
        'WEBSITE': otherwebsiteLogo,
    } as const;

    const socialPlatforms = Object.keys(socialIcons) as Array<keyof typeof socialIcons>;

    const getPhotoUrl = (value?: string) => {
        if (!value) return "";

        if (value.startsWith("http")) {
            return value;
        }

        return `${import.meta.env.VITE_PHOTO_STORAGE}${value}`;
    }
    
    if (!username) {
        throw new Error("Invalid profile link");
    }

    const loadProfile = async () => {
        try {
            setIsLoading(true);
            const response = await getProfileApi(username);
            const profileResponse = response.profile;
            setProfile(profileResponse);

            if (profileResponse.middlename) {
                setName(`${profileResponse.firstname} ${profileResponse.middlename} ${profileResponse.lastname}`);
            }
            else {
                setName(`${profileResponse.firstname} ${profileResponse.lastname}`);
            }

            setHeadline(profileResponse.headline ?? "");
            setBio(profileResponse.bio ?? "");
            setAvatarUrl(getPhotoUrl(profileResponse.avatarUrl || profileResponse.avatar?.name) || `${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`);
            setBackgroundUrl(getPhotoUrl(profileResponse.backgroundUrl || profileResponse.background?.name) || `${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`);

            setCoursesCount(profileResponse.coursesCount);
            setPostsCount(profileResponse.postsCount);
            setFollowersCount(profileResponse.followersCount);
            setFollowingCount(profileResponse.followingCount);
            setSubscribersCount(profileResponse.subscribersCount);
            setRating(profileResponse.rating);

            if (profileResponse.ratingCount >= 1000000) {
                const millionRating = profileResponse.ratingCount/1000000;
                const roundedMillionRating = millionRating.toFixed(1) + "M";
                setRatingCount(roundedMillionRating);
            }
            else if (profileResponse.ratingCount >= 1000) {
                const thousandRating = profileResponse.ratingCount/1000;
                const roundedThousandRating = thousandRating.toFixed(1) + "K";
                setRatingCount(roundedThousandRating);
            }
            else {
                setRatingCount(profileResponse.ratingCount.toString());
            }

            if (!response.viewerId) {
                setIsOwner(false);
                setIsUser(false);
                setIsFollowing(false);
            }
            else {
                const isProfileOwner = response.viewerId === response.profileId;
                setIsUser(true);
                setIsOwner(isProfileOwner);

                if (isProfileOwner) {
                    setIsFollowing(false);
                }
                else {
                    const followResponse = await getFollowApi(response.profileId);
                    setIsFollowing(followResponse.isFollowing);
                }
            }

        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const toggleFollow = async () => {
        try {
            if (!profile?.id || isFollowLoading) {
                return;
            }

            setIsFollowLoading(true);

            if (isFollowing) {
                const response = await unfollowUserApi(profile.id);
                setIsFollowing(false);
                setFollowersCount(response.followingFollowersCount ?? Math.max(0, followersCount - 1));
                toast.success("Unfollowed");
            }
            else {
                const response = await followUserApi(profile.id);
                setIsFollowing(true);
                setFollowersCount(response.followingFollowersCount ?? followersCount + 1);
                toast.success("Following");
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Token Expired");
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate('/login')
            }
            else {
                toast.error(error.response?.data?.message ?? "Couldn't update follow status");
            }
            throw error;
        } finally {
            setIsFollowLoading(false);
        }
    }

    const loadSocialLinks = async () => {
        try {
            const response = await getSocialLinkApi(username);
            setSocialLinks(response.socialLinks);
        } catch (error: any) {
            throw error;
        }
    }

    // Get profile data
    useEffect(() => {
        loadProfile();
    }, [username]);

    useEffect(() => {
        loadSocialLinks();
    }, [username]);

    if (isLoading) {
        return (
            <div className="flex w-full max-w-350 flex-col items-center gap-3 px-2">
                <LoadingScreen label="Loading profile..." />
            </div>
        );
    }

    return(
        <div className="flex flex-col items-center justify-start px-2 gap-3 w-full max-w-350">
            <div className="flex flex-col items-center justify-start rounded-md border shadow-md w-full gap-3">
                <div className="relative w-full">
                    <img src={backgroundUrl} className="w-full aspect-3/1 object-cover rounded-md" />
                    {isOwner && (
                        <div className="absolute bottom-2 right-2">
                            <ProfilePhotoDialog
                                title="Background"
                                description="Drag to reposition the cover image."
                                buttonLabel="Edit cover"
                                currentUsername={username}
                                field="backgroundId"
                                aspectRatio={3}
                                outputWidth={1500}
                                outputHeight={500}
                                allowZoom
                                reloadProfile={loadProfile}
                            />
                        </div>
                    )}
                </div>
                
                <div className="flex flex-row items-start justify-around w-full gap-2 px-2">
                    <div className="flex flex-col items-center justify-center -mt-15 gap-4 w-40">
                        <div className="relative">
                            <img src={avatarUrl} className="rounded-full border-4 w-40 aspect-square object-cover"/>
                            {isOwner && (
                                <div className="absolute bottom-2 right-2">
                                    <ProfilePhotoDialog
                                        title="Avatar"
                                        description="Drag to reposition and zoom before saving."
                                        buttonLabel="Edit"
                                        currentUsername={username}
                                        field="avatarId"
                                        aspectRatio={1}
                                        outputWidth={512}
                                        outputHeight={512}
                                        roundedPreview
                                        allowZoom
                                        reloadProfile={loadProfile}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row items-center content-center justify-center w-full gap-2">
                            {isOwner && (
                                <EditProfileDialog
                                    profile={profile}
                                    currentUsername={username}
                                    socialLinks={socialLinks}
                                    socialPlatforms={socialPlatforms}
                                    reloadProfile={loadProfile}
                                    reloadSocialLinks={loadSocialLinks}
                                    onUsernameChanged={(nextUsername) => navigate(`/profile/${nextUsername}`)}
                                />
                            )}
                            {isUser && !isOwner && (
                                <Button
                                    type="button"
                                    disabled={isFollowLoading}
                                    className={`w-full md:w-25 ${
                                        isFollowing
                                            ? "bg-gray-200 text-black hover:bg-gray-300"
                                            : "bg-main hover:bg-main-hover"
                                    }`}
                                    onClick={toggleFollow}
                                >
                                    <p>{isFollowing ? "Unfollow" : "Follow"}</p>
                                </Button>
                            )}
                            {isUser && !isOwner && (
                                <Button asChild className="bg-main hover:bg-main-hover w-full md:w-25">
                                    <p>Message</p>
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-start md:gap-3">
                        <div className="flex flex-col md:flex-row items-center justify-start md:gap-3">
                            <h1 className="font-bold text-xl">
                                {`${name}`}
                            </h1>

                            <h2 className="text-lg">
                                {`${rating}⭐ ${ratingCount} Ratings`}
                            </h2>
                        </div>
                        <div className="mt-2 gap-3 flex flex-row justify-start flex-wrap max-w-37 w-full md:max-w-57 lg:max-w-77">
                            {socialLinks.map((socialLink) => (
                                <a key={socialLink.url} href={socialLink.url} target="_blank" rel="noopener noreferrer">
                                    <img src={socialIcons[socialLink.platform]} className="rounded-full w-7 aspect-square"/>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-start">
                    <h1 className="font-bold text-lg">
                        {headline}
                    </h1>
                    <p className="px-3 pb-2">
                        {bio}
                    </p>
                </div>
                
                <div className="flex flex-row flex-wrap justify-center gap-2 pb-2 px-2">
                    <Button asChild className="bg-white hover:bg-gray-100 text-black border-2 w-28">
                        <a href={`/courses/${username}`}>
                            {`${coursesCount} Courses`}
                        </a>
                    </Button>
                    <Button asChild className="bg-white hover:bg-gray-100 text-black border-2 w-28">
                        <a href={`/posts/${username}`}>
                            {`${postsCount} Posts`}
                        </a>
                    </Button>
                    <Button asChild className="bg-white hover:bg-gray-100 text-black border-2 w-28">
                        <p>
                            {`${followersCount} Followers`}
                        </p>
                    </Button>
                    <Button asChild className="bg-white hover:bg-gray-100 text-black border-2 w-28">
                        <p>
                            {`${followingCount} Following`}
                        </p>
                    </Button>
                    <Button asChild className="bg-white hover:bg-gray-100 text-black border-2 w-28">
                        <p>
                            {`${subscribersCount} Subscribers`}
                        </p>
                    </Button>
                    <Button asChild className="bg-white hover:bg-gray-100 text-black border-2 w-28">
                        <a href={`/files/${username}`}>
                            Files
                        </a>
                    </Button>
                </div>
            </div>

            <Experience username={username} isOwner={isOwner}/>
            <Education username={username} isOwner={isOwner}/>
            <Project username={username} isOwner={isOwner}/>

        </div>
    );
}

type EditProfileDialogProps = {
    profile: any;
    currentUsername: string;
    socialLinks: Array<{
        id: string;
        platform: string;
        url: string;
    }>;
    socialPlatforms: string[];
    reloadProfile: () => Promise<void>;
    reloadSocialLinks: () => Promise<void>;
    onUsernameChanged: (username: string) => void;
}

function EditProfileDialog({
    profile,
    currentUsername,
    socialLinks,
    socialPlatforms,
    reloadProfile,
    reloadSocialLinks,
    onUsernameChanged,
}: EditProfileDialogProps) {
    const [firstname, setFirstname] = useState(profile?.firstname ?? "");
    const [middlename, setMiddlename] = useState(profile?.middlename ?? "");
    const [lastname, setLastname] = useState(profile?.lastname ?? "");
    const [headline, setHeadline] = useState(profile?.headline ?? "");
    const [bio, setBio] = useState(profile?.bio ?? "");
    const [linkDrafts, setLinkDrafts] = useState<Record<string, string>>({});
    const [newPlatform, setNewPlatform] = useState(socialPlatforms[0] ?? "WEBSITE");
    const [newUrl, setNewUrl] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setFirstname(profile?.firstname ?? "");
        setMiddlename(profile?.middlename ?? "");
        setLastname(profile?.lastname ?? "");
        setHeadline(profile?.headline ?? "");
        setBio(profile?.bio ?? "");
    }, [profile]);

    useEffect(() => {
        setLinkDrafts(Object.fromEntries(socialLinks.map((link) => [link.id, link.url])));
    }, [socialLinks]);

    const handleAuthError = (error: any) => {
        if (error.response?.status === 401) {
            logout();
            toast.error("Token Expired. You have been logged out. Please log in to continue");
            navigate("/login");
            return true;
        }

        return false;
    }

    const saveProfile = async () => {
        try {
            if (!firstname.trim() || !lastname.trim()) {
                toast.error("First name and last name are required");
                return;
            }

            setIsSaving(true);

            const updatedProfile = await updateProfileApi(currentUsername, {
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                middlename: middlename.trim() || undefined,
                headline: headline.trim() || undefined,
                bio: bio.trim() || undefined,
            });

            toast.success("Profile updated");

            if (updatedProfile.username && updatedProfile.username !== currentUsername) {
                onUsernameChanged(updatedProfile.username);
                return;
            }

            await reloadProfile();
        } catch (error: any) {
            if (!handleAuthError(error)) {
                toast.error("Couldn't update profile");
            }
        } finally {
            setIsSaving(false);
        }
    }

    const saveSocialLink = async (id: string) => {
        try {
            const url = linkDrafts[id]?.trim();

            if (!url) {
                toast.error("URL is required");
                return;
            }

            await updateSocialLinkApi(id, url);
            toast.success("Social link updated");
            await reloadSocialLinks();
        } catch (error: any) {
            if (!handleAuthError(error)) {
                toast.error("Couldn't update social link");
            }
        }
    }

    const removeSocialLink = async (id: string) => {
        try {
            await deleteSocialLinkApi(id);
            toast.success("Social link deleted");
            await reloadSocialLinks();
        } catch (error: any) {
            if (!handleAuthError(error)) {
                toast.error("Couldn't delete social link");
            }
        }
    }

    const addSocialLink = async () => {
        try {
            if (!newUrl.trim()) {
                toast.error("URL is required");
                return;
            }

            await addSocialLinkApi(newPlatform, newUrl.trim());
            setNewUrl("");
            toast.success("Social link added");
            await reloadSocialLinks();
        } catch (error: any) {
            if (!handleAuthError(error)) {
                toast.error("Couldn't add social link");
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-white hover:bg-gray-100 text-black border-2 w-full md:w-25">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[720px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Update your public profile and social links.
                    </DialogDescription>
                </DialogHeader>

                <FieldGroup>
                    <div className="grid gap-3 md:grid-cols-3">
                        <Field>
                            <Label htmlFor="profile-firstname">First name</Label>
                            <Input id="profile-firstname" value={firstname} onChange={(event) => setFirstname(event.target.value)} />
                        </Field>
                        <Field>
                            <Label htmlFor="profile-middlename">Middle name</Label>
                            <Input id="profile-middlename" value={middlename} onChange={(event) => setMiddlename(event.target.value)} />
                        </Field>
                        <Field>
                            <Label htmlFor="profile-lastname">Last name</Label>
                            <Input id="profile-lastname" value={lastname} onChange={(event) => setLastname(event.target.value)} />
                        </Field>
                    </div>

                    <Field>
                        <Label htmlFor="profile-headline">Headline</Label>
                        <Input id="profile-headline" value={headline} onChange={(event) => setHeadline(event.target.value)} />
                    </Field>

                    <Field>
                        <Label htmlFor="profile-bio">Bio</Label>
                        <textarea
                            id="profile-bio"
                            value={bio}
                            className="min-h-24 rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            onChange={(event) => setBio(event.target.value)}
                        />
                    </Field>

                </FieldGroup>

                <div className="mt-5 flex flex-col gap-3 border-t pt-4">
                    <h3 className="text-sm font-semibold uppercase text-gray-500">Social links</h3>

                    {socialLinks.map((link) => (
                        <div key={link.id} className="grid gap-2 md:grid-cols-[120px_1fr_auto_auto]">
                            <span className="self-center text-sm font-medium">{link.platform}</span>
                            <Input value={linkDrafts[link.id] ?? ""} onChange={(event) => setLinkDrafts((drafts) => ({ ...drafts, [link.id]: event.target.value }))} />
                            <Button type="button" variant="outline" onClick={() => saveSocialLink(link.id)}>
                                Save
                            </Button>
                            <Button type="button" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => removeSocialLink(link.id)}>
                                Delete
                            </Button>
                        </div>
                    ))}

                    <div className="grid gap-2 md:grid-cols-[160px_1fr_auto]">
                        <select
                            value={newPlatform}
                            className="h-9 rounded-md border bg-transparent px-3 text-sm"
                            onChange={(event) => setNewPlatform(event.target.value)}
                        >
                            {socialPlatforms.map((platform) => (
                                <option key={platform} value={platform}>
                                    {platform}
                                </option>
                            ))}
                        </select>
                        <Input placeholder="https://..." value={newUrl} onChange={(event) => setNewUrl(event.target.value)} />
                        <Button type="button" variant="outline" onClick={addSocialLink}>
                            Add
                        </Button>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="button" className="bg-main hover:bg-main-hover" disabled={isSaving} onClick={saveProfile}>
                        Save profile
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

type ProfilePhotoDialogProps = {
    title: string;
    description: string;
    buttonLabel: string;
    currentUsername: string;
    field: "avatarId" | "backgroundId";
    aspectRatio: number;
    outputWidth: number;
    outputHeight: number;
    roundedPreview?: boolean;
    allowZoom?: boolean;
    reloadProfile: () => Promise<void>;
}

function ProfilePhotoDialog({
    title,
    description,
    buttonLabel,
    currentUsername,
    field,
    aspectRatio,
    outputWidth,
    outputHeight,
    roundedPreview = false,
    allowZoom = false,
    reloadProfile,
}: ProfilePhotoDialogProps) {
    const [adjustedFile, setAdjustedFile] = useState<File | null>(null);
    const [sourceName, setSourceName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const savePhoto = async () => {
        if (!adjustedFile) {
            toast.error("Please select an image");
            return;
        }

        try {
            setIsSaving(true);
            const photo = await uploadPhotoApi(adjustedFile);

            await updateProfileApi(currentUsername, {
                [field]: photo.id,
            });

            toast.success(`${title} updated`);
            setAdjustedFile(null);
            setSourceName("");
            await reloadProfile();
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            } else {
                toast.error(`Couldn't update ${title.toLowerCase()}`);
            }
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    size={field === "avatarId" ? "icon" : "sm"}
                    className={field === "avatarId"
                        ? "size-9 rounded-full border bg-white text-black shadow-md hover:bg-gray-100"
                        : "border bg-white/90 text-black shadow-md hover:bg-white"}
                >
                    <CameraIcon className="size-4" />
                    {field === "backgroundId" && <span className="ml-2">{buttonLabel}</span>}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[720px]">
                <DialogHeader>
                    <DialogTitle>Edit {title.toLowerCase()}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <ImageAdjuster
                    title={title}
                    description={description}
                    aspectRatio={aspectRatio}
                    outputWidth={outputWidth}
                    outputHeight={outputHeight}
                    roundedPreview={roundedPreview}
                    allowZoom={allowZoom}
                    selectedName={sourceName}
                    onAdjustedFile={(file, nextSourceName) => {
                        setAdjustedFile(file);
                        setSourceName(nextSourceName);
                    }}
                />

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="button" className="bg-main hover:bg-main-hover" disabled={isSaving} onClick={savePhoto}>
                        Save {title.toLowerCase()}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

type ImageAdjusterProps = {
    title: string;
    description: string;
    aspectRatio: number;
    outputWidth: number;
    outputHeight: number;
    selectedName?: string;
    roundedPreview?: boolean;
    allowZoom?: boolean;
    onAdjustedFile: (file: File, sourceName: string) => void;
}

function ImageAdjuster({
    title,
    description,
    aspectRatio,
    outputWidth,
    outputHeight,
    selectedName,
    roundedPreview = false,
    allowZoom = false,
    onAdjustedFile,
}: ImageAdjusterProps) {
    const previewRef = useRef<HTMLDivElement | null>(null);
    const dragStartRef = useRef<{ pointerX: number; pointerY: number; offsetX: number; offsetY: number } | null>(null);
    const [imageSrc, setImageSrc] = useState("");
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [sourceName, setSourceName] = useState("");
    const [sourceResolution, setSourceResolution] = useState("");
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const inputId = `profile-${title.toLowerCase()}-adjuster`;

    useEffect(() => {
        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [imageSrc]);

    useEffect(() => {
        if (!image || !sourceName) return;

        createAdjustedFile({ x: 0, y: 0 }, 1);
    }, [image, sourceName]);

    const getPreviewMetrics = (nextZoom = zoom) => {
        if (!previewRef.current || !image) return null;

        const previewWidth = previewRef.current.clientWidth;
        const previewHeight = previewRef.current.clientHeight;
        const coverScale = Math.max(previewWidth / image.naturalWidth, previewHeight / image.naturalHeight) * nextZoom;
        const displayWidth = image.naturalWidth * coverScale;
        const displayHeight = image.naturalHeight * coverScale;

        return {
            previewWidth,
            previewHeight,
            coverScale,
            displayWidth,
            displayHeight,
            maxOffsetX: Math.max(0, (displayWidth - previewWidth) / 2),
            maxOffsetY: Math.max(0, (displayHeight - previewHeight) / 2),
        };
    }

    const clampOffset = (nextOffset: { x: number; y: number }, nextZoom = zoom) => {
        const metrics = getPreviewMetrics(nextZoom);

        if (!metrics) return nextOffset;

        return {
            x: Math.min(metrics.maxOffsetX, Math.max(-metrics.maxOffsetX, nextOffset.x)),
            y: Math.min(metrics.maxOffsetY, Math.max(-metrics.maxOffsetY, nextOffset.y)),
        };
    }

    const createAdjustedFile = async (nextOffset = offset, nextZoom = zoom) => {
        if (!image || !previewRef.current) return;

        const metrics = getPreviewMetrics(nextZoom);
        if (!metrics) return;

        const canvas = document.createElement("canvas");
        canvas.width = outputWidth;
        canvas.height = outputHeight;

        const context = canvas.getContext("2d");
        if (!context) return;

        const imageLeft = metrics.previewWidth / 2 + nextOffset.x - metrics.displayWidth / 2;
        const imageTop = metrics.previewHeight / 2 + nextOffset.y - metrics.displayHeight / 2;
        const sourceX = (0 - imageLeft) / metrics.coverScale;
        const sourceY = (0 - imageTop) / metrics.coverScale;
        const sourceWidth = metrics.previewWidth / metrics.coverScale;
        const sourceHeight = metrics.previewHeight / metrics.coverScale;

        context.drawImage(
            image,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            outputWidth,
            outputHeight,
        );

        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
        if (!blob) return;

        const fileName = `${title.toLowerCase()}-${Date.now()}.jpg`;
        onAdjustedFile(new File([blob], fileName, { type: "image/jpeg" }), sourceName);
    }

    const loadImage = (file?: File) => {
        if (!file) return;

        const nextImageSrc = URL.createObjectURL(file);
        const nextImage = new Image();
        nextImage.onload = () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }

            setImageSrc(nextImageSrc);
            setImage(nextImage);
            setSourceName(file.name);
            setSourceResolution(`${nextImage.naturalWidth} x ${nextImage.naturalHeight}px`);
            setOffset({ x: 0, y: 0 });
            setZoom(1);
        };
        nextImage.src = nextImageSrc;
    }

    const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!image) return;

        event.currentTarget.setPointerCapture(event.pointerId);
        dragStartRef.current = {
            pointerX: event.clientX,
            pointerY: event.clientY,
            offsetX: offset.x,
            offsetY: offset.y,
        };
    }

    const dragImage = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!dragStartRef.current) return;

        const nextOffset = clampOffset({
            x: dragStartRef.current.offsetX + event.clientX - dragStartRef.current.pointerX,
            y: dragStartRef.current.offsetY + event.clientY - dragStartRef.current.pointerY,
        });

        setOffset(nextOffset);
    }

    const stopDrag = async () => {
        if (!dragStartRef.current) return;

        dragStartRef.current = null;
        await createAdjustedFile();
    }

    const updateZoom = async (value: number) => {
        const nextZoom = Number(value);
        const nextOffset = clampOffset(offset, nextZoom);
        setZoom(nextZoom);
        setOffset(nextOffset);
        await createAdjustedFile(nextOffset, nextZoom);
    }

    return (
        <div className="flex flex-col gap-3 rounded-md border p-3">
            <div>
                <Label htmlFor={inputId}>{title}</Label>
                <p className="text-xs text-gray-500">{description}</p>
            </div>

            <Input id={inputId} type="file" accept="image/*" onChange={(event) => loadImage(event.target.files?.[0])} />

            <div
                ref={previewRef}
                className={`relative w-full overflow-hidden border bg-gray-100 ${roundedPreview ? "rounded-full" : "rounded-md"}`}
                style={{ aspectRatio }}
                onPointerDown={startDrag}
                onPointerMove={dragImage}
                onPointerUp={stopDrag}
                onPointerCancel={stopDrag}
            >
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        className="absolute left-1/2 top-1/2 max-w-none cursor-grab select-none"
                        style={{
                            width: "100%",
                            minHeight: "100%",
                            transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${zoom})`,
                            transformOrigin: "center",
                        }}
                        draggable={false}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-500">
                        Select an image
                    </div>
                )}
            </div>

            <div className="grid gap-1 text-xs text-gray-600">
                <span>Source: {sourceResolution || "No image selected"}</span>
                <span>Saved crop: {outputWidth} x {outputHeight}px</span>
                {selectedName && <span>Ready: {selectedName}</span>}
            </div>

            {allowZoom && imageSrc && (
                <div className="flex items-center gap-3">
                    <Label htmlFor={`${inputId}-zoom`} className="text-xs">Zoom</Label>
                    <Input
                        id={`${inputId}-zoom`}
                        type="range"
                        min={1}
                        max={3}
                        step={0.05}
                        value={zoom}
                        onChange={(event) => updateZoom(Number(event.target.value))}
                    />
                    <span className="w-10 text-xs text-gray-600">{Math.round(zoom * 100)}%</span>
                </div>
            )}
        </div>
    )
}

export default Profile;
