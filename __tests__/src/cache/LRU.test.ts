import { LRU } from '../../../src/cache/LRU';

describe('LRU', () => {
  let instance: LRU;
  const value = {
    exchange_rate: 1,
    quote_amount: 100
  };

  beforeEach(() => {
    instance = new LRU(
      {
        capacity: process.env.CAPACITY
      }
    );
  });

  it('should have methods `put` and `get`', () => {
    expect(instance.get).toBeDefined();
    expect(instance.put).toBeDefined();
  });

  it('should match LRU object', () => {
    const copy = Object.assign(instance);

    expect(copy).toMatchObject(
      {
        capacity: process.env.CAPACITY,
        head: null,
        tail: null,
        cache: {},
        size: 0
      }
    );
  });

  it('should return correct values from cache', () => {
    // cache is empty and does not hold any values
    expect(instance.get('key_1')).toBe(false);
    expect(instance.get('key_2')).toBe(false);

    // put first element
    instance.put('key_1', value);
    expect(instance.get('key_1')).toMatchObject(value);

    // put second element
    instance.put('key_2', value);
    expect(instance.get('key_2')).toMatchObject(value);

    // put third element
    instance.put('key_3', value);
    expect(instance.get('key_3')).toMatchObject(value);

    // replace old node
    instance.put('key_3', value);
    expect(instance.get('key_3')).toMatchObject(value);

    const copy = Object.assign(instance);

    expect(copy.head.key).toBe('key_3');
    expect(copy.tail.key).toBe('key_2');
  });
});
