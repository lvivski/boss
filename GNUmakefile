build:
	@mkdir -p lib/{bemss,css}
	@node_modules/.bin/ometajs2js -b -i src/bemss/parser.ometajs > lib/bemss/parser.js
	@node_modules/.bin/ometajs2js -b -i src/bemss/transformer.ometajs > lib/bemss/transformer.js
	@node_modules/.bin/ometajs2js -b -i src/bemss/translator.ometajs > lib/bemss/translator.js

	@node_modules/.bin/ometajs2js -b -i src/css/parser.ometajs > lib/css/parser.js
	@node_modules/.bin/ometajs2js -b -i src/css/transformer.ometajs > lib/css/transformer.js
	@node_modules/.bin/ometajs2js -b -i src/css/translator.ometajs > lib/css/translator.js
