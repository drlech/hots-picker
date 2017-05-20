import Tooltip from './modules/Tooltip'
import Heroes from './modules/Heroes'

let $ = window.jQuery;

$(document).ready(function() {
    $('.small-circle, .large-circle').each(function() {
        new Tooltip($(this));
    });

    let heroes = new Heroes($('[data-hero]'));
    let $button = $('#choose');

    $button.click(() => {
        heroes.choose();
    });
});