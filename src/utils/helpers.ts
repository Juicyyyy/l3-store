export const genUUID = () => {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

export const addElement = (parent: HTMLElement, tag: string, options?: object) => {
  const element = document.createElement(tag) as HTMLElement;

  if (options) Object.assign(element, options);

  parent.appendChild(element);

  return element;
};

export const formatPrice = (price: number) => {
  return (
    Math.round(price / 1000)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽'
  );
};

interface EventPayload {
  [key: string]: any;
}

interface Event {
  type: string;
  payload: EventPayload;
  timestamp: number;
}

export const sendEvent = (type: string, payload: EventPayload) => {
  const event: Event = {
    type,
    payload,
    timestamp: Date.now(),
  };
  
  // Отправка события на сервер
  fetch('/api/sendEvent', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify(event)
  })
  .then(response => {
    if (response.ok) {
    console.log('Событие успешно отправлено');
    console.log(event);
  } else {
    console.error('Ошибка отправки события');
  }
  })
  .catch(error => {
    console.error('Ошибка отправки события', error);
  });
}
  
