import { calculateWithDetails } from 'specificity';

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
			let result;
			try {
				result = calculateWithDetails(this.selector.replaceAll(/\n/g, " "));
			} catch (e) {
				console.error("Error calculating specificity", e);
			}
			return result;
		},
		selectorParts() {
			const parts = [];
			if (this.result) {
				let previousEnd = 1;
				this.result.contributingParts.forEach(part => {
					// Add whitespace parts
					if (part.start.column > previousEnd) {
						parts.push({
							type: 'whitespace',
							selector: this.selector.substring(previousEnd - 1, part.start.column - 1),
						});
					}
					parts.push({
						type: part.level,
						selector: this.selector.substring(part.start.column - 1, part.end.column - 1)
					});
					previousEnd = part.end.column;
				});
				// Add whitespace to the end if needed
				if (previousEnd < this.selector.length) {
					parts.push({
						type: 'whitespace',
						selector: `${this.selector.substr(previousEnd - 1, this.selector.length - previousEnd)} `,
					});
				}
			}
			return parts;
		},
		specificity() {
			if (this.result) {
				return this.result.total;
			}
			return {
				A: "0",
				B: "0",
				C: "0"
			};
		},
	},
	watch: {
		'specificity': {
			handler: function() {
				this.$emit('change', this.result);
			},
			immediate: true,
		},
	},
};
