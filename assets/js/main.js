// 站内搜索功能
(function() {
  'use strict';

  // 获取搜索输入框
  var searchInputHeader = document.getElementById('search-input');
  var searchInputPage = document.getElementById('search-input-page');
  var searchResults = document.getElementById('search-results');

  // 搜索函数
  function performSearch(query) {
    if (!window.searchData || !searchResults) return;
    
    query = query.toLowerCase().trim();
    if (query.length < 2) {
      searchResults.innerHTML = '<p>请输入至少 2 个字符</p>';
      return;
    }

    var results = window.searchData.filter(function(item) {
      return item.title.toLowerCase().indexOf(query) !== -1 ||
             item.content.toLowerCase().indexOf(query) !== -1 ||
             (item.category && item.category.toLowerCase().indexOf(query) !== -1);
    });

    displayResults(results, query);
  }

  // 显示搜索结果
  function displayResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = '<p>未找到相关结果</p>';
      return;
    }

    var html = '<p>找到 ' + results.length + ' 个结果</p>';
    results.forEach(function(item) {
      // 高亮匹配文本
      var excerpt = item.content.substring(0, 200);
      var highlightedTitle = highlightText(item.title, query);
      var highlightedExcerpt = highlightText(excerpt, query);

      html += '<div class="result-item">';
      html += '<div class="result-title"><a href="' + item.url + '">' + highlightedTitle + '</a></div>';
      html += '<div class="result-meta"><span class="post-date">' + item.date + '</span>';
      if (item.category) {
        html += '<span class="post-category">' + item.category + '</span>';
      }
      html += '</div>';
      html += '<div class="result-excerpt">' + highlightedExcerpt + '...</div>';
      html += '</div>';
    });

    searchResults.innerHTML = html;
  }

  // 高亮匹配文本
  function highlightText(text, query) {
    if (!query) return text;
    var regex = new RegExp('(' + escapeRegExp(query) + ')', 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // 转义正则特殊字符
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // 防抖函数
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  // 绑定事件
  var debouncedSearch = debounce(function(e) {
    performSearch(e.target.value);
  }, 300);

  if (searchInputPage) {
    searchInputPage.addEventListener('input', debouncedSearch);
  }

  // 头部搜索框跳转到搜索页面
  if (searchInputHeader) {
    searchInputHeader.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        var query = e.target.value.trim();
        if (query) {
          window.location.href = '/search/?q=' + encodeURIComponent(query);
        }
      }
    });
  }

  // 如果 URL 有搜索参数，自动执行搜索
  if (searchInputPage) {
    var urlParams = new URLSearchParams(window.location.search);
    var queryParam = urlParams.get('q');
    if (queryParam) {
      searchInputPage.value = queryParam;
      performSearch(queryParam);
    }
  }
})();
