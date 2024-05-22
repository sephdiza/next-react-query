import NextLink from 'next/link';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default async function Home() {
	return (
		<main>
			<Box style={{ margin: '24px 40px' }}>
				<Link component={NextLink} href={'/cases'}>
					<Typography variant='h5'>Case List</Typography>
				</Link>
			</Box>
		</main>
	);
}
