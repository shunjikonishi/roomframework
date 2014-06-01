if (typeof(room) === "undefined") room = {};

$(function() {
	function isMobile() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}
	function isIOS() {
		return /iPhone|iPad|iPod/i.test(navigator.userAgent);
	}
	room.utils = {
		"isMobile" : isMobile,
		"isIOS" : isIOS
	};
});