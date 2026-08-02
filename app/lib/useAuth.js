'use client';

import { useState, useEffect } from 'react';

function makeUser(email) {
	const raw = (email.split('@')[0] || 'there').replace(/[^a-zA-Z]/g, '') || 'there';
	const firstName = raw.charAt(0).toUpperCase() + raw.slice(1);
	return { firstName, email, initials: firstName.charAt(0).toUpperCase() };
}

/**
 * Demo auth backed by localStorage. Shared across pages so the navbar reflects
 * the same logged-in state everywhere. Swap the localStorage bits for real API
 * calls when the backend is ready.
 */
export function useAuth() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
		const stored = localStorage.getItem('hostUser');
		if (loggedIn && stored) {
			const u = JSON.parse(stored);
			const firstName = u.firstName || (u.email ? u.email.split('@')[0] : 'there');
			setUser({
				firstName,
				email: u.email,
				initials: (firstName || 'U').charAt(0).toUpperCase(),
			});
			setIsLoggedIn(true);
		}
	}, []);

	function login(email) {
		const u = makeUser(email);
		localStorage.setItem('isLoggedIn', 'true');
		localStorage.setItem(
			'hostUser',
			JSON.stringify({ firstName: u.firstName, email: u.email, role: 'guest' })
		);
		setUser(u);
		setIsLoggedIn(true);
	}

	function logout() {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('hostUser');
		setUser(null);
		setIsLoggedIn(false);
	}

	return { isLoggedIn, user, login, logout };
}
