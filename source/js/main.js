(function() {
	// search by Wiki API
	var searchInput 	= document.querySelector('.search__input'),
		searchButton 	= document.querySelector('.search__button'),
		searchWrapper 	= document.querySelector('.search-wrapper'),
		searchOutput 	= document.querySelector('.search-output'),
		searchQueryText = document.querySelector('.search-query__text'),
		searchResults 	= document.querySelector('.search-results');

	searchButton.addEventListener('click', getData);
	searchInput.addEventListener('keypress', function(e) {
		if (e.keyCode === 13) {
			getData();
			this.blur();
		}
	});

	function getData() {
		var text = searchInput.value;
		var url = '';
			url += 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json';
			url += '&search=' + text;

		var loadJSONP = (function(){
			var unique = 0;
			return function(url, callback, context) {
				// INIT
				var name = "_jsonp_" + unique++;
				if (url.match(/\?/)) url += "&callback="+name;
				else url += "?callback="+name;
				
				// Create script
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = url;
				
				// Setup handler
				window[name] = function(data){
					callback.call((context || window), data);
					document.getElementsByTagName('head')[0].removeChild(script);
					script = null;
					delete window[name];
				};
				
				// Load JSON
				document.getElementsByTagName('head')[0].appendChild(script);
			};
		})();

		loadJSONP(
			url,
			function(arr) {
				render(arr);
			}
		);
	}

	function render(arr) {
		if (!arr) {
			console.log('Error!');
			return;
		}
		searchResults.innerText = '';

		var response = arr,
			fragment = document.createDocumentFragment();

		searchWrapper.style.height = '10%';
		searchQueryText.innerText = response[0];
		for (var i = 0; i < response[1].length; i++) {
			var anchor 	= document.createElement('a'),
				h3 		= document.createElement('h3'),
				p 		= document.createElement('p');
			h3.innerText = response[1][i];
			p.innerText = response[2][i];
			anchor.appendChild(h3);
			anchor.appendChild(p);
			anchor.href = response[3][i];
			anchor.target = '_blank';
			fragment.appendChild(anchor);
		}
		searchResults.appendChild(fragment);

		searchOutput.style.opacity = 1;
	}

})();