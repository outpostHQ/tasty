import {
	BASE_STYLES,
	BLOCK_STYLES,
	COLOR_STYLES,
	CONTAINER_STYLES,
	DIMENSION_STYLES,
	FLOW_STYLES,
	OUTER_STYLES,
	POSITION_STYLES,
	TEXT_STYLES,
} from '../styles/list';
import { Styles } from '../styles/types';

export type BaseStyleProps = Pick<Styles, typeof BASE_STYLES[number]>;
export type PositionStyleProps = Pick<Styles, typeof POSITION_STYLES[number]>;
export type BlockStyleProps = Pick<Styles, typeof BLOCK_STYLES[number]>;
export type ColorStyleProps = Pick<Styles, typeof COLOR_STYLES[number]>;
export type TextStyleProps = Pick<Styles, typeof TEXT_STYLES[number]>;
export type DimensionStyleProps = Pick<Styles, typeof DIMENSION_STYLES[number]>;
export type FlowStyleProps = Pick<Styles, typeof FLOW_STYLES[number]>;
export type ContainerStyleProps = Pick<Styles, typeof CONTAINER_STYLES[number]>;
export type OuterStyleProps = Pick<Styles, typeof OUTER_STYLES[number]>;
