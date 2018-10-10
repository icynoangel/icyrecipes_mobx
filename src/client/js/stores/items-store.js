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

  @computed
  get nbrItems() {
    return this.items.length;
  }

  @action.bound
  getItems() {
    this.text = 'Loading items';
    Ajax.get(config.items())
      .then(response => {
        runInAction(() => {
          this.items = response.items;
          this.text = `IcyRecipes MobX (${this.nbrItems} items)`;
        });
      })
      .catch(error => {
        runInAction(() => {
          this.error = error;
          this.text = 'IcyRecipes MobX';
        });
      });
  }
}

export default new ItemsStore();
