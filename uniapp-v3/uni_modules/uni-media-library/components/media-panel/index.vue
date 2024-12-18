<template>
	<view class="media-panel">
		<view class="content">
			<media-filter
				:selectMediaItems="selectedMediaItems"
				@onSearch="onSearchEvent"
				@onUploadMedia="onUploadMediaEvent"
				@onCancelSelect="() => $refs.mediaList.cancelAllSelected()"
				@onDeleteSelect="(e) => $refs.mediaList.deleteSelectedMedia(e)"
			></media-filter>
			<media-list
				ref="mediaList"
				:media-group="filter.mediaGroup"
				:media-type="mediaType"
				:keyword="filter.keyword"
				:selectedCount="selectedCount"
				@onUploadMedia="onUploadMediaEvent"
				@onSelect="onSelectEvent"
			></media-list>
		</view>
		<view class="media-info-view" :class="{expend: isExpend}">
			<media-info
				:current-media="currentMedia"
			<!-- #ifndef H5 -->
			v-if="currentMedia"
			<!-- #endif -->
			></media-info>
			<view class="expend-btn" @click="expendMediaInfo" v-if="currentMedia">
				<uni-icons :type="isExpend ? 'right': 'left'" size="16" color="#fff"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>

import MediaInfo from "../media-info/index.vue";
import MediaFilter from "../media-filter/index.vue";
import MediaList from "../media-list/index.vue";
import {cropImg, extnameMap, transformPreviewMediaList} from "../../common/upload-helper";
import {FromFileUploader, FromURLUploader} from '../../common/uploader'

export default {
	name: "media-panel",
	props: {
		mediaType: String,
		selectedCount: Number
	},
	expose: ['imageLibraryUploadMediaLibrary', 'getSelectedMediaItems'],
	components: {
		MediaList,
		MediaFilter,
		MediaInfo
	},
	data() {
		return {
			currentMedia: null,
			selectedMediaItems: [],
			isExpend: false,
			filter: {
				mediaGroup: null,
				keyword: null
			}
		}
	},
	watch: {
		currentMedia(newVal) {
			if (!newVal) {
				this.isExpend = false
			}
		}
	},
	methods: {
		onUploadMediaEvent() {
			let uploader = new FromFileUploader()

			uploader.on('progress', (progress) => {
				this.$refs.mediaList.mediaUploadProgress(progress)
			})

			uploader.on('success', (files) => {
				this.$refs.mediaList.mediaUploadSuccess(files)
			})

			uploader.chooseFileAndUpload({
				type: this.mediaType,
				extension: extnameMap[this.mediaType],
				onChooseFile: (files) => {
					this.$refs.mediaList.chooseFiles(files)
				},
				success: () => {
					uploader = null
				},
				fail: (e) => {
					console.error(e)
				}
			})
		},
		async imageLibraryUploadMediaLibrary(images, imageLibraryProvider) {
			let uploader = new FromURLUploader({
				provider: 'internal',
				imageLibraryProvider
			})

			uploader.on('progress', (progress) => {
				this.$refs.mediaList.mediaUploadProgress(progress)
			})

			uploader.on('success', (files) => {
				this.$refs.mediaList.mediaUploadSuccess(files)
			})

			uploader.on('error', (file) => {
				this.$refs.mediaList.mediaUploadFailed(file)
			})

			await uploader.add(images.map(item => ({
				...item,
				name: item.originalName,
				mediaType: 'image'
			})))

			this.$refs.mediaList.chooseFiles(
				uploader.waitUploadFiles
			)

			await uploader.cloudUpload()

			this.$nextTick(() => {
				uploader = null
			})
		},
		onSearchEvent(filter) {
			this.filter = filter
		},
		onSelectEvent(selectedMediaItems) {
			const currentMedia = selectedMediaItems.find(item => item.active)
			this.selectedMediaItems = selectedMediaItems
			this.currentMedia = currentMedia
		},
		getSelectedMediaItems() {
			return this.selectedMediaItems
		},
		expendMediaInfo() {
			this.isExpend = !this.isExpend
		}
	}
}
</script>

<style lang="scss" scoped>
.media-panel {
	flex: 1;
	display: flex;
	min-height: 0;
	position: relative;
	overflow: hidden;

	.content {
		flex: 1;
		padding: 10px;
		display: flex;
		flex-direction: column;
		user-select: none;
	}
}

.media-info-view {
	position: relative;

	.expend-btn {
		display: none;
		position: absolute;
		top: 60px;
		left: -28px;
		background: #2979ff;
		width: 28px;
		height: 40px;
		align-items: center;
		justify-content: center;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
		cursor: pointer;
	}
}


@media screen and (max-width: 1024px) {
	.media-info-view {
		transform: translateX(280px);
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		transition: transform .3s;

		&.expend {
			transform: translateX(0);
		}

		.expend-btn {
			display: flex;
		}
	}
}
</style>
