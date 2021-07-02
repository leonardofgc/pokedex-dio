//MEIOS PARA TRATAR OS ESTADOS, CASO PRECISE DE ALGUMA MODIFICAÇÃO

import { parsePokemonInfo } from '@/utils';
import state from './state';

export default {
    get pokemonInfo() {
        return state.list.map(parsePokemonInfo)
    }
}