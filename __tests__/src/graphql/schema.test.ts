import { Schema } from '../../../src/graphql/Schema';

describe('Schema', () => {
  let instance: Schema;

  it('should have method `quote` which returns GraphQLSchema', () => {
    instance = new Schema();

    expect(instance.quote()).toBeDefined();
  });
});
