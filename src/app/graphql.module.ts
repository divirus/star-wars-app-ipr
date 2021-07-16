// apollo-angular.com/docs/migration/

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';

@NgModule({
  exports: [HttpClientModule],
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
  ) {
    const http = httpLink.create({ uri: 'http://localhost:49199' });
    const cache = new InMemoryCache({ addTypename: false });

    apollo.create({
      link: ApolloLink.from([http]),
      cache,
    });
  }
}
