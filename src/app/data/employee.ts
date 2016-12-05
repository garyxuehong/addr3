import { Department } from './department';

export class Employee {
	id: string | undefined;
	firstname: string;
	lastname: string;
	department: Department | undefined;
	phonenumber: string;
	[key: string]: string | Department;
	constructor(args: {
		id?: string;
		firstname?: string;
		lastname?: string;
		department?: Department;
		phonenumber?: string;
	} = {}) {
		this.id = args.id;
		this.firstname = args.firstname;
		this.lastname = args.lastname;
		this.department = args.department;
		this.phonenumber = args.phonenumber;
	}
}
