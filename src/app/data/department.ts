export class Department {
	id: string | undefined;
	name: string;
	[key: string]: string;
	constructor(args: {
		id?: string;
		name?: string
	} = {}) {
		this.id = args.id;
		this.name = args.name;
	}
}