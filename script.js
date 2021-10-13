Как написать этот скрипт? 

Сервер с информацией о товарах вернул ответ в виде json: 

{
    "displayedName": {
        "displayedName": {
            "value": [
                "Профиль маячковый ПВХ 10 мм L3м"
            ],
            "description": "Полное наименование товара для клиента"
            }
        },
    "stock": {
        "stocks": {
                "34": {
                "2": "35",
                "3": "42",
                "4": "58",
                "5": "57",
                "6": "112",
                "20": "51",
                "22": "78",
                "26": "34",
                "32": "22",
                "35": "358",
                "40": "28",
                "43": "68",
                "45": "58",
                "49": "31",
                "51": "29",
                "56": "42",
                "62": "26",
                "64": "0",
                "65": "57",
                "86": "15",
                "114": "41",
                "117": "46",
                "143": "46",
                "162": "4",
                "171": "0",
                "176": "12"
            }
        }
    }
}

stocks - остатки товара в регионе,
34 - номер региона,
2, 3, 4, ... 176 - номера магазинов региона,
"2": "35" означает, что в магазине 2 товар в наличии в количестве 356 штук
Необходимо написать на JavaScript три метода:

получить название товара
получить массив номеров магазинов, в которых есть товары в наличии
найти максимальное количество товара в регионе, вернуть это количество и номер магазина
Операции чтения и записи из файла можно опустить - объект можно сразу положить в переменную.





const data = {
    "displayedName": {
        "displayedName": {
            "value": [
                "Профиль маячковый ПВХ 10 мм L3м"
            ],
            "description": "Полное наименование товара для клиента"
            }
        },
    "stock": {
        "stocks": {
                "34": {
                "2": "35",
                "3": "42",
                "4": "58",
                "5": "57",
                "6": "112",
                "20": "51",
                "22": "78",
                "26": "34",
                "32": "22",
                "35": "358",
                "40": "28",
                "43": "68",
                "45": "58",
                "49": "31",
                "51": "29",
                "56": "42",
                "62": "26",
                "64": "0",
                "65": "57",
                "86": "15",
                "114": "41",
                "117": "46",
                "143": "46",
                "162": "4",
                "171": "0",
                "176": "12"
            }
        }
    }
};

const db_manager = {
  get_item_name(data){
    return data.displayedName.displayedName.value[0];
  },
  get_stores_with_item(data){
    const stocks = data.stock.stocks;
    const regions = Object.keys(stocks);
    const stores_with_item = {};
    regions.forEach((region)=>{
      const region_stocks = stocks[region];
      for(let key in region_stocks){
        if(region_stocks[key] !== "0") {
          if(typeof stores_with_item[region] === "undefined"){
            stores_with_item[region] = [];
          }
          stores_with_item[region].push(key);
        }
      }
    });
    return stores_with_item;
  },
  get_max_amount_in_region(data){
    const stocks = data.stock.stocks;
    const regions = Object.keys(stocks);
    const max_amount = {};
    regions.forEach((region)=>{
      const region_stocks = stocks[region];
      let max = 0;
      let store_id = null;
      for(let key in region_stocks){
        const current_amount = Number(region_stocks[key]);
        if(current_amount > max) {
          max = current_amount;
          store_id = key;
        }
      }
      max_amount[region] = {
        store_id,
        amount: max
      };
    });
    return max_amount;
  }
};

console.log(db_manager.get_item_name(data));
console.log(db_manager.get_stores_with_item(data));
console.log(db_manager.get_max_amount_in_region(data));

