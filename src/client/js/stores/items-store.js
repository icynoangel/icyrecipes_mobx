import {observable, computed, action, runInAction} from 'mobx';
import Ajax from './../services/ajax';
import config from './../config/config';

class ItemsStore {
  @observable
  items = [];
  @observable
  text = 'IcyRecipes MobX';
  @observable
  error;

  constructor() {
    this.handleUpdateItems = this.handleUpdateItems.bind(this);
    this.handleError = this.handleError.bind(this);
    this.getItems = this.getItems.bind(this);
  }

  @computed
  get nbrItems() {
    return this.items.length;
  }

  handleUpdateItems(items) {
    this.items = items;
    this.text = `IcyRecipes MobX (${this.nbrItems} items)`;
  }

  handleError(error) {
    this.error = error;
    this.text = 'IcyRecipes MobX Error Fetching Items';
  }

  @action
  async getItems() {
    this.text = 'Loading items';
    let response;

    try {
      response = await Ajax.get(config.items());
      runInAction(() => {
        this.handleUpdateItems(response.items);
      });
      return response;
    } catch (error) {
      runInAction(() => {
        this.handleError(error);
      });
      throw new Error(error);
    }
  }
}

export default new ItemsStore();
