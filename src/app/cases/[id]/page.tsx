import Box from '@mui/material/Box';
import { Statuses } from '@/app/lib/definitions';

import CasePage from './CasePage';

type PageProps = {
	params: { id: string };
};

const api = process.env.API_URL;
const apiKey = process.env.WV_PUBLIC_API_KEY;

export default async function Page({ params }: PageProps) {
	const statusesResponse = await fetch(
		`${api}/cases/statuses?filter[postTypeId]=3`,
		{
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		}
	);
	const statusesJson = await statusesResponse.json();
	const statuses: Statuses[] = statusesJson.data.statuses;

	return (
		<Box style={{ margin: '40px 60px' }}>
			<CasePage caseId={params.id} statuses={statuses} />
		</Box>
	);
}
