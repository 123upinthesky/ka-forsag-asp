const metrics = [
  { label: 'Автомобили в продаже', from: '18 420', to: '19 860', delta: '+1 440, +7,8%', tone: 'dark' },
  { label: 'Средняя цена', from: '2,31 млн', to: '2,47 млн', delta: '+160 тыс., +6,9%', tone: 'light' },
  { label: 'Средний пробег', from: '84 000', to: '79 500', delta: '-4 500 км, -5,4%', tone: 'light' },
  { label: 'Расчетный объем', from: '42,5 млрд', to: '49,0 млрд', delta: '+6,5 млрд, +15,3%', tone: 'red' },
];

const segments = [
  { name: 'До 3 лет', old: 4200, current: 5100 },
  { name: '3–5 лет', old: 6100, current: 6400 },
  { name: '5–7 лет', old: 4800, current: 4550 },
  { name: '7+ лет', old: 3320, current: 3810 },
];

const drivers = [
  { title: 'Прирост', tone: 'green', items: ['Кроссоверы: +18%', 'Пробег до 60 тыс.: +14%', 'Цена 2–3 млн: +11%'] },
  { title: 'Просадки', tone: 'red', items: ['Седаны 7+ лет: -9%', 'Пробег 150 тыс.+: -7%', 'Цена до 1 млн: -4%'] },
];

const icon = {
  car: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17h14M7 17v2m10-2v2M4 13l2-5h12l2 5M6 13h12M7 13a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/></svg>',
  trend: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 17 6-6 4 4 8-8M15 7h6v6"/></svg>',
  gauge: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14a8 8 0 1 1 16 0M12 14l4-4M7 18h10"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v12H4zM4 10h16M16 15h2"/></svg>',
};

function metricCard(metric) {
  return `<article class="metric metric--${metric.tone}">
    <div class="metric__mark"></div>
    <p>${metric.label}</p>
    <strong>${metric.from} → ${metric.to}</strong>
    <span>${metric.delta}</span>
  </article>`;
}

function segmentRow(item) {
  const max = Math.max(...segments.flatMap((segment) => [segment.old, segment.current]));
  return `<div class="segment-row">
    <b>${item.name}</b>
    <div class="segment-bars">
      <span>Было</span>
      <div class="bar"><i style="width: ${(item.old / max) * 100}%"></i></div>
      <em>${item.old.toLocaleString('ru-RU')}</em>
      <span>Стало</span>
      <div class="bar bar--red"><i style="width: ${(item.current / max) * 100}%"></i></div>
      <em>${item.current.toLocaleString('ru-RU')}</em>
    </div>
  </div>`;
}

function driverCard(driver) {
  return `<div class="driver driver--${driver.tone}">
    <h4>${driver.title}</h4>
    ${driver.items.map((item) => `<p>${item}</p>`).join('')}
  </div>`;
}

document.querySelector('#app').innerHTML = `<main class="dashboard">
  <div class="top-strip"></div>
  <aside class="side-label">AUTO DASHBOARD · RU · 2026</aside>

  <section class="hero">
    <div>
      <div class="eyebrow"><span>ПРОБЕГ</span><i></i></div>
      <h1>Дашборд автомобилей с пробегом</h1>
      <p>Шаблон аналитики в стиле Auto.ru для сравнения периодов, оценки стоимости, пробега и структуры предложения.</p>
    </div>
    <div class="brand-badge">${icon.car}</div>
  </section>

  <section class="headline-card">
    <div class="headline-icon">${icon.trend}</div>
    <h2>Рост расчетного объема поддержан дорогими и более свежими автомобилями</h2>
    <p>Плейсхолдеры ниже заменяются на ваши данные: периоды, сегменты, марки, регионы и динамика по пробегу.</p>
  </section>

  <section class="metrics-grid">${metrics.map(metricCard).join('')}</section>

  <section class="content-grid">
    <article class="panel panel--light">
      <div class="panel-heading">${icon.gauge}<div><h3>Сравнение возрастных сегментов</h3><p>Прошлый период показан серым, текущий — красным.</p></div></div>
      ${segments.map(segmentRow).join('')}
    </article>

    <article class="panel panel--dark">
      <div class="panel-heading">${icon.wallet}<div><h3>Драйверы изменения рынка</h3><p>Блок под ключевые выводы по вашим данным.</p></div></div>
      <div class="drivers">${drivers.map(driverCard).join('')}</div>
      <b class="conclusion">Вывод: рынок смещается в сторону более дорогих предложений с меньшим пробегом.</b>
    </article>
  </section>

  <footer>Источник: ожидаются данные пользователя. Расчетный объем = количество объявлений × средняя стоимость.</footer>
</main>`;
