import { get } from 'svelte/store';
import { staticEndpoint, mushafFontVersion } from '$data/websiteSettings';
import { selectableFontTypes } from '$data/options';
import { __fontType } from '$utils/stores';

// Return the URL for the mushaf font by page
export function getMushafWordFontLink(page) {
	const fontTypeId = selectableFontTypes[get(__fontType)]?.id;
	const paddedPage = String(page).padStart(3, '0');

	let fontPath = '';

	switch (fontTypeId) {
		case 2:
		case 3:
			fontPath = `fonts/Hafs/KFGQPC-v4/COLRv1/QCF4${paddedPage}_COLOR-Regular.woff2`;
			break;

		case 9:
			fontPath = `fonts/ISM/FONTS/MSI_Z${paddedPage}-Regular.woff2`;
			break;

		default:
			return null; // or throw an error or fallback path
	}

	return `${staticEndpoint}/${fontPath}?version=${mushafFontVersion}`;
}
