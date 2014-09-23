if (typeof(room) === "undefined") room = {};

$(function() {
	if (!room.Cache) {
		return;
	}
	room.TemplateManager = function(cache, loadFunc) {
		function load($el, name, callback) {
			function doLoad(html) {
				$el.html(html);
				if (callback) {
					callback(html);
				}
			}
			var html = cache.get("template." + name);
			if (html) {
				doLoad(html);
				return;
			}
			loadFunc(function(data) {
				cache.put("template." + name, data);
				doLoad(data);
			});
		}
		$.extend(this, {
			"load" : load
		});
	};
});
