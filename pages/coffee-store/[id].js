import { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cls from 'classnames';

import styles from '../../styles/coffee-store.module.css';
import { fetchCoffeeStores } from '../../lib/coffee-stores';
import { StoreContext } from '../../store/store-context';
import { isEmpty } from '../../utils';

const CoffeeStore = props => {
	const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);
	const router = useRouter();

	if (router.isFallback) return <div>Loading...</div>;
	const id = router.query.id;

	const {
		state: { coffeeStores },
	} = useContext(StoreContext);

	useEffect(() => {
		if (isEmpty(props.coffeeStore)) {
			if (coffeeStores.length > 0) {
				const coffeeStore = coffeeStores.find(store => store.id == id);
				setCoffeeStore(coffeeStore);
			}
		}
	}, [id]);

	const { name, imgUrl, address, neighborhood } = coffeeStore;

	const handleUpvoteButton = () => {
		console.log('handleUpvoteButton');
	};

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
						<p className={styles.text}>5</p>
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
