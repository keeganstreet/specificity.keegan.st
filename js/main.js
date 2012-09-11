$(document).ready(function() {

	var $textarea = $('#selectors'),
		$items = $('#items'),
		$baseItem = $items.find('.item:eq(0)').clone(),
		$sort = $('.sort'),
		update,
		createItem;

	createItem = function(selector, $prev) {
		var $item = $baseItem.clone(),
			$input = $item.find('> .input').val(selector),
			$selector = $item.find('> .selector'),
			$specificityZ = $item.find('> .specificity > .type-z'),
			$specificityA = $item.find('> .specificity > .type-a'),
			$specificityB = $item.find('> .specificity > .type-b'),
			$specificityC = $item.find('> .specificity > .type-c'),
			$duplicate = $item.find('> .duplicate'),
			update;

		update = function(e) {
			var input = $input.val(),
				result = SPECIFICITY.calculate(input),
				specificity,
				highlightedSelector,
				i, len, part, text1, text2, text3;

			if (result.length === 0) {
				$selector.text(' ');
				$specificityZ.text('0');
				$specificityA.text('0');
				$specificityB.text('0');
				$specificityC.text('0');
				$input.height($selector.height());
				return;
			}

			result = result[0];
			specificity = result.specificity.split(',');
			$specificityZ.text(specificity[0]);
			$specificityA.text(specificity[1]);
			$specificityB.text(specificity[2]);
			$specificityC.text(specificity[3]);

			highlightedSelector = result.selector;
			for (i = result.parts.length - 1; i >= 0; i -= 1) {
				part = result.parts[i];
				text1 = highlightedSelector.substring(0, part.index);
				text2 = highlightedSelector.substring(part.index, part.index + part.length);
				text3 = highlightedSelector.substring(part.index + part.length);
				highlightedSelector = text1 + '<span class="type-' + part.type + '">' + text2 + '</span>' + text3;
			}
			$selector.html(highlightedSelector);
			if ($selector.height() > 0) {
				$input.height($selector.height());
			}
		};

		$duplicate.click(function(e) {
			e.preventDefault();
			createItem($input.val(), $item);
		});

		$input.keyup(update);
		update();
		if ($prev) {
			$prev.after($item);
		} else {
			$items.append($item);
		}
		setTimeout(function() {
			$item.removeClass('is-small');
		}, 100);
	};

	$items.empty();
	createItem('li:first-child h2 .title');
	createItem('#nav .selected > a:hover');

	$sort.click(function(e) {
		e.preventDefault();

		var $children = $items.children(),
			children = $children.get(),
			yPos = 0;

		$items.height($items.height());
		$children.each(function(index, el) {
			var $this = $(this);
			$this.removeClass('transition-all').css({
				'position': 'absolute',
				'top': yPos + 'px',
				'left': '0'
			});
			yPos += $this.outerHeight(true);
		});

		children.sort(function(sel1, sel2) {
			var spec1 = [],
				spec2 = [],
				i;

			spec1[0] = parseInt($('.specificity .type-z', sel1).text(), 10),
			spec1[1] = parseInt($('.specificity .type-a', sel1).text(), 10),
			spec1[2] = parseInt($('.specificity .type-b', sel1).text(), 10),
			spec1[3] = parseInt($('.specificity .type-c', sel1).text(), 10),
			spec2[0] = parseInt($('.specificity .type-z', sel2).text(), 10),
			spec2[1] = parseInt($('.specificity .type-a', sel2).text(), 10),
			spec2[2] = parseInt($('.specificity .type-b', sel2).text(), 10),
			spec2[3] = parseInt($('.specificity .type-c', sel2).text(), 10);

			for (i = 0; i < 4; i += 1) {
				if (spec1[i] > spec2[i]) {
					return -1;
				} else if (spec2[i] > spec1[i]) {
					return 1;
				}
			}

			return 0;
		});

		setTimeout(function() {
			var yPos = 0;

			$.each(children, function(index, el) {
				var $el = $(el);
				$el.addClass('transition-all').css({
					'top': yPos + 'px'
				});
				yPos += $el.outerHeight(true);
			});

			setTimeout(function() {
				$.each(children, function(index, el) {
					$(el).removeClass('transition-all').css({
						'position': 'relative',
						'top': '0',
						'left': '0'
					});
					$items.append(el);
					$items.height('auto');
				});
			}, 500);
		}, 50);
	})

});
