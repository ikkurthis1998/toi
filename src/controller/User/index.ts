import { AmplifyUser } from "@aws-amplify/ui";
import { DataStore, Storage } from "aws-amplify";
import { User } from "../../models";
import { EStatus } from "../../store/enum/status.enum";

class UserController {
	private username: string | undefined;
	public user: User | undefined;

	constructor({ username }: { username?: string }) {
		if (username) {
			this.username = username;
		}
	}

	private async getRandomAvatar() {
		try {
			const defaultAvatarsList = await Storage.list("defaultAvatars/");
			const validAvatars = defaultAvatarsList.filter((avatar) =>
				avatar.key?.includes(".png")
			);
			const randomAvatar = validAvatars[Math.floor(Math.random() * validAvatars.length)];
			// const avatar = await Storage.get(randomAvatar.key as string);
			return randomAvatar.key;
		} catch (error) {
			console.log(error);
		}
	}

	public async getAvatar() {
		try {
			await this.fetch();
			const avatar = await Storage.get(this.user?.avatarKey as string);
			return {
				status: EStatus.SUCCESS,
				message: "Avatar fetched successfully",
				data: avatar,
			};
		} catch (error) {
			throw {
				status: EStatus.ERROR,
				message: "Error fetching avatar",
				data: error,
			};
		}
	}

	public async initiate({ user }: { user: AmplifyUser }) {
		try {
			await this.fetch();
			if (!this.user) {
				this.user = await DataStore.save(
					new User({
						username: user?.username as string,
						email: user?.attributes?.email as string,
						cognitoId: user?.attributes?.sub as string,
						avatarKey: (await this.getRandomAvatar()) || "",
					})
				);
			}
		} catch (error) {
			console.log(error);
		}
	}

	private async fetch() {
		try {
			const users = await DataStore.query(User, (u) =>
				u.username("eq", this.username as string)
			);
			if (users.length > 0) {
				this.user = users[0];
			}
		} catch (error) {
			console.log(error);
		}
	}

	public async get() {
		try {
			await this.fetch();
			if (!this.user) {
				throw {
					status: EStatus.ERROR,
					message: "User not found",
					data: null,
				};
			}
			return {
				status: EStatus.SUCCESS,
				message: "User fetched successfully",
				data: this.user,
			};
		} catch (error) {
			throw {
				status: EStatus.ERROR,
				message: "Error fetching user",
				data: error,
			};
		}
	}
}

export default UserController;
