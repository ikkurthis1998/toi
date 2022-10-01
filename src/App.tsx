import { Amplify } from "aws-amplify";
import React from "react";
import "./App.css";

import { Divider, withAuthenticator, WithAuthenticatorProps } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import UserController from "./controller/User";

import awsExports from "./aws-exports";
import { ChatEngine } from "./components/ChatEngine";
import { Header } from "./components/Header";
import { User } from "./models";
Amplify.configure(awsExports);

function App({ signOut, user }: WithAuthenticatorProps) {
	const [storedUser, setStoredUser] = React.useState<User | undefined>(undefined);
	React.useEffect(() => {
		(async () => {
			if (user) {
				const userControls = new UserController({
					username: user.username,
				});
				await userControls.initiate({ user });
				let { data } = await userControls.get();
				setStoredUser(data);
			}
		})();
	}, [user]);
	return (
		<div className="App">
			<Header
				signOut={signOut}
				user={storedUser}
			/>
			<ChatEngine />
		</div>
	);
}

export default withAuthenticator(App);
