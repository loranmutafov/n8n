import {
	INodeProperties,
} from 'n8n-workflow';

import {
	makeSimpleField,
} from './SharedFields';

export const signatureOperations = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		displayOptions: {
			show: {
				resource: [
					'signature',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
			},
			{
				name: 'Get',
				value: 'get',
			},
			{
				name: 'Get All',
				value: 'getAll',
			},
			{
				name: 'Update',
				value: 'update',
			},
		],
		default: 'create',
		description: 'Operation to perform',
	},
] as INodeProperties[];

export const signatureFields = [
	// ----------------------------------------
	//            signature: create
	// ----------------------------------------
	{
		displayName: 'Petition ID',
		name: 'petitionId',
		description: 'ID of the petition to sign.',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'signature',
				],
				operation: [
					'create',
				],
			},
		},
	},
	{
		displayName: 'Person ID',
		name: 'personId',
		description: 'ID of the person whose signature to create.',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'signature',
				],
				operation: [
					'create',
				],
			},
		},
	},
	makeSimpleField('signature', 'create'),
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'signature',
				],
				operation: [
					'create',
				],
			},
		},
		options: [
			{
				displayName: 'Comments',
				name: 'comments',
				type: 'string',
				default: '',
				description: 'Comments to leave when signing this petition.',
			},
		],
	},

	// ----------------------------------------
	//              signature: get
	// ----------------------------------------
	{
		displayName: 'Petition ID',
		name: 'petitionId',
		description: 'ID of the petition whose signature to retrieve.',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'signature',
				],
				operation: [
					'get',
				],
			},
		},
	},
	{
		displayName: 'Signature ID',
		name: 'signatureId',
		description: 'ID of the signature to retrieve.',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'signature',
				],
				operation: [
					'get',
				],
			},
		},
	},
	makeSimpleField('signature', 'get'),

	// ----------------------------------------
	//            signature: getAll
	// ----------------------------------------
	{
		displayName: 'Petition ID',
		name: 'petitionId',
		description: 'ID of the petition whose signatures to retrieve.',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'signature',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Return all results.',
		displayOptions: {
			show: {
				resource: [
					'signature',
				],
				operation: [
					'getAll',
				],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		description: 'The number of results to return.',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: [
					'signature',
				],
				operation: [
					'getAll',
				],
				returnAll: [
					false,
				],
			},
		},
	},
	makeSimpleField('signature', 'getAll'),

	// ----------------------------------------
	//            signature: update
	// ----------------------------------------
	{
		displayName: 'Petition ID',
		name: 'petitionId',
		description: 'ID of the petition whose signature to update.',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'signature',
				],
				operation: [
					'update',
				],
			},
		},
	},
	{
		displayName: 'Signature ID',
		name: 'signatureId',
		description: 'ID of the signature to update.',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'signature',
				],
				operation: [
					'update',
				],
			},
		},
	},
	makeSimpleField('signature', 'update'),
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'signature',
				],
				operation: [
					'update',
				],
			},
		},
		options: [
			{
				displayName: 'Comments',
				name: 'comments',
				type: 'string',
				default: '',
				description: 'Comments to leave when signing this petition.',
			},
		],
	},
] as INodeProperties[];
