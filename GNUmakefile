build:
	@mkdir -p lib/{bemss,css}
	@cp src/bemss/parser.pre.js lib/bemss/parser.js
	@cp src/bemss/transformer.pre.js lib/bemss/transformer.js
	@node_modules/.bin/ometajs2js -b -i src/bemss/parser.ometajs >> lib/bemss/parser.js
	@node_modules/.bin/ometajs2js -b -i src/bemss/transformer.ometajs >> lib/bemss/transformer.js

	@node_modules/.bin/ometajs2js -b -i src/css/parser.ometajs > lib/css/parser.js
	@node_modules/.bin/ometajs2js -b -i src/css/transformer.ometajs > lib/css/transformer.js
	@node_modules/.bin/ometajs2js -b -i src/css/translator.ometajs > lib/css/translator.js
