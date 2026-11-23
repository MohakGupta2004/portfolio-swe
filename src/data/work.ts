// Facts come from the resume, the live sites and the repos. Add a product by adding one object.
export type Product = {
	name: string;
	domain: string;
	url: string;
	about: string;
	roles: string[];
	points: string[];
	tech: string[];
	thumbnail?: string;
};

export type WorkGroup = {
	title: string;
	subtitle: string;
	dates?: string;
	logo?: string;
	products: Product[];
};

export const workGroups: WorkGroup[] = [
	{
		title: 'Software Engineer',
		subtitle: 'Valstrand Solutions · part-time, remote, team in Canada',
		dates: 'FEB.2026 – PRESENT',
		logo: '/valstrand.webp',
		products: [
			{
				name: 'Vipin Garg LMS',
				domain: 'app.vipingarg.com',
				url: 'https://app.vipingarg.com',
				about: 'Learning platform for Canadian finance exams, with video lessons and quizzes.',
				roles: ['backend', 'video pipeline', 'deploy'],
				points: [
					'Built the Go backend: enrollment, video lessons, quizzes and an analytics module for 200+ students.',
					'Video pipeline: HLS in Cloud Storage served through Cloud CDN. Moved transcoding into the browser with WebCodecs, which cut the video bill from about $75 to $30 a month.',
					'Also built the Next.js frontend: courses, dashboard, lessons, flashcards and notes.',
					'Runs on Cloud Run, with Cloud Tasks for emails and scheduled call-backs and Cloud Run Jobs for cron work.',
				],
				tech: ['Go', 'PostgreSQL', 'Next.js', 'GCP', 'Docker'],
			},
			{
				name: 'Vipin Garg',
				domain: 'vipingarg.com',
				url: 'https://vipingarg.com',
				about: 'Marketing site for the coaching business, linking to the learning app.',
				roles: ['frontend'],
				points: ['Next.js site with a short quiz that points a visitor to the right exam, batches and course pages.'],
				tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
				thumbnail: '/images/work/vipin-garg.jpg',
			},
			{
				name: 'RealtyCRM',
				domain: 'realtycrm.realtygenie.co',
				url: 'https://realtycrm.realtygenie.co',
				about: 'Multi-tenant CRM for realtors: people, companies, opportunities, tasks and notes.',
				roles: ['frontend', 'database', 'access control'],
				points: [
					'Built the interface, including Kanban boards, an email builder and role based access per organisation.',
					'Designed the first database schema.',
				],
				tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
			},
			{
				name: 'RealtyBuilder',
				domain: 'realtygenie.org',
				url: 'https://realtygenie.org',
				about: 'Multi-tenant landing page builder, opened from a CRM session.',
				roles: ['full stack', 'multi-tenant'],
				points: [
					'Stands up a client site by configuration instead of a fresh deployment, on wildcard subdomains.',
					'Access is managed by the CRM session, so there is no second login.',
				],
				tech: ['Next.js', 'TypeScript', 'Cloud Run'],
			},
			{
				name: 'RealtyGenie',
				domain: 'realtygenie.co',
				url: 'https://realtygenie.co',
				about: 'The marketing site that ties the RealtyGenie products together.',
				roles: ['frontend', 'design'],
				points: [
					'Shows RealtyCRM, CallGenie and the website builder as one product.',
					'Also built 5 realtor websites in React and Next.js with IDX/MLS listings and an embedded voice agent.',
				],
				tech: ['React', 'Next.js', 'Tailwind CSS'],
				thumbnail: '/images/work/realtygenie.jpg',
			},
			{
				name: 'Elv8s',
				domain: 'elv8s.com',
				url: 'https://elv8s.com',
				about: 'Corporate readiness training with soft skills and AI fluency for new joiners.',
				roles: ['frontend'],
				points: ['Company website with programs, about and contact pages.'],
				tech: ['Web'],
				thumbnail: '/images/work/elv8s.jpg',
			},
		],
	},
	{
		title: 'Full Stack Intern',
		subtitle: 'Valstrand Solutions · remote, worked on CallGenie and Airmeet',
		dates: 'DEC.2025 – FEB.2026',
		logo: '/valstrand.webp',
		products: [
			{
				name: 'CallGenie',
				domain: 'callgenie.realtygenie.co',
				url: 'https://callgenie.realtygenie.co',
				about: 'AI voice agent that calls leads, retries and books call-backs for realtors.',
				roles: ['frontend', 'database'],
				points: [
					'Built the frontend: call dashboards, live transcripts, and review screens for qualified leads and booked appointments.',
					'Designed the Prisma and PostgreSQL schema for calls, leads and tenants. 3 client organisations share one database, with indexes and cursor pagination.',
				],
				tech: ['React', 'Next.js', 'Prisma', 'PostgreSQL'],
				thumbnail: '/images/work/callgenie.jpg',
			},
			{
				name: 'Airmeet',
				domain: 'airmeet.realtygenie.co',
				url: 'https://airmeet.realtygenie.co',
				about: 'Custom version of CallGenie for the marketing team at Airmeet.',
				roles: ['voice agent', 'frontend'],
				points: ['Calling agent dashboard with sign in, registration and a leads list, used by their marketing team daily.'],
				tech: ['LiveKit', 'React', 'TypeScript'],
			},
		],
	},
];
