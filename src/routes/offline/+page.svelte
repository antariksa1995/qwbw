<script>
	import { __currentPage } from '$utils/stores';
	import { selectableWordTranslations, selectableWordTransliterations, selectableVerseTranslations, verseTranslationsLanguages } from '$data/options';
	import { buttonClasses } from '$data/commonClasses';

	// Example function placeholders
	function getDownloadSize(version) {
		// Replace with real size logic per version
		return version === 4 ? '4.2 MB' : '2.3 MB';
	}

	function isUpToDate(version) {
		// Replace with actual logic for update check
		return true;
	}

	export const verseTranslationsMap = verseTranslationsLanguages.reduce((acc, item) => {
		acc[item.language_id] = { language: item.language };
		return acc;
	}, {});

	__currentPage.set('offline');
</script>

<div class="max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold mb-6">Offline Data Download</h1>

	<div class="space-y-4">
		<!-- word translations -->
		<div class="flex flex-col pb-8">
			<div class="relative space-y-6 sm:rounded-3xl">
				<h1 class="text-md md:text-2xl">Word Translations</h1>
				<table class="table-auto w-full text-sm">
					<thead class="text-xs uppercase top-0 {window.theme('bgSecondaryLight')}">
						<tr>
							<th class="text-left px-6 py-3 w-full">Language</th>
							<th class="text-left px-6 py-3 whitespace-nowrap min-w-[80px]">Size</th>
							<th class="text-left px-6 py-3 whitespace-nowrap min-w-[100px]">Action</th>
						</tr>
					</thead>
					<tbody>
						{#each Object.entries(selectableWordTranslations) as [id, item]}
							<tr class="{window.theme('bgMain')} border-b {window.theme('border')} {window.theme('hover')}">
								<td class="px-6 py-4 w-full">{item.language}</td>
								<td class="px-6 py-4 whitespace-nowrap min-w-[80px]">{getDownloadSize(item.version)}</td>
								<td class="px-6 py-4 whitespace-nowrap min-w-[100px]">
									<button class={buttonClasses}>Install</button>
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
								<td class="px-6 py-4 whitespace-nowrap min-w-[100px]">
									<button class={buttonClasses}>Install</button>
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
								<td class="px-6 py-4 whitespace-nowrap min-w-[100px]">
									<button class={buttonClasses}>Install</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
