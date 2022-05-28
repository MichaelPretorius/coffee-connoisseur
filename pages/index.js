import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Banner from '../components/banner/banner';
import Card from '../components/card/card';
import useGeolocation from '../hooks/use-geolocation';
import { fetchCoffeeStores } from '../lib/coffee-stores';
import styles from '../styles/index.module.css';
import { StoreContext, ACTION_TYPES } from '../store/store-context';

const Home = ({ staticCoffeeStores }) => {
	const { locationError, handleTrackLocation, isLoadingLocation } = useGeolocation();
	const {
		dispatch,
		state: { coffeeStores, latLong },
	} = useContext(StoreContext);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (latLong) {
			const getCoffeeStores = async () => {
				try {
					const res = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`);
					const stores = await res.json();
					dispatch({ type: ACTION_TYPES.SET_COFFEE_STORES, payload: stores });
					setError(null);
				} catch (error) {
					setError(error.message);
				}
			};
			getCoffeeStores();
		}
	}, [latLong]);

	const handleOnBannerButtonClick = () => {
		handleTrackLocation();
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta name="description" content="Discover your local coffee shops!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Banner
					buttonText={isLoadingLocation ? 'Locating ...' : 'View stores nearby'}
					handleOnClick={handleOnBannerButtonClick}
				/>

				{locationError && <p>Something went wrong: {locationError}</p>}
				{error && <p>Something went wrong: {error}</p>}

				<div className={styles.heroImage}>
					<Image src="/static/hero-image.png" width={700} height={400} alt="hero image" priority />
				</div>

				{coffeeStores.length > 0 && (
					<div className={styles.sectionWrapper}>
						<h2 className={styles.heading2}>Stores near me</h2>
						<div className={styles.cardLayout}>
							{coffeeStores.map(({ id, name, imgUrl }) => (
								<Card
									key={id}
									name={name}
									imgUrl={
										imgUrl ||
										'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
									}
									href={`/coffee-store/${id}`}
									className={styles.card}
								/>
							))}
						</div>
					</div>
				)}

				{staticCoffeeStores.length > 0 && (
					<div className={styles.sectionWrapper}>
						<h2 className={styles.heading2}>Toronto stores</h2>
						<div className={styles.cardLayout}>
							{staticCoffeeStores.map(({ id, name, imgUrl }) => (
								<Card
									key={id}
									name={name}
									imgUrl={
										imgUrl ||
										'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
									}
									href={`/coffee-store/${id}`}
									className={styles.card}
								/>
							))}
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default Home;

export async function getStaticProps(context) {
	const staticCoffeeStores = await fetchCoffeeStores();

	return { props: { staticCoffeeStores } };
}
