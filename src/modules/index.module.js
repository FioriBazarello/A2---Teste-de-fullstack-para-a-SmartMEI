import { GraphQLModule } from '@graphql-modules/core';

import CEPModule from './cep/index.module';

const MainModule = new GraphQLModule({
  imports: [
    CEPModule,
  ],
});

export default MainModule;