<template>
	<view class="media-filter-warp">
		<view class="filter-options">
			<button
				type="primary"
				size="mini"
				@click="$emit('onUploadMedia')"
			>
				<uni-icons type="cloud-upload" size="14" color="#fff"></uni-icons>
				<text>上传</text>
			</button>
			<div class="split"></div>
			<!--      <uni-data-select-->
			<!--          v-model="mediaGroup"-->
			<!--          class="group-select"-->
			<!--          @change="search"-->
			<!--      ></uni-data-select>-->
			<uni-easyinput
				v-model="keyword"
				class="search-input"
				suffixIcon="search"
				placeholder="搜索所有媒体..."
				@iconClick="search"
				@blur="search"
			></uni-easyinput>
		</view>
		<view style="flex: 1;"></view>
		<view class="select-options" v-if="isSelected">
			<button type="default" size="mini" @click="$emit('onCancelSelect')">取消选中({{ selectedCount }})</button>
			<button type="warn" size="mini" @click="deleteMedia">删除</button>
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog
					:title="`删除${selectedCount}项媒体资源?`"
					confirmText="确定删除"
					cancelText="取消"
					:duration="2000"
					:before-close="true"
					@close="close"
					@confirm="confirm"
				>
					<label style="font-size: 14px;">
						<checkbox-group style="display: flex; align-items: center" @change="deleteOriFile">
							<checkbox color="#269939" style="transform:scale(0.7); --HOVER-BD-COLOR: #269939;"
							          :checked="deleteOriFileChecked" :value="deleteOriFileChecked"/>
							同时删除源文件
						</checkbox-group>
					</label>
				</uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
export default {
	name: "media-filter",
	emits: ['onUploadMedia', 'onSearch', 'onCancelSelect', 'onDeleteSelect'],
	props: {
		selectMediaItems: {
			type: Array,
			default: () => []
		}
	},
	computed: {
		isSelected() {
			return this.selectMediaItems.length > 0
		},
		selectedCount() {
			return this.selectMediaItems.length
		}
	},
	data() {
		return {
			mediaGroup: '',
			keyword: '',
			lastKeyword: '',
			deleteOriFileChecked: true
		}
	},
	methods: {
		deleteOriFile() {
			this.deleteOriFileChecked = !this.deleteOriFileChecked
		},
		close() {
			this.$refs.popup.close()
			this.deleteOriFileChecked = true
		},
		search() {
			if (this.keyword === this.lastKeyword) return

			this.$emit('onSearch', {
				mediaGroup: this.mediaGroup,
				keyword: this.keyword
			})

			this.lastKeyword = this.keyword
		},
		deleteMedia() {
			this.$refs.popup.open()
		},
		async confirm() {
			if (this.selectedCount > 50) {
				uni.showToast({
					title: '每次最多删除50项媒体资源',
					icon: 'none'
				})
				return
			}

			const uniMediaLibraryCo = uniCloud.importObject('uni-media-library-co', {
				loadingOptions: {
					title: "正在删除",
					mask: true
				}
			})
			const mediaIds = this.selectMediaItems.map(item => item._id)
			await uniMediaLibraryCo.deleteMedia({
				mediaIds,
				deleteOriginalFile: this.deleteOriFileChecked
			})

			this.$emit('onDeleteSelect', mediaIds)
			this.deleteOriFileChecked = true
		}
	}
}
</script>

<style lang="scss">
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
</style>
