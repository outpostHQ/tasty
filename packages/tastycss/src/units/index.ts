export const CUSTOM_UNITS = {
	r: 'var(--radius)',
	bw: 'var(--border-width)',
	ow: 'var(--outline-width)',
	x: 'var(--gap)',
};

type UnitHandler = (units: number) => string;

export function defineCustomUnit(name: string, value: string | UnitHandler) {
	CUSTOM_UNITS[name] = value;
}
