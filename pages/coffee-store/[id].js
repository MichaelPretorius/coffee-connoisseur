import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import cls from 'classnames';

import styles from '../../styles/coffee-store.module.css';
import data from '../../data/coffee-stores.json';

const CoffeeStore = ({ coffeeStore }) => {
	const router = useRouter();

	if (router.isFallback) return <div>Loading...</div>;

	const { name, address, neighbourhood, imgUrl } = coffeeStore;

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
							<a href="">Back to home</a>
						</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{name}</h1>
					</div>
					<Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name} />
				</div>

				<div className={cls('glass', styles.col2)}>
					<div className={styles.iconWrapper}>
						<Image src="/static/icons/places.svg" width={24} height={24} />
						<p className={styles.text}>{address}</p>
					</div>
					<div className={styles.iconWrapper}>
						<Image src="/static/icons/nearMe.svg" width={24} height={24} />
						<p className={styles.text}>{neighbourhood}</p>
					</div>
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
	const paths = data.map(({ id }) => ({
		params: {
			id: id.toString(),
		},
	}));
	return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
	return { props: { coffeeStore: data.find(store => store.id == params.id) } };
}
