import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/banner/banner';
import styles from '../styles/index.module.css';

const Home = () => {
	const handleOnBannerButtonClick = () => {
		console.log('handleOnBannerButtonClick');
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta name="description" content="Discover your local coffee shops!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Banner buttonText="View stores nearby" handleOnClick={handleOnBannerButtonClick} />

				<div className={styles.heroImage}>
					<Image src="/static/hero-image.png" width={700} height={400} />
				</div>
			</main>
		</div>
	);
};

export default Home;
