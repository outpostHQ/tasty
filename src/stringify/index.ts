import { renderStyles, setStyleHandlerMap, clearStyleHandlerMap, createStyle } from './renderStyles';
import { DEFAULT_STYLE_HANDLER_MAP } from '../styles';

setStyleHandlerMap(DEFAULT_STYLE_HANDLER_MAP);

export { renderStyles, setStyleHandlerMap, createStyle, clearStyleHandlerMap };
