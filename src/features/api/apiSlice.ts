import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonDetails } from '../../types/pokemon';
import { ApiResponse } from '../../types/apiResponse';

export const apiSlice = createApi({
	reducerPath: 'pokemonApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://pokeapi.co/api/v2/'
	}),
	endpoints: builder => ({
		getPokemons: builder.query<ApiResponse<PokemonDetails[]>, void>({
			query: () => `pokemon?limit=1000`,
			transformResponse: (response: ApiResponse<PokemonDetails[]>) => {
				return {
					count: response.count,
					next: response.next,
					previous: response.previous,
					results: response.results.map(({ name, url }) => ({
						name,
						url,
						id: url
							.split('https://pokeapi.co/api/v2/pokemon/')[1]
							.replace('/', '')
					}))
				};
			}
		})
	})
});

export const { useGetPokemonsQuery } = apiSlice;
