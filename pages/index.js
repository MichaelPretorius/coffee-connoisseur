import Head from 'next/head';
import { Banner } from '../components/banner/banner';
import styles from '../styles/Home.module.css';

export default function Home() {
	const handleOnBannerButtonClick = () => {
		console.log('handleOnBannerButtonClick');
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Discover your local coffee shops!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Banner buttonText="View stores nearby" handleOnClick={handleOnBannerButtonClick} />
			</main>
		</div>
	);
}
