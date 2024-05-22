'use client';

import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';

import type { Case } from '@/app/lib/definitions';
import { useQuery } from '@tanstack/react-query';
import { LinearProgress } from '@mui/material';

const url = 'https://qatestsep14151730.wizdam.xyz';

const columns: GridColDef[] = [
	{
		field: 'postRef',
		headerName: 'Post Ref',
		width: 130,
		renderCell: (row) => {
			return (
				<Link component={NextLink} href={`/cases/${row.id}`}>
					{row.value}
				</Link>
			);
		},
	},
	{
		field: 'status',
		headerName: 'Status',
		width: 180,
		// renderCell: (row) => <Status id={row.id} />,
	},
	{ field: 'id', headerName: 'Case ID', width: 300 },
];

const getRows = (values: Case[]) => {
	return values.map((value) => ({
		id: value.id,
		postRef: value.postRef,
		status: value.status.name,
		statusId: value.statusId,
	}));
};

export default function Cases() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['cases'],
		queryFn: async () => await fetch('/api/cases').then((res) => res.json()),
	});

	if (isLoading) return <LinearProgress />;

	if (isError)
		return <Box style={{ margin: '0 100px' }}>Error fetching cases</Box>;

	return (
		<Box style={{ margin: '0 100px' }}>
			<DataGrid
				rows={getRows(data.cases ?? [])}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 10,
						},
					},
				}}
				pageSizeOptions={[10]}
				disableRowSelectionOnClick
			/>
		</Box>
	);
}
