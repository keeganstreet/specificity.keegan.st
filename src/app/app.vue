<template>
	<div id="app">
		<div class="menu">
			<a href="#" class="sort button" v-on:click.prevent="sort">Sort by specificity</a>
		</div>
		<div class="items">
			<transition-group name="items">
				<item
					v-for="(item, index) in items"
					:key="item.id"
					:initial-selector="item.initialSelector"
					v-on:duplicate="duplicate($event, index)"
					v-on:change="change($event, index)"
				></item>
			</transition-group>
		</div>
	</div>
</template>

<script src="./app.js"></script>
