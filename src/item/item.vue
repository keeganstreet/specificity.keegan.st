<template>
	<transition name="scale" appear>
		<div class="item">
			<div class="input-wrap">
				<textarea type="text" class="input" v-model="selector" title="Enter a CSS selector" autocomplete="off" autocorrect="off"></textarea>
				<div class="selector" aria-hidden="true">
					<span v-for="part in selectorParts" :class="`type-${part.type}`">{{ part.selector }}</span>
				</div>
			</div>
			<dl class="specificity" aria-live="polite">
				<span class="type-A">
					<dt>IDs</dt>
					<transition name="pop" mode="out-in">
						<dd :key="specificity.A">{{ specificity.A }}</dd>
					</transition>
				</span>
				<span class="type-B">
					<dt>Classes, attributes and pseudo-classes</dt>
					<transition name="pop" mode="out-in">
						<dd :key="specificity.B">{{ specificity.B }}</dd>
					</transition>
				</span>
				<span class="type-C">
					<dt>Elements and pseudo-elements</dt>
					<transition name="pop" mode="out-in">
						<dd :key="specificity.C">{{ specificity.C }}</dd>
					</transition>
				</span>
			</dl>
			<a href="#" class="duplicate button" v-on:click.prevent="$emit('duplicate', selector)">Duplicate</a>
		</div>
	</transition>
</template>

<script src="./item.js"></script>

<style lang="scss">
	@import "./item.scss";
</style>
