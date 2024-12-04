'use client';
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
	const [darkTheme, setDarkTheme] = useState(true);

	useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, []);

    function toggleTheme() {
        
        if (!darkTheme) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
        setDarkTheme((prev) => !prev)
    }

	useEffect(() => {
		
	}, [darkTheme]);

	return (
		<div>
			<button onClick={() => toggleTheme()}>Toggle Theme</button>
		</div>
	);
};

export default ThemeToggle;