import { styled } from './styled'

const Element = styled({
	tag: 'article',
	attrs: {
		role: 'article',
	},
	availableMods: ['mod2'],
})

export function Block() {
	return <Element mods={{ mod2: true }}>123</Element>
}
