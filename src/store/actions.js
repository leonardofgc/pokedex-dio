//CHAMADAS API
import PokeAPI from '@/services/pokeapi';

import state from './state';
import mutations from './mutations';

export default {
    async getPokemonByName(name) {

        const { setIsPokemonSearched } = mutations;
        const pokemon = await PokeAPI.getPokemonByName(name);
        if (pokemon) {
            setIsPokemonSearched(pokemon);
        }
    },
    async getPokemons() {
        const {
            setList,
            setIsPokemonSearch,
            setListHasError,
            setListHasNext,
            setListHasCompleted,
            updateOffset,
        } = mutations;

        try {
            setIsPokemonSearch(false);
            setListHasError(false);

            const pokemonsList = await PokeAPI.getPokemons({ limit: state.limit, offset: state.offset });

            if (pokemonsList?.results?.length) {
                const prepareInfo = pokemonsList.results.map(item => PokeAPI.getPokemonByName(item.name));
                const pokemonsInfo = await Promise.all(prepareInfo);
                setList(pokemonsInfo);
            }
            //Next is orginal the PokeApi
            if (pokemonsList?.next) {
                setListHasNext(true);
                updateOffset();
            } else {
                setListHasNext(false);
                setListHasCompleted(true);
            }

        } catch (error) {
            setListHasError(true);
        }
    },

    async searchPokemon(name) {
        const {
            setIsPokemonSearch,
            setIsSearching,
            setIsPokemonSearched,
            setSearchHasError,
            resetList,
        } = mutations;


        if (!name) {
            resetList();
            return;
        }

        try {
            setSearchHasError(false);
            setIsSearching(true);
            setIsPokemonSearch(true);

            const pokemon = state.tmpList.find(info => info.name.toLowerCase() === name.toLowerCase());

            if (pokemon) {
                setIsPokemonSearched(pokemon);
                return;
            }

            await this.getPokemonByName(name);

        } catch (error) {
            setSearchHasError(true);
        } finally {
            setIsSearching(false);
        }

    }

}