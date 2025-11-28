// 自动超链接功能
(function() {
  'use strict';

  function autoLinkUrls() {
    var content = document.querySelector('.post-content');
    if (!content) return;

    // URL匹配正则（排除中文标点）
    var urlPattern = /(https?:\/\/[^\s<>\[\]()，。！？、；：""'']+)/g;

    // 递归遍历文本节点
    function walkTextNodes(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var text = node.textContent;
        if (urlPattern.test(text)) {
          // 检查父节点是否已经是链接或代码块
          var parent = node.parentElement;
          if (parent && (
            parent.tagName === 'A' ||
            parent.tagName === 'CODE' ||
            parent.tagName === 'PRE' ||
            parent.closest('a') ||
            parent.closest('pre') ||
            parent.closest('code')
          )) {
            return;
          }

          // 替换URL为链接
          var fragment = document.createDocumentFragment();
          var lastIndex = 0;
          urlPattern.lastIndex = 0;
          var match;

          while ((match = urlPattern.exec(text)) !== null) {
            // 添加匹配前的文本
            if (match.index > lastIndex) {
              fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
            }
            // 创建链接
            var link = document.createElement('a');
            link.href = match[1];
            link.textContent = match[1];
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            fragment.appendChild(link);
            lastIndex = urlPattern.lastIndex;
          }

          // 添加剩余文本
          if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
          }

          node.parentNode.replaceChild(fragment, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 跳过特定标签
        var tagName = node.tagName;
        if (tagName === 'A' || tagName === 'CODE' || tagName === 'PRE' || tagName === 'SCRIPT' || tagName === 'STYLE') {
          return;
        }
        // 遍历子节点（复制数组避免修改时出错）
        Array.from(node.childNodes).forEach(walkTextNodes);
      }
    }

    walkTextNodes(content);
  }

  // 页面加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoLinkUrls);
  } else {
    autoLinkUrls();
  }
})();

// 代码块增强功能
(function() {
  'use strict';

  function enhanceCodeBlocks() {
    var content = document.querySelector('.post-content');
    if (!content) return;

    var preBlocks = content.querySelectorAll('pre');
    
    preBlocks.forEach(function(pre) {
      // 跳过已处理的代码块
      if (pre.parentElement.classList.contains('code-block-wrapper')) return;

      // 创建包装容器
      var wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';

      // 获取语言类型
      var code = pre.querySelector('code');
      var lang = '';
      if (code && code.className) {
        var match = code.className.match(/language-(\w+)/);
        if (match) {
          lang = match[1];
          wrapper.classList.add('language-' + lang);
        }
      }

      // 添加语言标签
      if (lang) {
        var langLabel = document.createElement('span');
        langLabel.className = 'code-lang-label';
        langLabel.textContent = lang;
        wrapper.appendChild(langLabel);
      }

      // 创建复制按钮
      var copyBtn = document.createElement('button');
      copyBtn.className = 'copy-btn';
      copyBtn.textContent = '复制';
      copyBtn.setAttribute('type', 'button');

      // 复制功能
      copyBtn.addEventListener('click', function() {
        var textToCopy = code ? code.textContent : pre.textContent;
        
        navigator.clipboard.writeText(textToCopy).then(function() {
          copyBtn.textContent = '已复制';
          copyBtn.classList.add('copied');
          
          setTimeout(function() {
            copyBtn.textContent = '复制';
            copyBtn.classList.remove('copied');
          }, 2000);
        }).catch(function() {
          // 降级方案
          var textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          
          copyBtn.textContent = '已复制';
          copyBtn.classList.add('copied');
          
          setTimeout(function() {
            copyBtn.textContent = '复制';
            copyBtn.classList.remove('copied');
          }, 2000);
        });
      });

      // 组装DOM
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      wrapper.appendChild(copyBtn);
    });
  }

  // 页面加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceCodeBlocks);
  } else {
    enhanceCodeBlocks();
  }
})();

// 文章目录自动生成功能
(function() {
  'use strict';

  // 生成文章目录
  function generateTOC() {
    var content = document.querySelector('.post-content');
    var tocContainer = document.getElementById('toc-container');
    var tocList = document.getElementById('toc-list');
    
    // 如果没有目录容器或文章内容，直接返回
    if (!content || !tocContainer || !tocList) return;
    
    // 获取所有 h2 和 h3 标题
    var headings = content.querySelectorAll('h2, h3');
    
    // 如果没有标题，隐藏目录区域
    if (headings.length === 0) {
      tocContainer.style.display = 'none';
      return;
    }
    
    // 为每个标题添加 id（如果没有）并生成目录项
    var tocHTML = '';
    headings.forEach(function(heading, index) {
      // 生成唯一 id
      if (!heading.id) {
        heading.id = 'heading-' + index;
      }
      
      // 判断层级
      var isH3 = heading.tagName.toLowerCase() === 'h3';
      var className = isH3 ? 'toc-item toc-h3' : 'toc-item toc-h2';
      
      tocHTML += '<li class="' + className + '">';
      tocHTML += '<a href="#' + heading.id + '">' + heading.textContent + '</a>';
      tocHTML += '</li>';
    });
    
    tocList.innerHTML = tocHTML;
    
    // 添加平滑滚动
    tocList.addEventListener('click', function(e) {
      if (e.target.tagName.toLowerCase() === 'a') {
        e.preventDefault();
        var targetId = e.target.getAttribute('href').substring(1);
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // 更新 URL hash
          history.pushState(null, null, '#' + targetId);
        }
      }
    });
  }
  
  // 页面加载完成后生成目录
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateTOC);
  } else {
    generateTOC();
  }
})();

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
