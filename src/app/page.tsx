import Image, { getImageProps } from "next/image";
import { ModelCard } from "@/components/ModelCard";
import { Arrow, LeadButton } from "@/components/LeadForm";
import { company, isVisible } from "@/data/company";
import { asset } from "@/lib/asset";
import { editorialImages, featuredModelIds, getModel, type FurnitureModel } from "@/data/models";

const featured = featuredModelIds
  .map((id) => getModel(id))
  .filter((m): m is FurnitureModel => Boolean(m));
const sofas = featured.filter((m) => m.category === "sofa");
const armchairs = featured.filter((m) => m.category === "armchair");

export default function HomePage() {
  return (
    <>
      <Hero />
      <Collection />
      <Consultation />
      <Production />
      <Designers />
    </>
  );
}

function Hero() {
  const { hero } = editorialImages;
  const common = { alt: hero.alt, sizes: "(min-width: 1440px) 1344px, 100vw", priority: true };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, ...hero.desktop, src: asset(hero.desktop.src) });
  const {
    props: { srcSet: mobile },
  } = getImageProps({ ...common, ...hero.mobile, src: asset(hero.mobile.src) });
  const { props: img } = getImageProps({ ...common, ...hero.desktop, src: asset(hero.desktop.src) });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__head">
          <div className="hero__text">
            <p className="eyebrow">Мебельная фабрика · Дагестан</p>
            <h1 id="hero-title" className="hero__title">
              Диваны и&nbsp;кресла Scanddy
            </h1>
            <p className="hero__lead">Подберём модель и&nbsp;комплектацию под ваш интерьер</p>
          </div>
          <div className="hero__action">
            <a className="btn" href="#collection">
              Смотреть коллекцию
            </a>
          </div>
        </div>

        <figure className="hero__figure">
          <picture>
            <source media="(max-width: 767px)" srcSet={mobile} sizes="100vw" />
            <source media="(min-width: 768px)" srcSet={desktop} sizes={common.sizes} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...img} alt={hero.alt} className="hero__img" />
          </picture>
          <figcaption className="caption">
            <span className="caption__name">Brandon</span>
            <span className="caption__meta">Модульный диван с оттоманкой</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Collection() {
  const { sofas: sofaImg, armchairs: chairImg } = editorialImages;
  return (
    <section id="collection" className="section collection" aria-labelledby="collection-title">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">Коллекция</p>
          <h2 id="collection-title" className="section__title">
            Мягкая мебель для дома
          </h2>
        </div>

        <div className="categories">
          <a className="category category--wide" href="#sofas">
            <div className="category__media">
              <Image
                src={asset(sofaImg.src)}
                alt={sofaImg.alt}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
              />
            </div>
            <div className="category__label">
              <span className="category__title">Диваны</span>
              <span className="arrow-link" aria-hidden="true">
                Смотреть <Arrow />
              </span>
            </div>
            <p className="category__caption">{sofaImg.caption}</p>
          </a>

          <a className="category category--narrow" href="#armchairs">
            <div className="category__media">
              <Image
                src={asset(chairImg.src)}
                alt={chairImg.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
            <div className="category__label">
              <span className="category__title">Кресла</span>
              <span className="arrow-link" aria-hidden="true">
                Смотреть <Arrow />
              </span>
            </div>
            <p className="category__caption">{chairImg.caption}</p>
          </a>
        </div>

        <div className="selection">
          <div className="selection__head">
            <h3 className="selection__title">Избранные модели</h3>
            <p className="selection__note">
              Габариты — для показанного варианта. Цена рассчитывается под вашу комплектацию.
            </p>
          </div>
          <div className="selection__groups">
            <div id="sofas" className="selection__group" aria-labelledby="sofas-title">
              <h4 id="sofas-title" className="selection__label">
                Диваны
              </h4>
              <div className="selection__grid">
                {sofas.map((m) => (
                  <ModelCard key={m.id} model={m} />
                ))}
              </div>
            </div>
            <div id="armchairs" className="selection__group" aria-labelledby="armchairs-title">
              <h4 id="armchairs-title" className="selection__label">
                Кресла
              </h4>
              <div className="selection__grid">
                {armchairs.map((m) => (
                  <ModelCard key={m.id} model={m} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Consultation() {
  const img = editorialImages.consultation;
  return (
    <section className="consult" aria-labelledby="consult-title">
      <div className="consult__inner">
        <div className="consult__media">
          <Image src={asset(img.src)} alt={img.alt} fill sizes="(min-width: 1200px) 60vw, (min-width: 768px) 50vw, 100vw" />
        </div>
        <div className="consult__text">
          <p className="eyebrow eyebrow--light">Персональный подбор</p>
          <h2 id="consult-title" className="consult__title">
            Подберём мебель под вашу комнату
          </h2>
          <p className="consult__lead">
            Расскажите, сколько места есть в&nbsp;комнате и&nbsp;какую мебель вы ищете. Поможем
            подобрать модель и&nbsp;комплектацию, затем рассчитаем стоимость.
          </p>
          <LeadButton type="selection" variant="light">
            Помочь с выбором
          </LeadButton>
        </div>
      </div>
    </section>
  );
}

const options = [
  { title: "Конфигурация", text: "Количество мест, модули, угол и сторона оттоманки" },
  { title: "Обивка", text: "Ткань, фактура и цвет — под интерьер и образ жизни" },
  { title: "Мягкость", text: "Наполнение сидений и спинки: от упругого до мягкого" },
  { title: "Опоры", text: "Форма и отделка ножек" },
];

function Production() {
  return (
    <section className="section production" aria-labelledby="production-title">
      <div className="container production__grid">
        <div className="production__intro">
          <p className="eyebrow">Производство</p>
          <h2 id="production-title" className="section__title">
            Производим мебель в&nbsp;Дагестане
          </h2>
          <p className="production__lead">
            Scanddy — мебельная фабрика с&nbsp;собственным производством. Каждый диван и&nbsp;кресло
            собираем под заказ: вы выбираете модель и&nbsp;её параметры, мы изготавливаем мебель
            на&nbsp;фабрике.
          </p>
        </div>
        <dl className="production__options">
          {options.map((o, i) => (
            <div key={o.title} className="option">
              <span className="option__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="option__title">{o.title}</dt>
              <dd className="option__text">{o.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Designers() {
  const showHoreca = isVisible(company.directions.horeca) && company.directions.horeca.confirmed;
  return (
    <section id="designers" className="designers" aria-labelledby="designers-title">
      <div className="container designers__inner">
        <div>
          <p className="eyebrow">Для профессионалов</p>
          <h2 id="designers-title" className="designers__title">
            Дизайнерам интерьера
          </h2>
        </div>
        <p className="designers__text">
          Подберём модели и&nbsp;комплектацию для вашего проекта и&nbsp;подготовим расчёт
          по&nbsp;спецификации.
        </p>
        <div className="designers__actions">
          <LeadButton type="project" variant="link">
            Обсудить проект
          </LeadButton>
          {showHoreca && (
            <LeadButton type="project" variant="link">
              Комплектация коммерческих объектов
            </LeadButton>
          )}
        </div>
      </div>
    </section>
  );
}
