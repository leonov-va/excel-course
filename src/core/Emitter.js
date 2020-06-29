export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // dispatch, fire, trigger => возможные названия.
  // Уведомляем слушателей если они есть
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    });
    return true;
  }
 
  // on, listen
  // Подписываемся на уведомление
  // Добавляем нового слушателя
  // formula.subscribge('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn);
    }
  }
}

// const emitter = new Emitter();
// emitter('leonov', data => console.log('sub: ', data));
// emitter.emit('leonov', 42);