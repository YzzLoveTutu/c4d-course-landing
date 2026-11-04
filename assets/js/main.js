/* ==========================================================================
   C4D 三维产品设计与动画实训班 · 页面渲染与交互
   内容全部来自 assets/js/data.js；本文件只负责结构与交互，不写死课程文案。
   ========================================================================== */

(function () {
  "use strict";

  var D = window.COURSE_DATA;
  var main = document.getElementById("main");
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------- 工具函数 ----------------------------- */

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function imgTag(src, alt, eager) {
    return (
      '<img src="' + esc(src) + '" alt="' + esc(alt) + '" ' +
      (eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"') +
      ' decoding="async">'
    );
  }

  function chips(list) {
    return '<ul class="chips">' + list.map(function (t) {
      return "<li>" + esc(t) + "</li>";
    }).join("") + "</ul>";
  }

  /* ----------------------------- 导航 ----------------------------- */

  function renderNav() {
    var nav = D.site.nav.map(function (item) {
      return '<a href="' + esc(item.href) + '">' + esc(item.label) + "</a>";
    }).join("");

    document.getElementById("site-nav").innerHTML =
      '<div class="nav__inner wrap">' +
        '<a class="brand" href="#top" aria-label="' + esc(D.site.brandName) + '">' +
          '<span class="brand__mark">' + esc(D.site.brandMark) + "</span>" +
          '<span class="brand__rule" aria-hidden="true"></span>' +
          '<span class="brand__name">' + esc(D.site.brandName) + "</span>" +
        "</a>" +
        '<nav class="nav__links" aria-label="页面章节">' + nav + "</nav>" +
        '<div class="nav__actions">' +
          '<a class="nav__cta" href="' + esc(D.site.navCta.href) + '">' + esc(D.site.navCta.label) + "</a>" +
          '<button class="nav__toggle" type="button" aria-label="打开导航" aria-expanded="false" aria-controls="drawer">' +
            "<span></span><span></span>" +
          "</button>" +
        "</div>" +
      "</div>";

    document.getElementById("drawer").innerHTML =
      '<div class="drawer__inner wrap">' +
        '<div class="drawer__head">' +
          '<span class="brand__mark">' + esc(D.site.brandMark) + "</span>" +
          '<button class="drawer__close" type="button" aria-label="关闭导航">关闭</button>' +
        "</div>" +
        '<nav class="drawer__links" aria-label="移动端页面章节">' +
          nav +
          '<a class="drawer__cta" href="' + esc(D.site.navCta.href) + '">' + esc(D.site.navCta.label) + "</a>" +
        "</nav>" +
        '<p class="drawer__foot">30 天课程周期 · 20 天基础学习 + 10 天专项创作</p>' +
      "</div>";
  }

  /* ----------------------------- 模块 01 · 首屏 ----------------------------- */

  function renderHero() {
    var h = D.hero;
    var stats = h.stats.map(function (s) {
      return (
        '<div class="stat reveal">' +
          '<div class="stat__top">' +
            '<span class="stat__num" data-count="' + s.value + '">' + s.value + "</span>" +
            '<span class="stat__unit">' + esc(s.unit) + "</span>" +
          "</div>" +
          '<p class="stat__label">' + esc(s.label) + "</p>" +
          '<p class="stat__note">' + esc(s.note) + "</p>" +
        "</div>"
      );
    }).join("");

    main.insertAdjacentHTML("beforeend",
      '<section class="hero" id="top">' +
        '<div class="wrap">' +
          '<div class="hero__eyebrow reveal">' +
            "<span>" + esc(h.eyebrowLeft) + "</span>" +
            '<span class="hero__eyebrow-en">' + esc(h.eyebrowRight) + "</span>" +
          "</div>" +
          '<h1 class="hero__title">' +
            h.titleLines.map(function (line, i) {
              return '<span class="hero__line' + (i === h.titleLines.length - 1 ? " hero__line--last" : "") + '">' + esc(line) + "</span>";
            }).join("") +
          "</h1>" +
          '<div class="hero__meta">' +
            '<div class="hero__meta-main">' +
              '<p class="hero__course">' + esc(h.courseName) + "</p>" +
              '<p class="hero__sub">' + esc(h.subtitle) + "</p>" +
            "</div>" +
            '<div class="hero__meta-actions">' +
              '<a class="btn btn--solid" href="' + esc(h.primaryCta.href) + '">' + esc(h.primaryCta.label) +
                '<span class="btn__arrow" aria-hidden="true">↓</span></a>' +
              '<a class="link-arrow" href="' + esc(h.secondaryCta.href) + '">' + esc(h.secondaryCta.label) +
                '<span aria-hidden="true">→</span></a>' +
            "</div>" +
          "</div>" +
        "</div>" +

        '<figure class="hero__figure" data-media>' +
          '<div class="hero__parallax">' + imgTag(h.media.src, h.media.alt, true) + "</div>" +
          '<span class="hero__tag">' + esc(h.media.tag) + "</span>" +
          '<figcaption class="hero__caption">' + esc(h.media.caption) + "</figcaption>" +
        "</figure>" +

        '<div class="wrap">' +
          '<div class="hero__stats" data-stagger>' + stats + "</div>" +
          '<p class="hero__duration reveal">' + esc(h.durationNote) + "</p>" +
          '<div class="hero__lead">' +
            '<p class="hero__lead-label reveal">课程概述</p>' +
            '<div class="hero__lead-body reveal">' +
              "<p>" + esc(h.intro) + "</p>" +
              '<div class="software">' +
                '<span class="software__label">' + esc(h.softwareLabel) + "</span>" +
                '<ul class="software__list">' + h.softwares.map(function (s) {
                  return "<li>" + esc(s) + "</li>";
                }).join("") + "</ul>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  /* ----------------------------- 模块 02 · 课程特色 ----------------------------- */

  function featureCard(item) {
    var cls = "feature reveal" +
      (item.variant === "dark" ? " feature--dark" : "") +
      (item.variant === "lead" ? " feature--lead" : "");

    return (
      '<article class="' + cls + '">' +
        '<div class="feature__head">' +
          '<span class="feature__no">' + esc(item.no) + "</span>" +
          "<h3>" + esc(item.title) + "</h3>" +
        "</div>" +
        (item.image
          ? '<figure class="feature__media" data-media>' +
            '<span class="media-frame">' + imgTag(item.image.src, item.image.alt, false) + "</span>" +
            '<figcaption>' + esc(item.image.caption) + "</figcaption></figure>"
          : "") +
        '<p class="feature__desc">' + esc(item.desc) + "</p>" +
        (item.tags ? chips(item.tags) : "") +
      "</article>"
    );
  }

  function renderFeatures() {
    var f = D.features;

    main.insertAdjacentHTML("beforeend",
      '<section class="section" id="features">' +
        '<div class="wrap">' +
          '<header class="sec-head sec-head--split">' +
            '<div class="sec-head__left">' +
              '<p class="eyebrow reveal"><span class="eyebrow__idx">02</span><span class="eyebrow__line"></span><span>课程特色</span></p>' +
              '<h2 class="sec-title reveal">' + esc(f.title) + "</h2>" +
            "</div>" +
            '<p class="sec-note reveal">' + esc(f.note) + "</p>" +
          "</header>" +
          '<div class="features" data-stagger>' +
            '<div class="feature-grid">' +
              '<div class="feat feat--1">' + featureCard(f.items[0]) + "</div>" +
              '<div class="feat feat--2">' + featureCard(f.items[1]) + "</div>" +
              '<div class="feat feat--3">' + featureCard(f.items[2]) + "</div>" +
              '<div class="feat feat--4">' + featureCard(f.items[3]) + "</div>" +
              '<div class="feat feat--5">' + featureCard(f.items[4]) + "</div>" +
              '<div class="feat feat--6">' + featureCard(f.items[5]) + "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  /* ----------------------------- 模块 03 · 学习路线 ----------------------------- */

  function renderStage(stage, i) {
    var flip = i % 2 === 1;
    return (
      '<article class="stage reveal' + (flip ? " stage--flip" : "") + '" style="--stage-color:' + esc(stage.color) + '">' +
        '<div class="stage__rail">' +
          '<span class="stage__index">' + esc(stage.index) + "</span>" +
          '<span class="stage__label">' + esc(stage.stageLabel) + "</span>" +
          '<span class="stage__days">' + esc(stage.days) + "</span>" +
        "</div>" +
        '<div class="stage__copy">' +
          "<h3>" + esc(stage.title) + "</h3>" +
          '<ul class="stage__points">' + stage.points.map(function (p) {
            return "<li>" + esc(p) + "</li>";
          }).join("") + "</ul>" +
          '<div class="stage__outcome">' +
            '<span class="stage__outcome-label">阶段成果</span>' +
            '<p>' + esc(stage.outcome) + "</p>" +
          "</div>" +
          '<div class="stage__exam">' +
            '<span class="stage__exam-day">' + esc(stage.exam.day) + "</span>" +
            '<span class="stage__exam-body"><strong>' + esc(stage.exam.name) + "</strong>" +
              "<span>" + esc(stage.exam.detail) + "</span></span>" +
          "</div>" +
        "</div>" +
        '<figure class="stage__media" data-media>' + imgTag(stage.media.src, stage.media.alt, false) +
          '<figcaption>' + esc(stage.media.caption) + "</figcaption>" +
        "</figure>" +
      "</article>"
    );
  }

  function renderCurriculum() {
    var c = D.curriculum;
    main.insertAdjacentHTML("beforeend",
      '<section class="section" id="curriculum">' +
        '<div class="wrap">' +
          '<header class="sec-head sec-head--split">' +
            '<div class="sec-head__left">' +
              '<p class="eyebrow reveal"><span class="eyebrow__idx">03</span><span class="eyebrow__line"></span><span>学习路线</span></p>' +
              '<h2 class="sec-title reveal">' + esc(c.title).replace(/\n/g, "<br>") + "</h2>" +
              '<p class="sec-sub reveal">' + esc(c.subtitle) + "</p>" +
            "</div>" +
            '<div class="sec-head__meta reveal">' + c.meta.map(function (m) {
              return "<span>" + esc(m) + "</span>";
            }).join("") + "</div>" +
          "</header>" +
          '<div class="stages">' + c.stages.map(renderStage).join("") + "</div>" +
          '<p class="section__note reveal">' + esc(c.footnote) + "</p>" +
        "</div>" +
      "</section>"
    );
  }

  /* ----------------------------- 模块 04 · 阶段考试 ----------------------------- */

  function renderExams() {
    var e = D.exams;
    var timeline = e.timeline.map(function (t) {
      return '<div class="exam-node reveal"><span class="exam-node__day">' + esc(t.day) + "</span>" +
        '<span class="exam-node__label">' + esc(t.label) + "</span></div>";
    }).join("");

    var cards = e.cards.map(function (card, i) {
      var tag = card.variant === "final" ? "综合验收" : "考试 0" + (i + 1);
      return (
        '<article class="exam-card reveal' + (card.variant === "final" ? " exam-card--final" : "") + '">' +
          '<div class="exam-card__top">' +
            '<span class="exam-card__day">' + esc(card.day) + "</span>" +
            '<span class="exam-card__tag">' + esc(tag) + "</span>" +
          "</div>" +
          "<h3>" + esc(card.name) + "</h3>" +
          '<p class="exam-card__task"><span>考核任务</span>' + esc(card.task) + "</p>" +
          '<div class="exam-card__focus">' +
            '<span class="exam-card__focus-label">考核重点</span>' +
            '<ul class="chips chips--dark">' + card.focus.map(function (f) {
              return "<li>" + esc(f) + "</li>";
            }).join("") + "</ul>" +
          "</div>" +
        "</article>"
      );
    }).join("");

    var flow = e.flow.steps.map(function (step, i) {
      return '<li class="flow__step reveal"><span class="flow__no">0' + (i + 1) + "</span>" +
        "<span>" + esc(step) + "</span></li>";
    }).join("");

    main.insertAdjacentHTML("beforeend",
      '<section class="section section--dark" id="exams">' +
        '<div class="wrap">' +
          '<header class="sec-head">' +
            '<p class="eyebrow eyebrow--light reveal"><span class="eyebrow__idx">04</span><span class="eyebrow__line"></span><span>阶段考核</span></p>' +
            '<h2 class="sec-title reveal">' + esc(e.title) + "</h2>" +
            '<p class="sec-sub reveal">' + esc(e.subtitle) + "</p>" +
          "</header>" +
          '<div class="exam-rail" data-stagger>' + timeline + "</div>" +
          '<div class="exam-grid" data-stagger>' + cards + "</div>" +
          '<div class="exam-flow">' +
            '<p class="exam-flow__title">' + esc(e.flow.title) + "</p>" +
            '<ol class="flow">' + flow + "</ol>" +
          "</div>" +
          '<p class="section__note section__note--light reveal">' + esc(e.note) + "</p>" +
        "</div>" +
      "</section>"
    );
  }

  /* ----------------------------- 模块 05 · 专项创作 ----------------------------- */

  function renderCreation() {
    var c = D.creation;
    var rail = c.rail.map(function (day) {
      return '<div class="day reveal"><span class="day__dot"></span><span class="day__no">' + esc(day.day) + "</span>" +
        '<span class="day__label">' + esc(day.label) + "</span></div>";
    }).join("");

    var phases = c.phases.map(function (p) {
      return (
        '<article class="phase reveal">' +
          '<div class="phase__range">' + esc(p.range) + "</div>" +
          "<h3>" + esc(p.title) + "</h3>" +
          '<ul class="phase__points">' + p.points.map(function (pt) {
            return "<li>" + esc(pt) + "</li>";
          }).join("") + "</ul>" +
        "</article>"
      );
    }).join("");

    main.insertAdjacentHTML("beforeend",
      '<section class="section section--alt" id="creation">' +
        '<div class="wrap">' +
          '<header class="sec-head sec-head--split">' +
            '<div class="sec-head__left">' +
              '<p class="eyebrow reveal"><span class="eyebrow__idx">05</span><span class="eyebrow__line"></span><span>专项创作</span></p>' +
              '<h2 class="sec-title reveal">' + esc(c.title) + "</h2>" +
              '<p class="sec-sub reveal">' + esc(c.subtitle) + "</p>" +
            "</div>" +
            '<div class="sec-head__meta reveal"><span>10 DAYS</span><span>DAY 21—30</span></div>' +
          "</header>" +
          '<div class="creation-rail"><div class="creation-track" data-stagger>' + rail + "</div></div>" +
          '<p class="rail-hint">横向滑动查看完整 10 天安排</p>' +
          '<div class="phases" data-stagger>' + phases + "</div>" +
          '<p class="section__note reveal">' + esc(c.note) + "</p>" +
        "</div>" +
      "</section>"
    );
  }

  /* ----------------------------- 模块 06 · 专题分享 ----------------------------- */

  function renderTeacher() {
    var t = D.teacher;
    var portrait = t.card.portrait.src
      ? '<div class="portrait" data-media>' + imgTag(t.card.portrait.src, t.card.portrait.alt, false) + "</div>"
      : '<div class="portrait portrait--empty" aria-label="' + esc(t.card.portrait.alt) + '">' +
          '<span class="portrait__corner portrait__corner--tl"></span>' +
          '<span class="portrait__corner portrait__corner--tr"></span>' +
          '<span class="portrait__corner portrait__corner--bl"></span>' +
          '<span class="portrait__corner portrait__corner--br"></span>' +
          '<span class="portrait__kicker">PHOTO PLACEHOLDER</span>' +
          '<span class="portrait__main">教师照片</span>' +
          '<span class="portrait__sub">待补充</span>' +
        "</div>";

    var fields = t.card.fields.map(function (f) {
      return '<div class="field"><dt>' + esc(f.label) + "</dt><dd" +
        (f.value === "待补充" ? ' class="is-tbc"' : "") + ">" + esc(f.value) + "</dd></div>";
    }).join("");

    var topics = t.topics.map(function (item, i) {
      return '<li class="reveal"><span class="topic__no">0' + (i + 1) + "</span><p>" + esc(item) + "</p></li>";
    }).join("");

    main.insertAdjacentHTML("beforeend",
      '<section class="section" id="teacher">' +
        '<div class="wrap">' +
          '<header class="sec-head sec-head--split">' +
            '<div class="sec-head__left">' +
              '<p class="eyebrow reveal"><span class="eyebrow__idx">06</span><span class="eyebrow__line"></span><span>专题分享</span></p>' +
              '<h2 class="sec-title reveal">' + esc(t.title) + "</h2>" +
              '<p class="sec-sub reveal">' + esc(t.desc) + "</p>" +
            "</div>" +
          "</header>" +
          '<div class="teacher">' +
            '<div class="teacher__portrait reveal">' + portrait + "</div>" +
            '<div class="teacher__body">' +
              '<p class="teacher__status reveal">' + esc(t.card.status) + "</p>" +
              '<dl class="teacher__fields reveal">' + fields + "</dl>" +
              '<p class="teacher__note reveal">' + esc(t.card.note) + "</p>" +
              '<h3 class="teacher__topics-title reveal">' + esc(t.topicsTitle) + "</h3>" +
              '<ol class="topics" data-stagger>' + topics + "</ol>" +
            "</div>" +
          "</div>" +
          '<figure class="wide-media reveal" data-media>' + imgTag(t.photo.src, t.photo.alt, false) +
            "<figcaption>" + esc(t.photo.caption) + "</figcaption>" +
          "</figure>" +
        "</div>" +
      "</section>"
    );
  }

  /* ----------------------------- 模块 07 · 学习成果 ----------------------------- */

  function renderOutcomes() {
    var o = D.outcomes;
    var deliverables = o.deliverables.map(function (item, i) {
      return '<li class="reveal"><span class="deliverable__no">0' + (i + 1) + "</span><p>" + esc(item) + "</p></li>";
    }).join("");

    var gallery = o.gallery.map(function (item, i) {
      return (
        '<button class="work work--' + esc(item.span) + ' reveal" type="button" data-index="' + i + '" ' +
          'aria-label="放大查看：' + esc(item.title) + '">' +
          '<figure class="work__figure" data-media style="--ratio:' + esc(item.ratio) + '">' +
            imgTag(item.src, item.alt, false) +
            '<span class="work__zoom" aria-hidden="true">查看大图</span>' +
          "</figure>" +
          '<div class="work__meta">' +
            "<div>" +
              "<h3>" + esc(item.title) + "</h3>" +
              "<p>" + esc(item.desc) + "</p>" +
            "</div>" +
            '<span class="work__tag">示意素材</span>' +
          "</div>" +
        "</button>"
      );
    }).join("");

    main.insertAdjacentHTML("beforeend",
      '<section class="section" id="outcomes">' +
        '<div class="wrap">' +
          '<header class="sec-head sec-head--split">' +
            '<div class="sec-head__left">' +
              '<p class="eyebrow reveal"><span class="eyebrow__idx">07</span><span class="eyebrow__line"></span><span>学习成果</span></p>' +
              '<h2 class="sec-title reveal">' + esc(o.title) + "</h2>" +
              '<p class="sec-sub reveal">' + esc(o.subtitle) + "</p>" +
            "</div>" +
          "</header>" +
          '<div class="deliverables">' +
            '<p class="deliverables__label reveal">' + esc(o.deliverablesTitle) + "</p>" +
            '<ol class="deliverables__list" data-stagger>' + deliverables + "</ol>" +
          "</div>" +
          '<div class="gallery" data-stagger>' + gallery + "</div>" +
          '<p class="section__note reveal">' + esc(o.note) + "</p>" +
        "</div>" +
      "</section>"
    );
  }

  /* ----------------------------- 模块 08 · 适合人群 ----------------------------- */

  function renderAudience() {
    var a = D.audience;
    var items = a.items.map(function (item, i) {
      return '<li class="reveal"><span class="audience__no">0' + (i + 1) + "</span><p>" + esc(item) + "</p></li>";
    }).join("");

    main.insertAdjacentHTML("beforeend",
      '<section class="section section--alt" id="audience">' +
        '<div class="wrap audience">' +
          '<div class="audience__head">' +
            '<p class="eyebrow reveal"><span class="eyebrow__idx">08</span><span class="eyebrow__line"></span><span>适合人群</span></p>' +
            '<h2 class="sec-title reveal">' + esc(a.title) + "</h2>" +
            '<p class="sec-sub reveal">' + esc(a.intro) + "</p>" +
          "</div>" +
          '<ol class="audience__list" data-stagger>' + items + "</ol>" +
        "</div>" +
      "</section>"
    );
  }

  /* ----------------------------- 模块 09 · 咨询 ----------------------------- */

  function renderContact() {
    var c = D.contact;
    var button = c.link
      ? '<a class="btn btn--solid" href="' + esc(c.link) + '" target="_blank" rel="noopener">' + esc(c.button) +
        '<span class="btn__arrow" aria-hidden="true">→</span></a>'
      : '<a class="btn btn--solid" href="#consult-card">' + esc(c.button) +
        '<span class="btn__arrow" aria-hidden="true">↓</span></a>';

    var qr = c.qr
      ? '<div class="qr" data-media>' + imgTag(c.qr, "微信咨询二维码", false) + "</div>"
      : '<div class="qr qr--empty" role="img" aria-label="微信二维码待补充">' +
          '<span class="qr__corner qr__corner--tl"></span><span class="qr__corner qr__corner--tr"></span>' +
          '<span class="qr__corner qr__corner--bl"></span><span class="qr__corner qr__corner--br"></span>' +
          '<span class="qr__main">微信二维码</span><span class="qr__sub">待补充</span>' +
        "</div>";

    var fields = c.fields.map(function (f) {
      return '<div class="field"><dt>' + esc(f.label) + "</dt><dd" +
        (f.value === "待补充" ? ' class="is-tbc"' : "") + ">" + esc(f.value) + "</dd></div>";
    }).join("");

    main.insertAdjacentHTML("beforeend",
      '<section class="section contact" id="contact">' +
        '<div class="wrap contact__grid">' +
          '<div class="contact__copy">' +
            '<p class="eyebrow reveal"><span class="eyebrow__idx">09</span><span class="eyebrow__line"></span><span>课程咨询</span></p>' +
            '<h2 class="sec-title reveal">' + esc(c.title) + "</h2>" +
            '<p class="sec-sub reveal">' + esc(c.subtitle) + "</p>" +
            '<div class="contact__actions reveal">' + button + "</div>" +
            '<p class="contact__info reveal">课程周期 30 天 · 20 天基础学习 + 10 天专项创作</p>' +
          "</div>" +
          '<div class="contact__card reveal" id="consult-card">' +
            qr +
            '<p class="qr__note">' + esc(c.qrNote) + "</p>" +
            '<dl class="contact__fields">' + fields + "</dl>" +
            '<p class="contact__note">' + esc(c.note) + "</p>" +
          "</div>" +
        "</div>" +
      "</section>"
    );
  }

  /* ----------------------------- 页脚 ----------------------------- */

  function renderFooter() {
    var f = D.footer;
    document.getElementById("site-footer").innerHTML =
      '<div class="wrap footer__inner">' +
        '<div class="footer__top">' +
          '<div class="footer__brand">' +
            '<span class="brand__mark">C4D</span>' +
            '<p class="footer__title">' + esc(f.title) + "</p>" +
          "</div>" +
          '<dl class="footer__facts">' + f.facts.map(function (row) {
            return '<div class="footer__fact"><dt>' + esc(row.k) + "</dt><dd>" + esc(row.v) + "</dd></div>";
          }).join("") + "</dl>" +
        "</div>" +
        '<p class="footer__disclaimer">' + esc(f.disclaimer) + "</p>" +
        '<div class="footer__bottom">' +
          '<span>' + esc(f.copyright) + "</span>" +
          '<a href="#top">回到顶部 ↑</a>' +
        "</div>" +
      "</div>";
  }

  /* ----------------------------- 交互 ----------------------------- */

  function initNav() {
    var nav = document.getElementById("site-nav");
    var drawer = document.getElementById("drawer");
    var toggle = nav.querySelector(".nav__toggle");
    var close = drawer.querySelector(".drawer__close");

    function setDrawer(open) {
      nav.classList.toggle("is-open", open);
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", open ? "false" : "true");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("is-locked", open);
    }

    toggle.addEventListener("click", function () {
      setDrawer(!drawer.classList.contains("is-open"));
    });
    close.addEventListener("click", function () { setDrawer(false); });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setDrawer(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) setDrawer(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1080) setDrawer(false);
    });

    function onScroll() {
      nav.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var links = Array.prototype.slice.call(document.querySelectorAll(".nav__links a"));
    var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
    if (!("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
        });
      });
    }, { rootMargin: "-42% 0px -52% 0px", threshold: 0 });

    sections.forEach(function (s) { io.observe(s); });
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || prefersReduced) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });

    els.forEach(function (el) {
      var group = el.closest("[data-stagger]");
      if (group) {
        var siblings = Array.prototype.slice.call(group.querySelectorAll(".reveal"));
        var pos = siblings.indexOf(el);
        if (pos > -1) el.style.transitionDelay = Math.min(pos * 55, 330) + "ms";
      }
      io.observe(el);
    });
  }

  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      if (prefersReduced) { el.textContent = target; return; }
      var start = null;
      var duration = 1200;
      function frame(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (!("IntersectionObserver" in window)) {
      nums.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          run(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  }

  function initParallax() {
    var img = document.querySelector(".hero__parallax img");
    if (!img || prefersReduced) return;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      if (window.innerWidth > 760 && y < window.innerHeight * 1.4) {
        img.style.transform = "translate3d(0," + Math.min(y * 0.1, 70) + "px,0) scale(1.06)";
      }
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  function initLightbox() {
    var box = document.getElementById("lightbox");
    var stageImg = box.querySelector(".lightbox__stage img");
    var title = box.querySelector(".lightbox__title");
    var idx = box.querySelector(".lightbox__idx");
    var items = D.outcomes.gallery;
    var current = 0;
    var lastFocus = null;

    function show(i) {
      current = (i + items.length) % items.length;
      var item = items[current];
      stageImg.src = item.src;
      stageImg.alt = item.alt;
      title.textContent = item.title + " · 示意素材";
      idx.textContent = String(current + 1).padStart(2, "0") + " / " + String(items.length).padStart(2, "0");
    }

    function open(i) {
      current = i;
      lastFocus = document.activeElement;
      show(i);
      box.hidden = false;
      requestAnimationFrame(function () { box.classList.add("is-open"); });
      document.body.classList.add("is-locked");
      box.querySelector(".lightbox__close").focus();
    }

    function close() {
      box.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      setTimeout(function () { box.hidden = true; }, prefersReduced ? 0 : 260);
      if (lastFocus) lastFocus.focus();
    }

    document.querySelectorAll(".gallery .work").forEach(function (btn) {
      btn.addEventListener("click", function () {
        open(parseInt(btn.getAttribute("data-index"), 10));
      });
    });

    box.querySelector(".lightbox__close").addEventListener("click", close);
    box.querySelector(".lightbox__nav--prev").addEventListener("click", function () { show(current - 1); });
    box.querySelector(".lightbox__nav--next").addEventListener("click", function () { show(current + 1); });
    box.addEventListener("click", function (e) {
      if (e.target === box) close();
    });
    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  function initImageFallback() {
    document.addEventListener("error", function (e) {
      var target = e.target;
      if (!target || target.tagName !== "IMG") return;
      target.style.opacity = "0";
      var holder = target.closest("[data-media]");
      if (holder) holder.classList.add("is-missing");
    }, true);
  }

  /* ----------------------------- 启动 ----------------------------- */

  renderNav();
  renderHero();
  renderFeatures();
  renderCurriculum();
  renderExams();
  renderCreation();
  renderTeacher();
  renderOutcomes();
  renderAudience();
  renderContact();
  renderFooter();

  initNav();
  initReveal();
  initCounters();
  initParallax();
  initLightbox();
  initImageFallback();
})();
