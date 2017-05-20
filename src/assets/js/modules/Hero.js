let $ = window.jQuery;

class Hero {
    constructor($element) {
        this.$el = $element;

        this.heroId = this.$el.data('hero');
        this.selected = this.$el.hasClass('selected');

        this.bind();
    }

    bind() {
        this.$el.click(() => {
            this.select();
        });
    }

    select() {
        // Remove trailing slash, if present
        let baseUrl = window.location.href;
        if (baseUrl.match(/.+\/$/)) {
            baseUrl = baseUrl.replace(/(.+)\/$/, '$1');
        }

        $.ajax({
            url: baseUrl + '/hero/select/' + this.heroId
        })
            .then(response => {
               if (true === response.selected) {
                   this.$el.addClass('selected');
                   this.selected = true;
               } else {
                   this.$el.removeClass('selected');
                   this.selected = false;
               }
            });
    }

    pick() {
        this.$el.addClass('chosen');
    }

    unpick() {
        this.$el.removeClass('chosen');
    }
}

export default Hero;