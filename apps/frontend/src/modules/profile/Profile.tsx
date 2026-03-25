import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getProfileApi, getSocialLinkApi } from "@/api";
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

function Profile() {
    type SocialLink = {
        platform: keyof typeof socialIcons;
        url: string;
    };

    const { username } = useParams()
    const [name, setName] = useState("");
    const [headline, setHeadline] = useState("");
    const [bio, setBio] = useState("");
    const [coursesCount, setCoursesCount] = useState(0);
    const [postsCount, setPostsCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [subscribersCount, setSubscribersCount] = useState(0);
    const [ratingCount, setRatingCount] = useState("");
    const [rating, setRating] = useState(0);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [isUser, setIsUser] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

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
    
    if (!username) {
        throw new Error("Invalid profile link");
    }

    // Get profile data
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await getProfileApi(username);
                const profileResponse = response.profile;

                if (profileResponse.middlename) {
                    setName(`${profileResponse.firstname} ${profileResponse.middlename} ${profileResponse.lastname}`);
                }
                else {
                    setName(`${profileResponse.firstname} ${profileResponse.lastname}`);
                }

                if (profileResponse.headline) {
                    setHeadline(profileResponse.headline);
                }

                if (profileResponse.bio) {
                    setBio(profileResponse.bio);
                }

                setCoursesCount(profileResponse.coursesCount);
                setPostsCount(profileResponse.postsCount);
                setFollowersCount(profileResponse.followersCount);
                setFollowingCount(profileResponse.followingCount);
                setSubscribersCount(profileResponse.subscribersCount);
                setRating(profileResponse.rating);

                if (profileResponse.ratingCount >= 1000000) {
                    const millionRating = profileResponse.ratingCount/1000000;
                    const roundedMillionRating = millionRating.toFixed(1) + "M"; // Rounded up to 1 decimal add M for million
                    setRatingCount(roundedMillionRating);
                }
                else if (profileResponse.ratingCount >= 1000) {
                    const thousandRating = profileResponse.ratingCount/1000000;
                    const roundedThousandRating = thousandRating.toFixed(1) + "K"; // Rounded up to 1 decimal add M for thousand
                    setRatingCount(roundedThousandRating);
                }
                else {
                    setRatingCount(profileResponse.ratingCount.toString());
                }

                if (!response.viewerId) {
                    setIsOwner(false);
                    setIsUser(false);
                }
                else {
                    setIsUser(true);

                    if (response.viewerId === response.profileId) {
                        setIsOwner(true);
                    }
                }



            } catch (error: any) {
                if (error.response?.status === 401) {
                    console.error("Token Expired");
                    logout();
                    toast.error("Token Expired. You have been logged out. Please log in to continue");
                    navigate('/login')
                // handle logout or redirect
                }
                throw error;
            }
        }
        loadProfile();
    }, [username]);

    useEffect(() => {
        const loadSocialLinks = async () => {
            try {
                const response = await getSocialLinkApi(username);
                setSocialLinks(response.socialLinks);
            } catch (error: any) {
                throw error;
            }
        }
        loadSocialLinks();
    }, [username]);

    return(
        <div className="flex flex-col items-center justify-start px-2 gap-3 w-full max-w-350">
            <div className="flex flex-col items-center justify-start rounded-md border shadow-md w-full gap-3">
                <img src={`${import.meta.env.VITE_PHOTO_STORAGE}default_background.jpg`} className="w-full aspect-3/1 object-cover rounded-md" />
                
                <div className="flex flex-row items-start justify-around w-full gap-2 px-2">
                    <div className="flex flex-col items-center justify-center -mt-15 gap-4 w-40">
                        <img src={`${import.meta.env.VITE_PHOTO_STORAGE}default_avatar.png`} className="rounded-full border-4 w-40 aspect-square"/>
                        <div className="flex flex-col md:flex-row items-center content-center justify-center w-full gap-2">
                            {isOwner && (
                                <Button asChild className="bg-white hover:bg-gray-100 text-black border-2 w-full md:w-25">
                                    <p>Edit</p>
                                </Button>
                            )}
                            {isUser && !isOwner && (
                                <Button asChild className="bg-main hover:bg-main-hover w-full md:w-25">
                                    <p>Follow</p>
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
                        <p>
                            {`${postsCount} Posts`}
                        </p>
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
                </div>
            </div>

            <Experience username={username} isOwner={isOwner}/>
            <Education username={username} isOwner={isOwner}/>
            <Project username={username} isOwner={isOwner}/>

        </div>
    );
}
export default Profile;