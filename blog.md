---
layout: default
title: ブログ
permalink: /blog/
---

<section>
  <h2>ブログ記事一覧</h2>
  <ul>
    {% for post in site.posts %}
      <li><a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%Y年%m月%d日" }}</li>
    {% endfor %}
  </ul>
</section>
