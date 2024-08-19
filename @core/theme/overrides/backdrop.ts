import { hexToRGBA } from '@/@core/utils/hex-to-rgba'

import { OwnerStateThemeType } from "."

const Backdrop = () => {
	return {
		MuiBackdrop: {
			styleOverrides: {
				root: ({ theme }: OwnerStateThemeType) => ({
					backgroundColor:
						theme.palette.mode === 'light'
							? `rgba(${theme.palette.common.black}, 0.5)`
							: hexToRGBA('#101121', 0.87),
				}),
				invisible: {
					backgroundColor: 'transparent',
				},
			},
		},
	}
}

export default Backdrop
