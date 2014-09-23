if (typeof(room) === "undefined") room = {};

$(function() {
	if (!room.Cache) {
		return;
	}
	room.TemplateManager = function(cache, loadFunc) {
		function load($el, name, callback) {
			function doLoad(html) {
				$el.html(html).show();
				if (callback) {
					callback(html);
				}
			}
			var html = cache.get("template." + name);
			if (html) {
				doLoad(html);
				return;
			}
			loadFunc(name, function(data) {
				save(name, data);
				doLoad(data);
			});
		}
		function save(name, html) {
			cache.put("template." + name, html);
		}
		$.extend(this, {
			"load" : load,
			"save" : save
		});
	};
});
