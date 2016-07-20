			$(document).ready(function() {
				$("#container").animate({
					opacity: 1
				}, 1500);
				$("ul>li").hover(function() {
					$(this).animate({
						opacity: 0
					}, 100, function() {
						$(this).animate({
							opacity: 1,
							height: 30,
						}, 100);
					});
				}, function() {
					$(this).animate({
						opacity: 0
					}, 100, function() {
						$(this).animate({
							opacity: 1,
							height: 20
						}, 50, function() {
							$(this).animate({
								height: 15
							}, 50, function() {
								$(this).animate({
									height: 20
								}, 50, function() {
									$(this).animate({
										height: 15
									}, 50, function() {
										$(this).animate({
											height: 20
										}, 100);
									});
								});
							});
						});
					});
				});
				
			});