export interface Case {
	id: string;
	description: string;
	memId: number;
	postRef: string;
	privacyId: number;
	statusId: number;
	thumbnailFileId: null;
	thumbnailUrl: null;
	title: string;
	typeId: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: null;
	c3_type_agence: string;
	c3_commentaires_systeme: string;
	privacyName: string;
	status: Status;
	type: Type;
	signedThumbnailUrl: null;
	tags: any[];
}

export interface Status {
	id: number;
	color: string;
	intl: StatusIntl;
	name: string;
}

export interface StatusIntl {
	en: string;
}

export interface Type {
	id: number;
	color: string;
	name: string;
	intl: TypeIntl;
}

export interface TypeIntl {
	en: string;
	fr: string;
}

export interface Statuses {
	id: number;
	color: string;
	createdAt: Date;
	deletedAt: null;
	intl: Intl;
	memId: number;
	name: string;
	position: number;
	postTypeId: number;
	systemId: string;
	type: string;
	updatedAt: Date;
}

export interface Intl {
	en: string;
	fr: string;
	es: string;
	pt: string;
	de: string;
	ru: string;
	it: string;
	uk: string;
	ro: string;
}
