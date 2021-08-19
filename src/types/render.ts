export type NuStyles = {
  [key: string]: NuResponsiveStyleValue<string | number | boolean | undefined>;
};

export type NuStyleValue<T = string> = number | null | boolean | undefined | T;

export type NuStyleValueStateMap<T = string> = {
  [key: string]: NuStyleValue<T>;
};

export type NuResponsiveStyleValue<T = string> =
  | NuStyleValue<T>
  | NuStyleValue<T>[]
  | NuStyleValueStateMap<T>
  | NuStyleValueStateMap<T>[];

export type NuComputeModel = string | number;

export type NuCSSMap = { $?: string } & { [key: string]: string | string[] };

export type NuStyleHandler = ((value: NuStyleValueStateMap) => NuCSSMap | NuCSSMap[]) & {
  __lookupStyles: string[];
};

export interface NuStyleStateData {
  model?: NuComputeModel;
  tokens?: string[];
  value: NuResponsiveStyleValue;
  /** The list of mods to apply */
  mods: string[];
  /** The list of **not** mods to apply (e.g. `:not(:hover)`) */
  notMods: string[];
}

export type NuStyleStateDataList = NuStyleStateData[];

export type NuStyleStateDataListMap = { [key: string]: NuStyleStateDataList };

/** An object that describes a relation between specific modifiers and style value. **/
export interface NuStyleState {
  /** The list of mods to apply */
  mods: string[];
  /** The list of **not** mods to apply (e.g. `:not(:hover)`) */
  notMods: string[];
  /** The value to apply */
  value: NuStyleMap;
}

export type NuComputeUnit = string | (string | string[])[];

export type NuStyleStateList = NuStyleState[];

export type NuStyleMap = { [key: string]: NuResponsiveStyleValue } | { [key: string]: NuStyleValue };

export type NuStyleStateMap = { [key: string]: NuStyleState };

export type NuStyleStateMapList = NuStyleStateMap[];

export type NuStyleStateListMap = { [key: string]: NuStyleStateList };
