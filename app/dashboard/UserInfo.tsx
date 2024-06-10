'use client';

import ButtonSignin from '@/components/ButtonSignin';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function UserInfo() {
	const { data: session, status } = useSession();
	const [user, setUser] = useState(null);
	let credits: number;
	if (
		typeof window !== 'undefined' &&
		window.localStorage.getItem('credits') !== null
	) {
		credits = parseInt(window.localStorage.getItem('credits'));
		console.log('credits from local storage:', credits);
	} else {
		credits = user?.credits || 0;
	}

	useEffect(() => {
		if (session) {
			fetch(`/api/user?userId=${session.user.id}`)
				.then((response) => response.json())
				.then((data) => {
					console.log('Fetched data:', data);
					setUser(data);
					localStorage.setItem('credits', data.credits);
				})
				.catch((error) => console.error('Error:', error));
		}
	}, [session, credits]);

	// Render the credits or a loading message if the user data hasn't loaded yet
	return (
		<div className="text-center text-sm text-white-500">
			{user ? `Credits: ${credits}` : ""}
			{!session ? <ButtonSignin extraStyle="btn-primary" /> : "" }
		</div>
	);
}
