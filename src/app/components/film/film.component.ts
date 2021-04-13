import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import {MainService} from '../../core/services/main.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  detailModalVisible = false;
  movies: Film[] = [];
  selectedMovie: Film | undefined;
  moviesColumns = [
    { field: 'title', sortable: true, filter: true },
    { field: 'episodeID', width: 120 },
    { field: 'openingCrawl', resizable: true, width: 850 },
    { field: 'director', sortable: true, filter: true },
    { field: 'producers', sortable: true, filter: true },
    { field: 'releaseDate', sortable: true, filter: true, width: 'auto' },
  ];

  constructor(private mainService: MainService) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.mainService.getMovies().subscribe((data) => {
      this.movies = data?.data?.allFilms.films;
    });
  }

  onSelectionChanged(row: any): void {
    this.selectedMovie = row.data;
    this.openModal();
  }

  openModal(): void {
    this.detailModalVisible = true;
  }

  closeModal(): void {
    this.detailModalVisible = false;
  }
}
