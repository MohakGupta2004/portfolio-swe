// Facts come from the resume. Add a project by adding one object.
export type Step = {
	label: string;
	text: string;
};

export type Project = {
	id: string;
	name: string;
	tagline: string;
	intro: string;
	points: string[];
	steps: Step[];
	tech: string[];
	live?: string;
	github: string;
};

export const projects: Project[] = [
	{
		id: 'mcode',
		name: 'mcode',
		tagline: 'Terminal coding agent in C++',
		intro: 'A terminal harness for an LLM coding agent, written from scratch with no framework.',
		points: [
			'Parses the SSE stream token by token, so output shows while the model is still writing.',
			'Tool registry the model calls for file reads and shell commands.',
			'History trimming keeps the chat inside the context window.',
		],
		steps: [
			{ label: 'Prompt', text: 'You type a task in the terminal. It goes to the model over a REST call.' },
			{ label: 'SSE stream', text: 'The reply comes back as server sent events, one small chunk at a time.' },
			{ label: 'Token parser', text: 'Each chunk is parsed as it lands and printed right away.' },
			{ label: 'Tool registry', text: 'If the model asks for a file read or a shell command, the registry runs it.' },
			{ label: 'History', text: 'Old messages are trimmed so the conversation fits the context window.' },
		],
		tech: ['C++', 'CPR', 'REST APIs', 'SSE'],
		github: 'https://github.com/MohakGupta2004/mcode',
	},
	{
		id: 'mredis',
		name: 'mredis',
		tagline: 'Redis-compatible server in Go',
		intro: 'A small Redis server that redis-cli can talk to, because it speaks the real wire protocol.',
		points: [
			'Reads and writes RESP, so redis-cli connects with no changes.',
			'String and list commands, with key expiry.',
			'Split into handlers, RESP, services and a store, one job each.',
		],
		steps: [
			{ label: 'redis-cli', text: 'Any Redis client opens a TCP connection and sends a command.' },
			{ label: 'RESP reader', text: 'Turns the raw bytes into a command name and its arguments.' },
			{ label: 'Commands', text: 'String and list commands, plus expiry, run against the store.' },
			{ label: 'Store', text: 'Holds the keys and values in memory.' },
			{ label: 'RESP writer', text: 'Encodes the answer back into the protocol for the client.' },
		],
		tech: ['Go', 'RESP', 'TCP'],
		github: 'https://github.com/MohakGupta2004/mredis',
	},
	{
		id: 'carpooling',
		name: 'Carpooling Platform',
		tagline: 'Enterprise ride sharing, 1st runner-up',
		intro: 'Drivers publish rides and riders book them. Built in 24 hours with a team of two at a national hackathon.',
		points: [
			'Ride lifecycle modelled as a state machine over 5 core tables.',
			'Driver location and trip events pushed live over Socket.IO with Redis Pub/Sub.',
			'Google Maps routing for pickup matching.',
		],
		steps: [
			{ label: 'Driver', text: 'Publishes a ride with a route and a vehicle.' },
			{ label: 'Rider', text: 'Finds a ride near the pickup point, matched with Google Maps routing.' },
			{ label: 'Booking', text: 'A booking moves the ride through its states: users, vehicles, rides, bookings, trips.' },
			{ label: 'Redis Pub/Sub', text: 'Each event is published once, so every server hears it.' },
			{ label: 'Live updates', text: 'Socket.IO pushes the update to every connected client, not only the sender.' },
		],
		tech: ['TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'Redis', 'Socket.IO'],
		github: 'https://github.com/MohakGupta2004/carpooling-system',
	},
	{
		id: 'launcht',
		name: 'LaunchT',
		tagline: 'Solana token launchpad and trading app',
		intro: 'Mint and trade SPL tokens on Solana Devnet in one app.',
		points: [
			'Bonding curve pricing: price comes from supply, so there is no order book and no pool to seed.',
			'A brand new token can trade from its first transaction.',
			'Full trade path: quote, sign, pending, confirmed, balance refresh.',
		],
		steps: [
			{ label: 'Quote', text: 'The price is worked out from the bonding curve using the current supply.' },
			{ label: 'Build tx', text: 'The app builds the buy or sell transaction.' },
			{ label: 'Sign', text: 'The wallet signs it.' },
			{ label: 'Pending', text: 'The UI waits while the network processes the transaction.' },
			{ label: 'Confirmed', text: 'Once confirmed, balances are refreshed.' },
		],
		tech: ['Next.js', 'TypeScript', '@solana/web3.js', 'SPL'],
		live: 'https://launcht.vercel.app',
		github: 'https://github.com/MohakGupta2004/LaunchT',
	},
	{
		id: 'chainwork',
		name: 'ChainWork',
		tagline: 'Decentralised freelance marketplace',
		intro: 'Client money sits in a smart contract and is released per milestone. Winner of InnovoCon Hacknex 2025.',
		points: [
			'Solidity escrow contract, written and deployed with Hardhat.',
			'Funds are released on chain per milestone, so nobody has to trust a platform.',
			'Role based APIs, plus a WebSocket chat between client and freelancer.',
		],
		steps: [
			{ label: 'Client', text: 'Creates a contract and locks the funds.' },
			{ label: 'Escrow', text: 'A Solidity contract holds the money, not the platform.' },
			{ label: 'Milestone', text: 'The freelancer delivers work one milestone at a time.' },
			{ label: 'Release', text: 'The client approves and the contract pays out on chain.' },
			{ label: 'Chat', text: 'A WebSocket channel keeps both sides talking while the contract is active.' },
		],
		tech: ['React', 'Express', 'Solidity', 'Hardhat', 'Socket.IO'],
		live: 'https://chainworkweb3.vercel.app',
		github: 'https://github.com/MohakGupta2004/ChainWork',
	},
];
