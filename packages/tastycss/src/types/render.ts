export type StyleValue<T = string> = number | null | boolean | undefined | T;

export type StyleValueStateMap<T = string> = {
	[key: string]: StyleValue<T>;
};

export type ResponsiveStyleValue<T = string> =
	| StyleValue<T>
	| StyleValue<T>[]
	| StyleValueStateMap<T>
	| StyleValueStateMap<T>[];

export type ComputeModel = string | number;

export type CSSMap = { $?: string } & { [key: string]: string | string[] };

export type RawStyleHandler = (value: StyleValueStateMap, suffix?: string) => CSSMap | CSSMap[] | void;

export type StyleHandler = RawStyleHandler & {
	__lookupStyles: string[];
};

export interface StyleStateData {
	model?: ComputeModel;
	tokens?: string[];
	value: ResponsiveStyleValue;
	/** The list of mods to apply */
	mods: string[];
	/** The list of **not** mods to apply (e.g. `:not(:hover)`) */
	notMods: string[];
}

export type StyleStateDataList = StyleStateData[];

export type StyleStateDataListMap = { [key: string]: StyleStateDataList };

/** An object that describes a relation between specific modifiers and style value. **/
export interface StyleState {
	/** The list of mods to apply */
	mods: string[];
	/** The list of **not** mods to apply (e.g. `:not(:hover)`) */
	notMods: string[];
	/** The value to apply */
	value: StyleMap;
}

export type ComputeUnit = string | (string | string[])[];

export type StyleStateList = StyleState[];

export type StyleMap = { [key: string]: ResponsiveStyleValue } | { [key: string]: StyleValue };

export type StyleStateMap = { [key: string]: StyleState };

export type StyleStateMapList = StyleStateMap[];

export type StyleStateListMap = { [key: string]: StyleStateList };
