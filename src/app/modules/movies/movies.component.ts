import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from 'src/app/models/movie.model';
import {MainService} from '../../core/services/main.service';
import {select, Store} from '@ngrx/store';
import {filter, take} from 'rxjs/operators';
import {setSettings, setData} from './store';
import {tableSettingsSelector, tableDataSelector} from './store/selectors';
import {MoviesTableData, Settings} from './store/reducers/table.reducers';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements OnInit, OnDestroy {
  private gridApi: any;
  private gridColumnApi: any;

  perPageLimit = 10;
  savedTableSettings: Settings = {limit: this.perPageLimit, page: 0, filter: '', columns: []};
  detailModalVisible = false;
  movies: Movie[] = [];
  selectedMovie: Movie | undefined;
  moviesColumns = [
    {field: 'title', sortable: true, filter: true},
    {field: 'episodeID', width: 120},
    {field: 'openingCrawl', resizable: true, width: 850},
    {field: 'director', sortable: true, filter: true},
    {field: 'producers', sortable: true, filter: true},
    {field: 'releaseDate', sortable: true, filter: true, width: 'auto'},
  ];

  constructor(private mainService: MainService, private cd: ChangeDetectorRef, private store: Store) {
  }

  ngOnInit(): void {
    this.store
      .pipe(
        select(tableDataSelector),
        take(1)
      )
      .subscribe((tableData: MoviesTableData) => {
        if (!tableData.movies) {
          this.getMovies();
        } else {
          this.movies = tableData.movies;
        }
      });

    this.store
      .pipe(
        select(tableSettingsSelector),
        filter(val => val !== undefined),
        take(1)
      )
      .subscribe((tableSettings) => {
        if (tableSettings?.movies) {
          this.savedTableSettings = tableSettings?.movies;
        }
      });
  }

  ngOnDestroy(): void {
    const tableSettings =
      {
        tableSettings: {
          movies: {
            limit: this.perPageLimit,
            page: this?.gridApi?.paginationGetCurrentPage(),
            filter: this?.gridApi?.getFilterModel(),
            columns: this?.gridColumnApi?.getColumnState(),
          }
        }
      };
    this.store.dispatch(setSettings(tableSettings));
  }

  getMovies(): void {
    this.mainService.getMovies().subscribe((data) => {
      this.movies = data?.data?.allFilms.films;
      const moviesTableData = {
        tableData: {
          movies: this.movies
        }
      };
      this.store.dispatch(setData(moviesTableData));
    });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.perPageLimit = this.savedTableSettings.limit;
    this.gridApi.paginationSetPageSize(this.perPageLimit);
    this.gridApi.paginationGoToPage(this.savedTableSettings.page);
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

  changePerPageLimit(event: any): void {
    this.perPageLimit = event.target.valueAsNumber;
    this.gridApi.paginationSetPageSize(this.perPageLimit);
  }
}
