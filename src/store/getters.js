//MEIOS PARA TRATAR OS ESTADOS, CASO PRECISE DE ALGUMA MODIFICAÇÃO

import state from './state';

export default {
    get pokemonInfo() {
        return state.list.map(info => ({
            id: info.id,
            name: info.name,
            types: info.types.map(({ type }) => type.name),
            sprite: info.sprites.front_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
        }))
    }
}