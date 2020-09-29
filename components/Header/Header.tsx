import React from 'react';
import { useRouter } from 'next/router';
import { InlineText } from 'react-tinacms-inline';
import styles from './Header.module.scss';

export const Header =  ({ servicesTitle, aboutTitle, contactTitle }) => {
	const router = useRouter();
	const { languageCode } = router.query;

	const handleLanguageSelect = ({ target }) => {
		router.push(`/${target.value}`);
		localStorage.setItem('selectedLanguage', target.value);
	};

	return (
		<header className={styles.header}>
			<div className={styles.header_inner}>
				<h1 className={styles.title}>
					<InlineText name="title" />
				</h1>
				<nav className={styles.nav}>
					<ul className={styles.menu}>
						<a href={`#${servicesTitle}`}>
							<li>{servicesTitle}</li>
						</a>
						<a href={`#${aboutTitle}`}>
							<li>{aboutTitle}</li>
						</a>
						<a href={`#${contactTitle}`}>
							<li>{contactTitle}</li>
						</a>
					</ul>
					<select value={languageCode} onChange={handleLanguageSelect}>
						<option value="en">English</option>
						<option value="jp">日本語</option>
					</select>
				</nav>
			</div>
		</header>
	);
};
