class Tooltip {
    constructor($element) {
        this.$el = $element;
        this.$tooltip = this.$el.find('.tooltip');

        this.timer = null;

        this.bind();
    }

    bind() {
        this.$el.hover(
            () => {
                this.timer = setTimeout(() => {
                    this.show();
                }, 700);
            },

            () => {
                clearTimeout(this.timer);
                this.hide();
            }
        );

        this.$el.on('mousemove', event => {
            this.position(event.clientX, event.clientY);
        });
    }

    show() {
        this.$tooltip.stop().fadeIn(200);
    }

    hide() {
        this.$tooltip.stop().fadeOut(200);
    }

    position(clientX, clientY) {
        let offset = this.$el.offset();
        let x = offset.left;
        let y = offset.top;

        this.$tooltip.css({
            'top': clientY - y + 10,
            'left': clientX - x + 10
        });
    }
}

export default Tooltip;