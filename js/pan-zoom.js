(function($) {
    // Plugin definition.
    $.fn.panzoom = function(options) {

        // Extend our default options with those provided.
        // Note that the first argument to extend is an empty
        // object – this is to keep from overriding our "defaults" object.
        var opts = $.extend({}, $.fn.panzoom.defaults, options);

        // Our plugin implementation code goes here.

        this.each(function() {
            var that = this;

            this.$draggable = $('.draggable');
            this.$window = $(window);
            this.$document = $(document);

            this.$window.on('scroll', function(e) {
                $.fn.panzoom.updatePanZoom.apply(that);
            }).on('resize', function(e) {
                $.fn.panzoom.updatePanZoomImage.apply(that);
            });

            this.$draggable.on('drag', function(e, ui) {
                $.fn.panzoom.onDrag.apply(that, arguments)
            });
            $.fn.panzoom.init.apply(this);
        });

    };

    // Plugin defaults – added as a property on our plugin function.
    $.fn.panzoom.defaults = {
        outline: "red",
        background: "grey"
    };

    $.fn.panzoom.init = function() {
        var selector = this.selector;
        this.$draggable.draggable({
            containment: selector,
            scroll: false
        });
        $.fn.panzoom.updatePanZoomImage.apply(this);
    };

    $.fn.panzoom.onDrag = function(e, ui) {
        var $this = $(this);
        this.$window.scrollTop(ui.position.top * this.$document.height() / $this.height())
            .scrollLeft(ui.position.left * this.$document.width() / $this.width());
    };

    $.fn.panzoom.updatePanZoomImage = function() {
        var that = this;
        html2canvas(document.body, {
            onrendered: function(canvas) {
                var dataUrl = canvas.toDataURL();
                //$('#pan-zoom').append($img).css({width: width, height, height}).show();
                $(that).css({
                    'background-image': 'url("' + dataUrl + '")'
                }).show();
                $.fn.panzoom.updatePanZoom.apply(that);
            }
        });
    };

    $.fn.panzoom.updatePanZoom = function() {
        var $this = $(this);
        this.$draggable.css({
            height: this.$window.height() / this.$document.height() * $this.height(),
            width: this.$window.height() / this.$document.height() * $this.width(),
            top: this.$window.scrollTop() / this.$document.height() * $this.height(),
            left: this.$window.scrollLeft() / this.$document.width() * $this.width()
        });
    };

})($);
