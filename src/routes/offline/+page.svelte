<script>
	import { __currentPage, __offlineDataInformation } from '$utils/stores';
	import { selectableFontTypes, selectableWordTranslations, selectableWordTransliterations, selectableVerseTranslations, verseTranslationsLanguages } from '$data/options';
	import { buttonClasses, disabledClasses } from '$data/commonClasses';
	import { fetchWordData } from '$utils/fetchData';
	import { updateSettings } from '$utils/updateSettings';

	let downloadInProcess = false;

	function getDownloadSize(version) {
		return version === 4 ? '4.2 MB' : '2.3 MB';
	}

	async function downloadData(type, id) {
		downloadInProcess = true;

		await new Promise((r) => setTimeout(r, Math.floor(Math.random() * 10001) + 5000));

		const offlineData = __offlineDataInformation;
		let version = 0;

		id = Number(id);

		// Trigger the appropriate download
		if (type === 'fontType' && selectableFontTypes[id]) {
			await fetchWordData(id, 1, 1);
			version = Number(selectableFontTypes[id].version);
		} else if (type === 'wordTranslation' && selectableWordTranslations[id]) {
			await fetchWordData(1, id, 1);
			version = Number(selectableWordTranslations[id].version);
		} else if (type === 'wordTransliteration' && selectableWordTransliterations[id]) {
			await fetchWordData(1, 1, id);
			version = Number(selectableWordTransliterations[id].version);
		}

		const timestamp = Date.now();

		// Ensure the type key exists
		if (!offlineData[type]) {
			offlineData[type] = {};
		}

		offlineData[type][id] = { id, version, timestamp };

		__offlineDataInformation.set(offlineData);

		updateSettings({ type: 'offlineDataInformation', value: $__offlineDataInformation });

		downloadInProcess = false;
	}

	const verseTranslationsMap = verseTranslationsLanguages.reduce((acc, item) => {
		acc[item.language_id] = { language: item.language };
		return acc;
	}, {});

	__currentPage.set('offline');
</script>

<div class="max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold mb-6">Offline Data Download</h1>

	<div class="space-y-4">
		<!-- Quran font types -->
		<div class="flex flex-col pb-8">
			<div class="relative space-y-6 sm:rounded-3xl">
				<h1 class="text-md md:text-2xl">Quran Font Types</h1>
				<table class="table-auto w-full text-sm">
					<thead class="text-xs uppercase top-0 {window.theme('bgSecondaryLight')}">
						<tr>
							<th class="text-left px-6 py-3 w-full">Data Type</th>
							<th class="text-left px-6 py-3 whitespace-nowrap min-w-[80px]">Size</th>
							<th class="text-left px-6 py-3 whitespace-nowrap min-w-[100px]">Action</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.entries(selectableFontTypes) as [id, item]}
							<tr class="{window.theme('bgMain')} border-b {window.theme('border')} {window.theme('hover')}">
								<td class="px-6 py-4 w-full">{item.type} - {item.font}</td>
								<td class="px-6 py-4 whitespace-nowrap min-w-[80px]">{getDownloadSize(item.version)}</td>
								<td class="px-6 py-4 whitespace-nowrap min-w-[100px] {downloadInProcess && disabledClasses}">
									<button id="fontType-{id}" class={buttonClasses} on:click={() => downloadData('fontType', id)}>Install</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- word translations -->
		<div class="flex flex-col pb-8">
			<div class="relative space-y-6 sm:rounded-3xl">
				<h1 class="text-md md:text-2xl">Word Translations</h1>
				<table class="table-auto w-full text-sm">
					<thead class="text-xs uppercase top-0 {window.theme('bgSecondaryLight')}">
						<tr>
							<th class="text-left px-6 py-3 w-full">Data Type</th>
							<th class="text-left px-6 py-3 whitespace-nowrap min-w-[80px]">Size</th>
							<th class="text-left px-6 py-3 whitespace-nowrap min-w-[100px]">Action</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.entries(selectableWordTranslations) as [id, item]}
							<tr class="{window.theme('bgMain')} border-b {window.theme('border')} {window.theme('hover')}">
								<td class="px-6 py-4 w-full">{item.language}</td>
								<td class="px-6 py-4 whitespace-nowrap min-w-[80px]">{getDownloadSize(item.version)}</td>
								<td class="px-6 py-4 whitespace-nowrap min-w-[100px] {downloadInProcess && disabledClasses}">
									<button id="wordTranslation-{id}" class={buttonClasses} on:click={() => downloadData('wordTranslation', id)}>Install</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- word transliterations -->
		<div class="flex flex-col pb-8">
			<div class="relative space-y-6 sm:rounded-3xl">
				<h1 class="text-md md:text-2xl">Word Transliterations</h1>
				<table class="w-full text-sm text-left rtl:text-right rounded-md table-auto">
					<thead class="text-xs uppercase top-0 {window.theme('bgSecondaryLight')}">
						<tr>
							<th class="px-6 py-3 w-full">Data Type</th>
							<th class="px-6 py-3 whitespace-nowrap min-w-[80px]">Size</th>
							<th class="px-6 py-3 whitespace-nowrap min-w-[100px]">Action</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.entries(selectableWordTransliterations) as [id, item]}
							<tr class="{window.theme('bgMain')} border-b {window.theme('border')} {window.theme('hover')}">
								<td class="px-6 py-4 w-full">{item.language}</td>
								<td class="px-6 py-4 whitespace-nowrap min-w-[80px]">{getDownloadSize(item.version)}</td>
								<td class="px-6 py-4 whitespace-nowrap min-w-[100px] {downloadInProcess && disabledClasses}">
									<button id="wordTransliteration-{id}" class={buttonClasses} on:click={() => downloadData('wordTransliteration', id)}>Install</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<!-- verse translations/transliterations -->
		<div class="flex flex-col pb-8">
			<div class="relative space-y-6 sm:rounded-3xl">
				<h1 class="text-md md:text-2xl">Verse Translations/Transliterations</h1>
				<table class="w-full text-sm text-left rtl:text-right rounded-md table-auto">
					<thead class="text-xs uppercase top-0 {window.theme('bgSecondaryLight')}">
						<tr>
							<th class="px-6 py-3 w-full">Data Type</th>
							<th class="px-6 py-3 whitespace-nowrap min-w-[80px]">Size</th>
							<th class="px-6 py-3 whitespace-nowrap min-w-[100px]">Action</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.entries(selectableVerseTranslations) as [id, item]}
							<tr class="{window.theme('bgMain')} border-b {window.theme('border')} {window.theme('hover')}">
								<td class="px-6 py-4 w-full">{verseTranslationsMap[item.language_id].language} - {item.resource_name}</td>
								<td class="px-6 py-4 whitespace-nowrap min-w-[80px]">{getDownloadSize(item.version)}</td>
								<td class="px-6 py-4 whitespace-nowrap min-w-[100px] {downloadInProcess && disabledClasses}">
									<button id="verseTranslation-{id}" class={buttonClasses}>Install</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
