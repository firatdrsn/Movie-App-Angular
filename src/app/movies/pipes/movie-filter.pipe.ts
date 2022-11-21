import { Movie } from '../models/movie';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  transform(movies: Movie[], searchText: string): Movie[] {
    searchText = searchText.toLocaleLowerCase();
    let filteredMovies = movies.filter((movie: Movie) => {
      return movie.title.toLocaleLowerCase().includes(searchText) ||
        movie.description.toLocaleLowerCase().includes(searchText)
    })
    return filteredMovies;
  }

}
