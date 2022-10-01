import { Button, Image, Placeholder } from "@aws-amplify/ui-react";
import React from "react";
import UserController from "../../controller/User";
import { User } from "../../models";
import "./index.css";

export const Header = ({
	user,
	signOut,
}: {
	user: User | undefined;
	signOut: (() => void) | undefined;
}) => {
	const [avatar, setAvatar] = React.useState<string | undefined>(undefined);
	React.useEffect(() => {
		if (user) {
			(async () => {
				const { data } = await new UserController({
					username: user.username,
				}).getAvatar();
				setAvatar(data);
			})();
		}
	}, [user]);

	return (
		<div className="Header">
			<div className="HeaderImage">
				{avatar ? (
					<Image
						src={avatar}
						alt=""
					/>
				) : (
					// Loading animation
					<div className="HeaderImageLoading">
						<div className="HeaderImageLoadingDot" />
						<div className="HeaderImageLoadingDot" />
						<div className="HeaderImageLoadingDot" />
					</div>
				)}
			</div>
			{/* <p>{user?.username}</p> */}
			<Button onClick={signOut}>Sign out</Button>
		</div>
	);
};
