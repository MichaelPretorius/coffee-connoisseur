import { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cls from 'classnames';
import useSWR from 'swr';

import styles from '../../styles/coffee-store.module.css';
import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { StoreContext } from '../../store/store-context';
import { fetcher, isEmpty } from '../../utils';

const CoffeeStore = props => {
	const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);
	// const [voting, setVoting] = useState(0);
	const router = useRouter();
	const id = router.query.id;

	const {
		state: { coffeeStores },
	} = useContext(StoreContext);

	const handleCreateCoffeeStore = async ({ name, imgUrl, neighbourhood, address, id }) => {
		try {
			const data = {
				id,
				name,
				voting: 0,
				imgUrl,
				neighbourhood: neighbourhood || '',
				address: address || '',
			};
			await fetch('/api/createCoffeeStore', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
		} catch (error) {
			console.error('Error creating coffee store ', error);
		}
	};

	useEffect(() => {
		console.log('ran1');
		if (isEmpty(props.coffeeStore)) {
			console.log('ran2');
			if (coffeeStores.length > 0) {
				const coffeeStoreFromContext = coffeeStores.find(store => store.id == id);

				if (coffeeStoreFromContext) {
					setCoffeeStore(coffeeStoreFromContext);
					handleCreateCoffeeStore(coffeeStoreFromContext);
				}
			}
		} else {
			handleCreateCoffeeStore(props.coffeeStore);
		}
	}, [id]);

	const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

	useEffect(() => {
		if (data && data.length > 0) {
			setCoffeeStore(data[0]);
			// setVoting(data[0].voting);
		}
	}, [data]);

	const handleUpvoteButton = async () => {
		try {
			const res = await fetch('/api/favouriteCoffeeStoreById', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id }),
			});
			const dbCoffeeStore = await res.json();
			if (dbCoffeeStore && dbCoffeeStore.length > 0) {
				// setVoting(voting + 1);
				setCoffeeStore(dbCoffeeStore[0]);
			}
		} catch (error) {
			console.error('Error upvoting coffee store ', error);
		}
	};

	if (error) return <div>Something went wrong retrieving coffee store page.</div>;
	if (router.isFallback || !coffeeStore) return <div>Loading...</div>;

	const { name = '', imgUrl = '', address = '', neighborhood = '', voting = 0 } = coffeeStore;

	return (
		<div className={styles.layout}>
			<Head>
				<title>{name}</title>
			</Head>

			<div className={styles.container}>
				<div className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href="/">
							<a href="">← Back to home</a>
						</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{name}</h1>
					</div>
					<Image
						src={
							imgUrl ||
							'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
						}
						width={600}
						height={360}
						className={styles.storeImg}
						alt={name}
					/>
				</div>

				<div className={cls('glass', styles.col2)}>
					<div className={styles.iconWrapper}>
						<Image src="/static/icons/places.svg" width={24} height={24} />
						<p className={styles.text}>{address}</p>
					</div>
					{neighborhood && (
						<div className={styles.iconWrapper}>
							<Image src="/static/icons/nearMe.svg" width={24} height={24} />
							<p className={styles.text}>{neighbourhood}</p>
						</div>
					)}
					<div className={styles.iconWrapper}>
						<Image src="/static/icons/star.svg" width={24} height={24} />
						<p className={styles.text}>{voting}</p>
					</div>

					<button className={styles.upvoteButton} onClick={handleUpvoteButton}>
						Up vote!
					</button>
				</div>
			</div>
		</div>
	);
};

export default CoffeeStore;

export async function getStaticPaths(context) {
	const coffeeStores = await fetchCoffeeStores();
	const paths = coffeeStores.map(({ id }) => ({
		params: {
			id: id.toString(),
		},
	}));
	return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
	const coffeeStores = await fetchCoffeeStores();
	const coffeeStore = coffeeStores.find(store => store.id == params.id);
	return { props: { coffeeStore: coffeeStore ?? {} } };
}
