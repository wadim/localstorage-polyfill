const valuesMap = new Map()

class LocalStorage {
  getItem(key) {
    const stringKey = String(key)
    if (valuesMap.has(key)) {
      return String(valuesMap.get(stringKey))
    }
    return null;
  }

  setItem(key, val) {
    valuesMap.set(String(key), String(val))
  }

  removeItem(key) {
    valuesMap.delete(key)
  }

  clear() {
    valuesMap.clear()
  }

  key(i) {
    i = i || 0;
    var arr = Array.from(valuesMap.keys());
    return arr[i];
  }

  get length() {
    return valuesMap.size;
  }
}
const instance = new LocalStorage()

global.localStorage = new Proxy(instance, {
  set: function(obj, prop, value) {
    if (!LocalStorage.prototype.hasOwnProperty(prop)) {
      instance.setItem(prop, value)
    }
    return true
  },
  get: function(target, name) {
    if (LocalStorage.prototype.hasOwnProperty(name)) {
      return instance[name]
    }
    const stringKey = String(name)
    if (valuesMap.has(name)) {
      return instance.getItem(name)
    }
  }
})