import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
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
} from "@/features/profile/api";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Field, FieldGroup } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
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
import { Education } from "../components/Education";
import Experience from "../components/Experience";
import Project from "../components/Project";
import toast from "react-hot-toast";
import { useAuth } from "@/providers";
import { CameraIcon } from "lucide-react";
import LoadingScreen from "@/shared/components/LoadingScreen";
import { ImageAdjuster } from "../components/ImageAdjuster";
import { PROFILE_AVATAR_MAX_SIZE } from "../utils/profileImageConstants";
import { buildMediaUrl, DEFAULT_AVATAR_URL, DEFAULT_BACKGROUND_URL } from "@/shared/lib/media";

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
    const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR_URL);
    const [backgroundUrl, setBackgroundUrl] = useState(DEFAULT_BACKGROUND_URL)
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
            const nextAvatarUrl = buildMediaUrl(profileResponse.avatarUrl || profileResponse.avatar?.name) || DEFAULT_AVATAR_URL;
            const nextBackgroundUrl = buildMediaUrl(profileResponse.backgroundUrl || profileResponse.background?.name) || DEFAULT_BACKGROUND_URL;
            setAvatarUrl(nextAvatarUrl);
            setBackgroundUrl(nextBackgroundUrl);

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

    const openChat = () => {
        if (!profile?.id) return;

        window.dispatchEvent(new CustomEvent("rapidea:open-chat", {
            detail: profile,
        }));
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
                                hasCurrentPhoto={Boolean(profile?.backgroundId || profile?.background)}
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
                                        outputWidth={PROFILE_AVATAR_MAX_SIZE}
                                        outputHeight={PROFILE_AVATAR_MAX_SIZE}
                                        roundedPreview
                                        allowZoom
                                        hasCurrentPhoto={Boolean(profile?.avatarId || profile?.avatar)}
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
                                <Button type="button" className="bg-main hover:bg-main-hover w-full md:w-25" onClick={openChat}>
                                    Message
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
                        {(headline || bio) && (
                            <div className="flex max-w-90 flex-col items-center justify-start px-3 text-center">
                                {headline && (
                                    <h1 className="text-sm font-semibold text-gray-800">
                                        {headline}
                                    </h1>
                                )}
                                {bio && (
                                    <p className="whitespace-pre-wrap break-words text-xs text-gray-600">
                                        {bio}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
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
                headline: headline.trim(),
                bio: bio.trim(),
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
    hasCurrentPhoto?: boolean;
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
    hasCurrentPhoto = false,
    reloadProfile,
}: ProfilePhotoDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
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
            setIsOpen(false);
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

    const deletePhoto = async () => {
        try {
            setIsSaving(true);
            await updateProfileApi(
                currentUsername,
                field === "avatarId" ? { avatarId: null } : { backgroundId: null },
            );

            toast.success(`${title} deleted`);
            setAdjustedFile(null);
            setSourceName("");
            await reloadProfile();
            setIsOpen(false);
        } catch (error: any) {
            if (error.response?.status === 401) {
                logout();
                toast.error("Token Expired. You have been logged out. Please log in to continue");
                navigate("/login");
            } else {
                toast.error(`Couldn't delete ${title.toLowerCase()}`);
            }
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    setAdjustedFile(null);
                    setSourceName("");
                }
            }}
        >
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
                    <Button
                        variant="destructive"
                        type="button"
                        disabled={isSaving || !hasCurrentPhoto}
                        onClick={deletePhoto}
                    >
                        Delete {title.toLowerCase()}
                    </Button>
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

export default Profile;
