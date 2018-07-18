import { calculate } from 'specificity';

export default {
	props: {
		initialSelector: String,
	},
	data() {
		return {
			selector: this.initialSelector,
		};
	},
	computed: {
		result() {
			const result = calculate(this.selector);
			if (result.length === 1) {
				return result[0];
			}
		},
		selectorParts() {
			const parts = [];
			if (this.result) {
				let previousEnd = 0;
				this.result.parts.forEach(part => {
					// Add whitespace parts
					if (part.index > previousEnd) {
						parts.push({
							type: 'whitespace',
							selector: this.selector.substr(previousEnd, part.index - previousEnd),
						});
					}
					parts.push(part);
					previousEnd = part.index + part.length;
				});
				// Add whitespace to the end if needed
				if (previousEnd < this.selector.length) {
					parts.push({
						type: 'whitespace',
						selector: `${this.selector.substr(previousEnd, this.selector.length - previousEnd)} `,
					});
				}
			}
			return parts;
		},
		specificity() {
			if (this.result) {
				return this.result.specificity;
			}
			return '';
		},
		specificityArray() {
			if (this.result) {
				return this.result.specificityArray;
			}
			return [0, 0, 0, 0];
		},
	},
	watch: {
		'result.specificity': {
			handler: function() {
				this.$emit('change', this.result);
			},
			immediate: true,
		},
	},
};
