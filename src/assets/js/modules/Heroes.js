import Hero from './Hero'
import MersenneTwister from 'mersennetwister'

let $ = window.jQuery;

class Heroes {
    constructor($collection) {
        this.heroes = [];
        $collection.each((i, element) => {
            this.heroes.push(new Hero($(element)));
        });

        this.twister = new MersenneTwister();
        this.chosen = null;
    }

    choose() {
        // Get only heroes that are selected
        let selectedHeroes = this.heroes.filter(hero => {
            return true === hero.selected;
        });

        // Possibly nothing is selected
        if (!selectedHeroes.length) {
            return;
        }

        // Unpick previously chosen hero
        if (this.chosen) {
            this.chosen.unpick();
        }

        // Pick a random hero
        this.chosen = selectedHeroes[Math.floor(this.twister.rndHiRes() * selectedHeroes.length)];
        this.chosen.pick();
    }
}

export default Heroes;