import Link from 'next/link';
import { useRouter } from 'next/router';

const CoffeeStore = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<div>
			CoffeeStore {id}
			<Link href="/">
				<a href="">Back to home</a>
			</Link>
			<Link href="/coffee-store/;iuh">
				<a href="">Go to page dynamic</a>
			</Link>
		</div>
	);
};

export default CoffeeStore;
