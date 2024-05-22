'use client';

import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Typography } from '@mui/material';
import { Statuses } from '@/app/lib/definitions';
import Status from './Status';

interface CasePageProps {
	caseId: string;
	statuses: Statuses[];
}

export default function CasePage({ caseId, statuses }: CasePageProps) {
	const { data, isLoading, isError } = useQuery({
		queryKey: [`cases/${caseId}`],
		queryFn: async () =>
			await fetch(`/api/cases/${caseId}`).then((res) => res.json()),
	});

	if (isLoading) return <CircularProgress />;
	if (isError) return <div>Failed fetching Case: {caseId}</div>;

	const post = data.data;

	return (
		<>
			<Typography variant='h4'>{post.postRef}</Typography>
			<Typography variant='subtitle1' color='text.secondary'>
				{post.id}
			</Typography>
			<Status postId={post.id} status={post.status} statuses={statuses} />
		</>
	);
}
