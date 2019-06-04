export interface Bra {
	id: number;
	price: number;
	color: string;
	size: string;
	stock: number;
}

export interface BraImage {
	main: string;
	thumbnail: string;
}

export interface RawBraImage {
	src100: string;
	src600: string;
	src1000: string;
}

export interface BraVariant {
	id: number,
	price: string,
	option1: string,
	option2: string,
	inventory_quantity: number
}