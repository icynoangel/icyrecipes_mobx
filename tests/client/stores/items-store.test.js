import itemsStore from './../../../src/client/js/stores/items-store';
import * as superagent from 'superagent';

describe('ItemsStore', function() {
  beforeEach(() => {
    this.itemsResponse = {
      items: [
        {
          image: '/images/boat.jpg',
          title: 'Boat',
          description: 'Lonely boat'
        },
        {
          image: '/images/rain.jpg',
          title: 'Rain',
          description: 'Sunset rain'
        },
        {
          image: '/images/lake.jpg',
          title: 'Lake',
          description: 'Nice lake'
        }
      ]
    };
    itemsStore.items = [];
    itemsStore.error = null;
    itemsStore.text = 'IcyRecipes MobX';
  });

  it('Should have no items', () => {
    expect(itemsStore.nbrItems).toEqual(0);
  });

  it('Should update items', () => {
    itemsStore.handleUpdateItems(this.itemsResponse.items);
    expect(itemsStore.nbrItems).toEqual(3);
    expect(itemsStore.items).toEqual(this.itemsResponse.items);
    expect(itemsStore.text).toEqual(
      `IcyRecipes MobX (${itemsStore.nbrItems} items)`
    );
  });

  it('Should handle error', () => {
    const error = 'test error';
    itemsStore.handleError(error);
    expect(itemsStore.error).toEqual(error);
    expect(itemsStore.text).toEqual('IcyRecipes MobX Error Fetching Items');
  });

  it('Should update items with request response', () => {
    superagent.__setMockResponseBody(this.itemsResponse);
    superagent.__setMockError(undefined);

    itemsStore.getItems().then(() => {
      expect(itemsStore.items).toEqual(this.itemsResponse.items);
    });
  });

  it('Should set error when request fails', () => {
    const error = 'items-error';
    superagent.__setMockError(error);

    itemsStore.getItems().catch(() => {
      expect(itemsStore.items).toEqual([]);
      expect(itemsStore.error).toEqual(error);
    });
  });
});
