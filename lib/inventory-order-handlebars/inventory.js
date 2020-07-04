let inventory;

(function() {
  let counter = 0;

  inventory = {
    collection: [],
    template: null,

    setDate() {
      $('#order_date').text((new Date()).toUTCString());
    },

    setTemplate() {
      this.template = Handlebars.compile($('#inventory_item').remove().html());
    },

    addItemClick(event) {
      event.preventDefault();
      $('#inventory').append(this.template({ ID: counter }));
      this.collection.push({
        id: counter,
        name: '',
        stockNumber: '',
        quantity: 1,
      });
      counter += 1;
    },

    itemFromId(itemId) {
      return this.collection.find((obj) => obj.id === itemId);
    },

    updateItemInfo(itemId, inputName, newVal) {
      let thisItem = this.itemFromId(itemId);

      if (inputName.includes('item_name')) {
        thisItem.name = newVal;
      } else if (inputName.includes('item_stock')) {
        thisItem.stockNumber = newVal;
      } else if (inputName.includes('item_quantity')) {
        thisItem.quantity = parseInt(newVal, 10);
      }
    },

    getIdFromTarget($eventTarget) {
      return Number($eventTarget
        .closest('tr')
        .find('input[type="hidden"]')
        .val());
    },

    itemDataChanged(event) {
      event.preventDefault();
      let inputName = event.target.name;
      let $input = $(`input[name="${inputName}"]`);
      let id = this.getIdFromTarget($(event.target));

      let newVal = $input.val();

      this.updateItemInfo(id, inputName, newVal);
    },

    deleteItem(event) {
      event.preventDefault();
      let $target = $(event.target);
      let id = this.getIdFromTarget($target);
      let itemIdx = this.collection.findIndex((item) => item.id === id);
      this.collection.splice(itemIdx, 1);
      $target.closest('tr').remove();
    },

    bindEvents() {
      $('#add_item').on('click', this.addItemClick.bind(this));
      $('#inventory').on(
        'blur',
        'input[type="text"], input[type="number"]',
        this.itemDataChanged.bind(this)
      );
      $('#inventory').on('click', 'a.delete', this.deleteItem.bind(this));
    },

    init() {
      this.setDate();
      this.setTemplate();
      this.bindEvents();
    }
  };
})();

$(inventory.init.bind(inventory));