'use client';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Case, Statuses, type Status } from '@/app/lib/definitions';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateStatus } from './action';

export default function Status({
	postId,
	status,
	statuses,
}: {
	postId: string;
	status: Status;
	statuses: Statuses[];
}) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (statusId: number) =>
			await updateStatus(statusId, postId),
		onSuccess: (data) => {
			queryClient.setQueryData([`cases/${postId}`], data);
			queryClient.setQueryData(['cases'], (prev: any) => {
				console.log(prev);
				if (prev) {
					const newArr = prev.cases.map((c: Case) => {
						return c.id === postId ? data.data : c;
					});
					return { cases: newArr };
				}
			});
		},
	});

	const handleChange = (event: SelectChangeEvent<string>) => {
		const statusId = parseInt(event.target.value, 10);
		mutation.mutate(statusId);
	};

	return (
		<Select
			value={status.id.toString()}
			label='Status'
			onChange={handleChange}
			style={{ marginTop: 16 }}
			disabled={mutation.isPending}
		>
			{statuses.map((stat) => (
				<MenuItem
					key={stat.id}
					value={stat.id.toString()}
					style={{ height: 48 }}
				>
					{stat.name}
				</MenuItem>
			))}
		</Select>
	);
}
