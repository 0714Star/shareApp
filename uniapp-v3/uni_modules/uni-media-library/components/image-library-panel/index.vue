<template>
	<view class="wrap">
		<view class="media-filter-warp">
			<view class="filter-options">
				<button
					type="primary"
					size="mini"
					@click="$emit('onCopyToMediaLibrary', selectedImages)"
					:disabled="selectedCount <= 0"
				>
					<text>复制到媒体库</text>
				</button>
				<div class="split"></div>
				<uni-easyinput
					v-model="keyword"
					class="search-input"
					suffixIcon="search"
					placeholder="搜索图片素材"
					@iconClick="search"
					@blur="search"
				></uni-easyinput>
			</view>
		</view>
		<scroll-view
			class="media-view"
			scroll-y
			@scrolltolower="loadMore"
		>
			<view v-if="loading && page === 1" class="loading">
				<uni-icons class="icon" type="spinner-cycle" size="30" color="#000"></uni-icons>
			</view>
			<view class="items" v-else-if="list.length">
				<view
					class="media-item"
					:class="{selected: item.selected}"
					v-for="(item, index) in list"
					@click="onSelect(index)"
					:key="item.id"
				>
					<view class="image">
						<image
							:src="item.thumbUrl"
							mode="aspectFill" class="img"></image>
					</view>
				</view>
			</view>
			<view class="media-library-isnull" v-else>
				<uni-icons type="images" size="60" color="#ccc"></uni-icons>
				<view class="text">搜索免费的素材使用吧！</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>

const uniMediaLibraryCo = uniCloud.importObject('uni-media-library-co', {
	customUI: true
})

export default {
	name: "image-library-panel",
	emits: ['onCopyToMediaLibrary'],
	expose: [],
	props: {
		provider: String
	},
	data() {
		return {
			keyword: '',
			loading: false,
			page: 1,
			pageSize: 30,
			list: [],
		}
	},
	watch: {
		page () {
			this.loadList()
		}
	},
	computed: {
		selectedCount () {
			return this.selectedImages.length
		},
		selectedImages () {
			return this.list.filter(item => item.selected)
		}
	},
	methods: {
		search () {
			if (this.loading) return

			if (this.page === 1) {
				this.loadList()
			} else {
				this.page = 1
			}
		},
		async loadList () {
			if (!this.keyword || this.loading) return

			this.loading = true

			let res
			try {
				res = await uniMediaLibraryCo.searchImageLibrary({
					keyword: this.keyword,
					page: this.page,
					pageSize: this.pageSize,
					provider: this.provider
				})
			} catch (e) {
				return uni.showToast({
					title: e.errMsg || e.message,
					icon: 'none'
				})
			} finally {
				this.loading = false
			}

			if (this.page === 1) {
				this.list = res.data
			} else {
				this.list = [...this.list, ...res.data]
			}
		},
		loadMore () {
			if (!this.loading) {
				this.page += 1
			}
		},
		onSelect(index) {
			if (this.loading) return

			const mediaItem = this.list[index]
			this.$set(mediaItem, 'selected', !mediaItem.selected)
		}
	}
}
</script>

<style lang="scss">
.wrap {
	flex: 1;
	padding: 10px;
	display: flex;
	flex-direction: column;
	user-select: none;
	min-height: 0;
}
.media-view {
	flex: 1;
	margin-top: 10px;
	overflow-y: auto;

	.items {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
}

.loading {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	.icon {
		animation: rotate 1s linear infinite;
	}
}

.media-item {
	--row-media-item: 7;
	width: calc(100% / var(--row-media-item) - (((var(--row-media-item) - 1) * 10px) / (var(--row-media-item)) + 0.01px));
	border: #f5f5f5 solid 5px;
	border-radius: 6px;
	box-sizing: border-box;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: border-color .25s;

	&.selected {
		border-color: #2979ff;
	}

	.image {
		height: 0;
		padding-bottom: 100%;
		position: relative;

		.img, .v {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 4px;
		}
	}

	.mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		background: rgba(0, 0, 0, .5);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.tip {
			font-size: 12px;
			color: #fff;
			margin-top: 5px;
		}
	}

	.progress {
		width: 80%;
		height: 4px;
		border-radius: 2px;
		background: #fff;
		position: relative;
		overflow: hidden;

		.inner {
			width: 0;
			height: 100%;
			border-radius: 2px;
			transition: width .3s;
			background: #2979ff;
		}
	}
}

.media-library-isnull {
	padding-top: 50px;
	text-align: center;

	.text {
		font-size: 18px;
		color: #ccc;
		margin-top: 5px;
		margin-bottom: 30px;
	}
}

.media-filter-warp {
	display: flex;
	align-items: center;

	.split {
		width: 1px;
		height: 14px;
		background: #f1f1f1;
		margin: 0 5px;
	}

	.filter-options {
		display: flex;
		align-items: center;
		gap: 5px;

		.search-input, .group-select {
			min-width: 200px;
		}
	}

	.select-options {
		display: flex;
		align-items: center;
		gap: 5px;
	}
}

@media screen and (max-width: 768px) {
	.media-filter-warp {
		flex-direction: column;
		align-items: flex-start;

		.select-options {
			margin-top: 15px;
		}
	}
}

@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg)
	}
}

@media screen and (max-width: 768px) {
	.media-item {
		--row-media-item: 3;
	}
}

@media screen and (min-width: 768px) {
	.media-item {
		--row-media-item: 5;
	}
}

@media screen and (min-width: 1360px) {
	.media-item {
		--row-media-item: 7;
	}
}

@media screen and (min-width: 1920px) {
	.media-item {
		--row-media-item: 10;
	}
}

@media screen and (min-width: 2560px) {
	.media-item {
		--row-media-item: 15;
	}
}
</style>
