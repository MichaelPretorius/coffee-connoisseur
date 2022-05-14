import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/banner/banner';
import Card from '../components/card/card';
import styles from '../styles/index.module.css';
import data from '../data/coffee-stores.json';

const Home = ({ coffeeStores }) => {
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

				{coffeeStores.length > 0 && (
					<>
						<h2 className={styles.heading2}>Toronto stores</h2>
						<div className={styles.cardLayout}>
							{coffeeStores.map(({ id, name, imgUrl }) => (
								<Card key={id} name={name} imgUrl={imgUrl} href={`/coffee-store/${id}`} className={styles.card} />
							))}
						</div>
					</>
				)}
			</main>
		</div>
	);
};

export default Home;

export async function getStaticProps(context) {
	return { props: { coffeeStores: data } };
}
