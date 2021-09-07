import { forwardRef, useContext } from 'react'
import styledComponents from 'styled-components'
import { BreakpointsContext, BreakpointsProvider } from '../providers/BreakpointsProvider'
import { pointsToZones } from '../utils/responsive'
import { renderStyles } from '../stringify'
import { modAttrs } from './utils/modAttrs'
import { AllBaseProps } from '../types/component'
import { NuStyles } from './styled'

const DEFAULT_STYLES: NuStyles = {
	display: 'inline-block',
} as const

const Element = styledComponents.div(({ theme }) => theme.css)

const Base = (allProps: AllBaseProps, ref) => {
	let { as, styles: originalStyles, breakpoints, mods, qa, qaVal, css, ...props } = allProps

	const styles: NuStyles = { ...DEFAULT_STYLES, ...originalStyles }

	const contextBreakpoints = useContext(BreakpointsContext)
	const zones = pointsToZones(breakpoints || contextBreakpoints)

	css = `${css || ''}${renderStyles(styles, zones)}`

	if (mods) {
		Object.assign(props, modAttrs(mods))
	}

	return <Element as={as} data-qa={qa} data-qaval={qaVal} {...props} ref={ref} theme={{ css }} />
}

/**
 * The base component of the TastyReact.
 */
const _Base = forwardRef(Base)
export { _Base as Base, BreakpointsProvider }
export * from '../types/component'
export { useContextStyles, StyleProvider } from '../providers/StylesProvider'
export { styled } from './styled'
export { styled as default } from './styled'
export * from './globals'
export * from '../stringify'
export * from '../units'
export * from '../types/component'
export * from '../types/styles'
export * from '../types/render'
