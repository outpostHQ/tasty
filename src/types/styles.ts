import { NuStyles } from './render';
import {
  BASE_STYLES,
  BLOCK_STYLES,
  COLOR_STYLES,
  CONTAINER_STYLES,
  DIMENSION_STYLES,
  FLOW_STYLES,
  OUTER_STYLES,
  POSITION_STYLES,
  TEXT_STYLES
} from '../styles/list';

export type BaseStyleProps = Pick<NuStyles, typeof BASE_STYLES[number]>;
export type PositionStyleProps = Pick<NuStyles, typeof POSITION_STYLES[number]>;
export type BlockStyleProps = Pick<NuStyles, typeof BLOCK_STYLES[number]>;
export type ColorStyleProps = Pick<NuStyles, typeof COLOR_STYLES[number]>;
export type TextStyleProps = Pick<NuStyles, typeof TEXT_STYLES[number]>;
export type DimensionStyleProps = Pick<NuStyles,
  typeof DIMENSION_STYLES[number]>;
export type FlowStyleProps = Pick<NuStyles, typeof FLOW_STYLES[number]>;
export type ContainerStyleProps = Pick<NuStyles,
  typeof CONTAINER_STYLES[number]>;
export type OuterStyleProps = Pick<NuStyles, typeof OUTER_STYLES[number]>;
