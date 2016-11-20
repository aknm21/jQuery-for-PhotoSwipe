/*!
jqPhotoSwipe v0.1 - jQuery for PhotoSwipe
https://ergec.github.io/jQuery-for-PhotoSwipe/
*/
(function (jQuery) {
	jQuery.fn.jqPhotoSwipe = function (options) {
		var _photoswipe = {};
		var defaults = {};
		_photoswipe.galleries = [];
		_photoswipe.galleriesindex = [];
		var $galleryid = 0;
		var pswpHTML = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><button class="pswp__button pswp__button--share" title="Share"></button><button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button><button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div> </div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button><button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>';
		var pswpElement = $(pswpHTML).appendTo("body")[0];
		this.each(function () {
			var $options = $.extend(defaults, options);
			var $this = $(this);
			var $galleryname = $this.data("fancybox-group");
			if (!$galleryname) {
				$galleryname = "singleimage" + (Math.random() * (9999999 - 1) + 1);
				$this.data("fancybox-group", $galleryname);
			}
			if (_photoswipe.galleriesindex.indexOf($galleryname) === -1) {
				$galleryid = _photoswipe.galleriesindex.length;
				_photoswipe.galleriesindex.push($galleryname);
				_photoswipe.galleries[$galleryid] = {};
				_photoswipe.galleries[$galleryid].items = [];
				_photoswipe.galleries[$galleryid].i = 0;
			} else {
				$galleryid = _photoswipe.galleriesindex.indexOf($galleryname);
			}
			var $galleryid2 = $galleryid;
			$this.data("i", _photoswipe.galleries[$galleryid].i);
			_photoswipe.galleries[$galleryid2].items.push({
				src: $this.attr("href"),
				title: $this.attr("title"),
				w: 0,
				h: 0
			});
			$this.off("click").on("click", function (e) {
				var index = $(this).data("i");
				$options.index = index;
				_photoswipe.galleries[$galleryid2].obj = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, _photoswipe.galleries[$galleryid2].items, $options);
				_photoswipe.galleries[$galleryid2].obj.init();
				_photoswipe.galleries[$galleryid2].obj.listen('imageLoadComplete', function(index, item) {
			        if (item.w == 0 && item.h == 0) {
			        	var imgpreload = new Image(); 
			        	imgpreload.onload = function() {
			        		item.w = this.width;
				        	item.h = this.height;
				        	_photoswipe.galleries[$galleryid2].obj.invalidateCurrItems();
				        	_photoswipe.galleries[$galleryid2].obj.updateSize(true);
			        	};
			        	imgpreload.src = item.src;
			        }
				});
				return false;
			});
			_photoswipe.galleries[$galleryid].i ++;
		});
		return _photoswipe;
	};
})(jQuery);
