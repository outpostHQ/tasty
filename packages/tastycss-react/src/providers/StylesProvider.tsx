import { createContext, ReactNode, useContext } from 'react'
import { Styles } from 'tastycss'

export const StyleContext = createContext<any>({})

interface StyleProviderProps {
	children?: ReactNode;
	[key: string]: any;
}

export function StyleProvider({ children, ...props }: StyleProviderProps) {
	const styles = Object.assign({}, useContext(StyleContext))

	Object.keys(props).forEach((propName) => {
		if (styles[propName]) {
			styles[propName] = [...styles[propName], props[propName]]
		} else {
			styles[propName] = [props[propName]]
		}
	})

	// @ts-ignore
	return <StyleContext.Provider value={styles}>{children}</StyleContext.Provider>
}

export function useContextStyles(name: string, props?: Record<string, any>): Styles {
	const contextStyles = useContext(StyleContext)
	const styles = {}

	if (contextStyles[name]) {
		contextStyles[name].forEach((handler: Function | Styles) => {
			Object.assign(styles, typeof handler === 'function' ? handler(props) : handler)
		})
	}

	return styles
}
